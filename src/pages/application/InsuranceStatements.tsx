import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "@/components/CommonButton";
import TextCard from "@/components/TextCard";
import TextTitle from "@/components/TextTitle";
import TextContext from "@/components/TextContext";
import InsuranceBenefitExplanation from "@/components/InsuranceBenefitExplanation";
import {
  INSURANCE_CONTENT,
  PRODUCTION_DESCRIPTION_CONTENT,
} from "@/constants/insuranceContent";
import styles from "./InsuranceStatements.module.css";
import textCardStyles from "@/components/TextCard.module.css";
import PremiumTable from "@/components/PremiumTable";

// TODO: auto scoll up
const InsuranceStatements: React.FC = () => {
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsConfirmed(e.target.checked);
  };
  const handleClick = () => {
    void navigate("/privacy");
  };
  return (
    <div className={styles.insuranceStatements}>
      <div className={textCardStyles.textCard}>
        <TextTitle text="お申込にあたって" />
        <TextContext>
          <InsuranceBenefitExplanation
            sections={INSURANCE_CONTENT.APPLY_TERMS}
            hasPrecautions={false}
          />
        </TextContext>
      </div>
      <div className={textCardStyles.textCard}>
        <TextTitle text="お客さまのご意向とお申込いただく商品" />
        <div className={styles.productionContent}>
          <div className={styles.intro}>
            {PRODUCTION_DESCRIPTION_CONTENT.INTRO}
            {PRODUCTION_DESCRIPTION_CONTENT.POINTS.map((point, index) => (
              <div key={index} className={styles.section}>
                <h3 className={styles.sectionTitle}>{point.SECTION_TITLE}</h3>

                <ul className={styles.pointsList}>
                  {point.SECTION_TERMS.map((point, pointIndex) => (
                    <li key={pointIndex} className={styles.point}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <TextCard
        title="保険金と給付金の説明"
        benefitSections={INSURANCE_CONTENT.BENEFITS_DESCRIPTION}
        prefix={false}
      />
      <ul className={styles.pointsList2}>
        <li className={styles.point2}>保険期間は1年です</li>
        <li className={styles.point2}>
          契約日または更新日における被保険者の満年齢にしたがって下記の表の保険料を適用します
        </li>
      </ul>
      <TextCard title="保険料の説明">
        <PremiumTable />
      </TextCard>

      <div className={styles.confirmationCheckboxContainer}>
        <label className={styles.confirmationCheckboxLabel}>
          <input
            type="checkbox"
            checked={isConfirmed}
            onChange={handleCheckboxChange}
          />
          <p
            className={styles.confirmationCheckboxText}
            // style={{
            //   color: isConfirmed ? "#333" : "#dc3545",
            // }}
            style={{
              color: "#F00",
            }}
          >
            【お申込にあたって】【お客さまのご意向とお申込いただく商品】【保険金と給付金の説明】【保険料の説明】を確認の上、同意します。
          </p>
        </label>
      </div>
      <div className={styles.actionButtons}>
        <CommonButton
          onClick={handleClick}
          variant="primary"
          className={styles.fullWidthButton}
          disabled={!isConfirmed}
        >
          同意する
        </CommonButton>
      </div>
    </div>
  );
};

export default InsuranceStatements;
