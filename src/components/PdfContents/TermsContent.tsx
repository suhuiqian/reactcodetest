import React from "react";
import type { DisclosureAnswers } from "../../services/PdfService";

interface TermsContentProps {
  disclosureAnswers: DisclosureAnswers[];
}

const TermsContent: React.FC<TermsContentProps> = ({ disclosureAnswers }) => (
  <div className="pdf-content">
    <div className="title relative flex justify-center items-start">
      <span>約款確認</span>
      <span className="text-xs font-normal absolute top-0 right-0">
        (サンプルデータ)
      </span>
    </div>

    <div className="text">
      お申込みいただく保険商品の「約款」について全てのページの内容を十分にご確認ください。
    </div>

    <div className="subtitle">【告知内容の確認】</div>
    <div className="text">以下の質問に対する回答内容をご確認ください：</div>

    {disclosureAnswers.map((answer, index) => (
      <div key={index}>
        <div className="question">
          質問{answer.questionId}: {answer.question}
        </div>
        <div className="answer">回答: {answer.answer ? "はい" : "いいえ"}</div>
        {answer.followUpAnswer !== undefined && (
          <div className="follow-up">
            追加回答: {answer.followUpAnswer ? "はい" : "いいえ"}
          </div>
        )}
      </div>
    ))}

    <div className="subtitle">【約款の主要条項】</div>
    <div className="list-item">保険金の支払い条件</div>
    <div className="list-item">免責事項</div>
    <div className="list-item">解約について</div>
    <div className="list-item">告知義務</div>
    <div className="list-item">保険料の支払い義務</div>
    <div className="list-item">契約の変更・更新</div>
  </div>
);

export default TermsContent;
