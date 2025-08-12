import React from "react";
import { calculateAgeFromDate, calculatePremium } from "../utils/premiumUtils";
import FormCard from "./FormCard";
import styles from "./PremiumDisplay.module.css";

interface PremiumDisplayProps {
  birthday: string; // YYYY-MM-DD format
  gender: "male" | "female";
  title?: string;
  className?: string;
}

const PremiumDisplay: React.FC<PremiumDisplayProps> = ({
  birthday,
  gender,
  title = "保険料",
  className,
}) => {
  // Calculate age from birthday
  const age = calculateAgeFromDate(birthday);

  // Calculate premium based on age and gender
  const premium = age !== null ? calculatePremium(age, gender) : "対象外";

  // Determine if eligible
  const isEligible = age !== null && age >= 18 && age <= 69;

  return (
    <div className={`${styles.container} ${className ?? ""}`}>
      <FormCard
        title={title}
        fields={[
          {
            label: "保険料（月払）",
            value: premium,
            type: "text" as const,
          },
        ]}
      />
      {!isEligible && age !== null && (
        <div className={styles.errorMessage}>
          年齢が対象外です（18歳〜69歳）
        </div>
      )}
    </div>
  );
};

export default PremiumDisplay;
