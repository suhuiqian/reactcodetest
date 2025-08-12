import React from "react";
import styles from "./InsuranceBenefitExplanation.module.css";
import ThirdDegreePopup from "./ThirdDegreePopup";
interface InsuranceBenefitSection {
  title: string;
  points: {
    content: string;
    prefix?: string;
    specialItemIndex?: boolean;
  }[];
}

interface StructuredContentProps {
  sections: InsuranceBenefitSection[];
  title?: string;
  hasBullets?: boolean; // When true, show bullets for all points
  hasPrecautions?: boolean;
}
const InsuranceBenefitExplanation: React.FC<StructuredContentProps> = ({
  sections,
  title,
  hasPrecautions = true,
}) => {
  return (
    <div className={styles.structuredContent}>
      {title && <h2 className={styles.contentTitle}>{title}</h2>}

      {sections.map((section, sectionIndex) => {
        const isLastSection = sectionIndex === sections.length - 1;
        const isPointsListEmpty = section.points.length === 0;

        return (
          <div
            key={`section-${sectionIndex.toString()}`}
            className={styles.section}
          >
            <h3
              className={styles.sectionTitle}
              style={
                isLastSection && isPointsListEmpty
                  ? { marginBottom: 0 }
                  : undefined
              }
            >
              {section.title}
            </h3>

            <ul className={styles.pointsList}>
              {section.points.map((point, pointIndex) => (
                <li
                  key={`point-${pointIndex.toString()}`}
                  className={
                    point.prefix === "blackSquare"
                      ? styles.blackSquare
                      : point.prefix === "note"
                      ? styles.note
                      : point.prefix === "space"
                      ? styles.space
                      : point.prefix === "star"
                      ? styles.star
                      : styles.point
                  }
                >
                  {point.specialItemIndex ? (
                    <div>
                      被保険者様は契約者様からみて「
                      <ThirdDegreePopup>
                        <span
                          className={styles.specialItem}
                          style={{
                            textDecoration: "underline",
                            textUnderlinePosition: "under",
                            textDecorationColor: "blue",
                            cursor: "pointer",
                          }}
                        >
                          3親等以内
                        </span>
                      </ThirdDegreePopup>
                      」であること
                    </div>
                  ) : (
                    point.content
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      {hasPrecautions && (
        <div className={styles.precautions}>
          (注意事項)
          <div className={styles.precautionContent}>
            12疾病一時金と二大疾病死亡保険金は重複して支払われません
          </div>
        </div>
      )}
    </div>
  );
};

export default InsuranceBenefitExplanation;
