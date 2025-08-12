import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import styles from "@/pages/application/Application.module.css";
import type { DisclosureAnswers } from "@/services/PdfService";
import {
  DISCLOSURE_CONTENT_QUE,
  inquiryMsg,
} from "@/constants/disclosureFormContent";
import type { QuestionGroup } from "@/constants/disclosureFormContent";
import ErrorIcon from "@/components/ErrorIcon";
import { on } from "events";

interface DisclosureFormProps {
  onComplete: (answers: DisclosureAnswers[]) => void;
  onHandleCancel: () => void;
  useType?: "insured" | "applicant";
}

const DisclosureForm: React.FC<DisclosureFormProps> = ({
  onComplete,
  onHandleCancel,
  useType = "applicant",
}) => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [showDisqualifyModal, setShowDisqualifyModal] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [furthestQuestionIndex, setFurthestQuestionIndex] = useState(0);
  const [questionGroups, setQuestionGroups] = useState<QuestionGroup[]>(
    DISCLOSURE_CONTENT_QUE
  );

  const handleAnswer = (
    questionType: "single" | "list",
    answer: boolean,
    listIndex?: number
  ) => {
    // First update the state to show the checkmark

    setQuestionGroups((prev) =>
      prev.map((group, index) => {
        if (index === currentGroupIndex) {
          if (questionType === "list" && typeof listIndex === "number") {
            return {
              ...group,
              mainQuestion: {
                ...group.mainQuestion,
                answer: null,
                questionList: group.mainQuestion.questionList.map((q, i) =>
                  i === listIndex ? { ...q, answer } : { ...q, answer: null }
                ),
              },
            };
          } else {
            return {
              ...group,
              mainQuestion: {
                ...group.mainQuestion,
                answer,
                questionList: group.mainQuestion.questionList.map((q) => ({
                  ...q,
                  answer: null,
                })),
              },
            };
          }
        }
        return group;
      })
    );

    // Add a small delay to show the checkmark before processing
    setTimeout(() => {
      const currentGroup = questionGroups[currentGroupIndex];
      let isDisqualified = false;

      isDisqualified = answer === currentGroup.mainQuestion.disqualifyingAnswer;

      if (isDisqualified) {
        setShowDisqualifyModal(true);
      } else {
        // Mark current question as completed
        setCompletedQuestions((prev) => {
          if (!prev.includes(currentGroupIndex)) {
            return [...prev, currentGroupIndex];
          }
          return prev;
        });

        // Only auto-advance if we're at or beyond the furthest question
        if (currentGroupIndex >= furthestQuestionIndex) {
          if (currentGroupIndex < questionGroups.length - 1) {
            const nextIndex = currentGroupIndex + 1;
            setCurrentGroupIndex(nextIndex);
            setFurthestQuestionIndex(nextIndex);
          } else {
            console.log("All questions completed successfully!");
            // Call the onComplete callback
            handleDisclosureComplete();
          }
        }
        // If we're viewing a previous question, just stay there after updating
      }
    }, 300);
  };

  const handleModalClose = () => {
    setShowDisqualifyModal(false);
  };

  const navigate = useNavigate();
  const handleCancelClose = () => {
    if (useType === "insured") {
      void navigate("/success", {
        state: { operationType: "insured-cancel" },
      });
    }else{
      onHandleCancel();
    }
  };

  const handleContinue = () => {
    // Move to the next question instead of jumping to furthest unanswered
    if (currentGroupIndex < questionGroups.length - 1) {
      setCurrentGroupIndex(currentGroupIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex(currentGroupIndex - 1);
    }
  };

  const getProgressDotClass = (questionIndex: number) => {
    if (completedQuestions.includes(questionIndex)) {
      return `${styles.progressDot} ${styles.progressDotCompleted}`;
    } else if (questionIndex === currentGroupIndex) {
      return `${styles.progressDot} ${styles.progressDotCurrent}`;
    } else {
      return `${styles.progressDot} ${styles.progressDotFuture}`;
    }
  };

  // Check if user is viewing a previous question
  const isViewingPreviousQuestion = currentGroupIndex < furthestQuestionIndex;

  // Check if previous button should be shown
  const canGoPrevious = currentGroupIndex > 0;

  const currentGroup = questionGroups[currentGroupIndex];

  const handleDisclosureComplete = () => {
    // Convert question groups to DisclosureAnswers format
    const answers: DisclosureAnswers[] = questionGroups.map((group) => ({
      questionId: group.id,
      question: group.mainQuestion.questionHead,
      answer: group.mainQuestion.answer || false,
      followUpAnswer: group.mainQuestion?.answer ?? undefined,
    }));

    onComplete(answers);
  };

  return (
    <>
      {/* Progress Indicator - Non-clickable */}
      <div className={styles.progressIndicator}>
        {questionGroups.map((_, index) => (
          <div
            key={index}
            className={getProgressDotClass(index)}
            title={`質問 ${index + 1}`}
          />
        ))}
      </div>

      <div className={styles.disclosureForm}>
        <div className={styles.questionGroup}>
          <div className={styles.questionNumber}>
            質問 {currentGroupIndex + 1} / {questionGroups.length}
            {isViewingPreviousQuestion && (
              <span
                style={{
                  color: "#666",
                  fontWeight: "normal",
                  marginLeft: "8px",
                }}
              >
                (回答済み - 変更可能)
              </span>
            )}
          </div>

          <div className="main-question">
            <h3 className={styles.questionText}>
              {currentGroup.mainQuestion.questionHead.map((head, idx) =>
                head.type === "nomarl" ? (
                  <div key={idx}>{head.content}</div>
                ) : head.type === "precautions" ? (
                  <div key={idx} className={styles.questionPrecautions}>
                    {head.content}
                  </div>
                ) : null
              )}
            </h3>

            {currentGroup.mainQuestion.questionList.length > 0 && (
              <div className={styles.questionText}>
                {currentGroup.mainQuestion.questionListHead && (
                  <div className={styles.questionListHead}>
                    {currentGroup.mainQuestion.questionListHead}
                  </div>
                )}
                {currentGroup.mainQuestion.questionList.map((q, idx) => (
                  <div key={idx} className={styles.questionListItem}>
                    <div className={styles.questionTitleRow}>
                      <label className={styles.questionTitleRowLabel}>
                        <input
                          type="checkbox"
                          checked={q.answer === true}
                          onChange={() => {
                            handleAnswer("list", true, idx);
                          }}
                        />
                      </label>
                      <div className={styles.questionTitleRowDiv}>
                        <div className={styles.questionTitle}>
                          {q.questionTitle}
                        </div>
                        {q.questionContent && (
                          <div>
                            {q.isNeedReferenceMark ? (
                              <ul className={styles.questionUL}>
                                <li className={styles.questionLI}>
                                  {q.questionContent}
                                </li>
                              </ul>
                            ) : (
                              <div>{q.questionContent}</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div className={styles.questionListItem}>
                  <div
                    className={`${styles.questionPrecautions} ${styles.customMarginTop}`}
                  >
                    ※該当する事項がない場合は次をチェックしてください
                  </div>
                  <div className={styles.questionTitleRow}>
                    <label className={styles.questionTitleRowLabel}>
                      <input
                        type="checkbox"
                        checked={currentGroup.mainQuestion.answer === false}
                        onChange={() => {
                          handleAnswer("single", false);
                        }}
                      />
                    </label>
                    <div className={styles.questionTitleRowDiv}>
                      <div className={styles.questionTitle}>
                        いずれもありません
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentGroup.id === 1 && (
              <div className={styles.answerCheckboxes}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={currentGroup.mainQuestion.answer === false}
                    onChange={() => {
                      handleAnswer("single", false);
                    }}
                  />
                  いいえ
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={currentGroup.mainQuestion.answer === true}
                    onChange={() => {
                      handleAnswer("single", true);
                    }}
                  />
                  はい
                </label>
                {currentGroup.mainQuestion.disqualifyingAnswer && (
                  <span className={styles.disqualifyText}>
                    ※「はい」の場合は謝絶となります
                  </span>
                )}
              </div>
            )}
          </div>

          {/* {currentGroup.type === "paired" && (
            <div className={styles.followUpSection}>
              <div className={styles.followUpNotice}>
                {currentGroup.id === 6
                  ? "※「はい」の場合は次の質問に回答してください"
                  : "※「はい」の場合、診断された病気は下記にありますか？"}
              </div>

              {showFollowUp && currentGroup.followUpQuestion && (
                <div className={styles.followUpQuestion}>
                  <h4 className={styles.questionText}>
                    {currentGroup.followUpQuestion.question}
                  </h4>

                  <div className={styles.answerCheckboxes}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={currentGroup.followUpQuestion.answer === false}
                        onChange={() => handleAnswer("followUp", false)}
                      />
                      いいえ
                    </label>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={currentGroup.followUpQuestion.answer === true}
                        onChange={() => handleAnswer("followUp", true)}
                      />
                      はい
                    </label>
                    <span className={styles.disqualifyText}>
                      {currentGroup.id === 6
                        ? "※「いいえ」の場合は謝絶"
                        : "※「はい」の場合は謝絶"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )} */}

          {/* Navigation Buttons */}
          <div
            className={`${styles.navigationButtons} ${!canGoPrevious ? styles.navigationButtonsCenter : ""
              }`}
          >
            {canGoPrevious && (
              <button
                type="button"
                className={styles.previousBtn}
                onClick={handlePrevious}
              >
                ← 前の質問
              </button>
            )}

            {isViewingPreviousQuestion &&
              currentGroup.mainQuestion.answer === false && (
                <button
                  type="button"
                  className={styles.continueBtn}
                  onClick={handleContinue}
                >
                  次の質問へ →
                </button>
              )}
          </div>
        </div>
      </div>

      {/* Disqualification Modal */}
      {showDisqualifyModal && (
        <>
          <h3>test</h3>
          <div className={styles.modalOverlay}>
            <div className={`${styles.modalContent} ${styles.fontStyle}`}>
              <ErrorIcon size="large" />
              <div className={styles.inquiryMsgTitle}>{inquiryMsg.title}</div>

              <div className={styles.inquiryMsgContentHead}>
                {inquiryMsg.contentHead}
              </div>

              <div className={styles.inquiryMsgContentFoot}>
                {inquiryMsg.contentFoot}
              </div>

              <div className={styles.inquiryMsgConsultationTitle}>
                {inquiryMsg.consultationCounterHead}
              </div>

              <div className={styles.inquiryMsgConsultationList}>
                {inquiryMsg.consultationList.map((item, index) => (
                  <div
                    key={index}
                    className={styles.inquiryMsgConsultationItem}
                  >
                    <div className={styles.inquiryMsgItemTitle}>
                      {item.title}
                    </div>
                    ：
                    <div className={styles.inquiryMsgItemContent}>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.modalButtons}>
                <button
                  type="button"
                  className={styles.modalCancelBtn}
                  onClick={() => {
                    handleCancelClose();
                  }}
                >
                  申込取消
                </button>

                <button
                  type="button"
                  className={styles.modalCloseBtn}
                  onClick={() => {
                    handleModalClose();
                  }}
                >
                  戻る
                </button>

              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DisclosureForm;
