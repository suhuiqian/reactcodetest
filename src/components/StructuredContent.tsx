import React from "react";
import styles from "./StructuredContent.module.css";

interface InsuranceSection {
  title: string;
  points: string[];
}

interface StructuredContentProps {
  sections: InsuranceSection[];
  title?: string;
  hasBullets?: boolean; // When true, show bullets for all points
}

const StructuredContent: React.FC<StructuredContentProps> = ({
  sections,
  title,
  hasBullets = false,
}) => {
  return (
    <div className={styles.structuredContent}>
      {title && <h2 className={styles.contentTitle}>{title}</h2>}

      {sections.map((section, sectionIndex) => {
        const isLastSection = sectionIndex === sections.length - 1;
        const isPointsListEmpty = !section.points || section.points.length === 0;

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

            {hasBullets ? (
              // Show bullets for all points
              <ul className={styles.pointsList}>
                {section.points.map((point, pointIndex) => (
                  <li key={pointIndex} className={styles.point}>
                    {point}
                  </li>
                ))}
              </ul>
            ) : (
              // No bullets - render as paragraphs
              <div className={styles.pointsContainer}>
                {section.points.map((point, pointIndex) => (
                  <p key={pointIndex} className={styles.singlePoint}>
                    {point}
                  </p>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StructuredContent;
