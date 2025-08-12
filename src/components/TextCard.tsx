import React from "react";
import TextTitle from "./TextTitle";
import TextContext from "./TextContext";
import StructuredContent from "./StructuredContent";
import InsuranceBenefitExplanation from "./InsuranceBenefitExplanation";
import styles from "./TextCard.module.css";

interface InsuranceSection {
  title: string;
  points: string[];
}

interface InsuranceBenefitSection {
  title: string;
  points: {
    content: string;
    prefix?: string;
  }[];
}

interface TextCardProps {
  title: string;
  content?: string;
  sections?: InsuranceSection[];
  benefitSections?: InsuranceBenefitSection[];
  children?: React.ReactNode;
  prefix?: boolean; // Controls whether sections show bullet prefixes
}

const TextCard: React.FC<TextCardProps> = ({
  title,
  content,
  sections,
  children,
  benefitSections,
  prefix = false, // Default to false for backward compatibility
}) => {
  return (
    <div className={styles.textCard}>
      <TextTitle text={title} />
      <TextContext>
        {children ? (
          children
        ) : sections ? (
          <StructuredContent sections={sections} hasBullets={prefix} />
        ) : benefitSections ? (
          <InsuranceBenefitExplanation sections={benefitSections} />
        ) : (
          content
        )}
      </TextContext>
    </div>
  );
};

export default TextCard;
