import React from "react";
import styles from "./IdentityVerifyContent.module.css";
import type { IdentityVerifySection } from "@/constants/identity";

interface IdentityVerifyContentProps {
  sections: IdentityVerifySection[];
  title?: string;
}

const IdentityVerifyContent: React.FC<IdentityVerifyContentProps> = ({
  sections,
  title,
}) => {
  return (
    <div className={styles.structuredContent}>
      {title && <h2 className={styles.contentTitle}>{title}</h2>}

      {sections.map((section, sectionIndex) => {
        const isLastSection = sectionIndex === sections.length - 1;
        const isPointsListEmpty =
          !section.points || section.points.length === 0;

        return (
          <div key={sectionIndex} className={styles.section}>
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

            {section.noBulletPoints && (
              <div className={styles.pointsContainer}>
                {section.noBulletPoints.map((point, pointIndex) => (
                  <p key={pointIndex} className={styles.singlePoint}>
                    {point}
                  </p>
                ))}
              </div>
            )}

            {section.points && (
              <ul className={styles.pointsList}>
                {section.points.map((point, pointIndex) => (
                  <li key={pointIndex} className={styles.point}>
                    {point}
                  </li>
                ))}
              </ul>
            )}

            {section.comments && (
              <ul className={styles.pointsList}>
                {section.comments.map((point, pointIndex) => (
                  <li
                    key={pointIndex}
                    className={`${styles.point} ${styles.comment}`}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default IdentityVerifyContent;
