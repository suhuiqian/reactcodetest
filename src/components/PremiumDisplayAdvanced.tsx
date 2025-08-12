import React from "react";
import {
  calculateAgeFromDate,
  calculatePremium,
  getPremiumAsNumber,
  isAgeEligible,
} from "../utils/premiumUtils";
import FormCard from "./FormCard";
import styles from "./PremiumDisplay.module.css";

interface PremiumDisplayAdvancedProps {
  birthday: string; // YYYY-MM-DD format
  gender: "male" | "female";
  title?: string;
  className?: string;
  showAge?: boolean;
  showEligibility?: boolean;
  showPremiumBreakdown?: boolean;
}

const PremiumDisplayAdvanced: React.FC<PremiumDisplayAdvancedProps> = ({
  birthday,
  gender,
  title = "保険料",
  className,
  showAge = true,
  showEligibility = true,
  showPremiumBreakdown = false,
}) => {
  // Calculate age from birthday
  const age = calculateAgeFromDate(birthday);

  // Calculate premium based on age and gender
  const premium = age !== null ? calculatePremium(age, gender) : "対象外";

  // Get premium as number for calculations
  const premiumNumber = age !== null ? getPremiumAsNumber(age, gender) : 0;

  // Determine if eligible
  const isEligible = age !== null && isAgeEligible(age);

  // Generate fields for FormCard
  const fields = [];

  if (showAge && age !== null) {
    fields.push({
      label: "年齢",
      value: `${age}歳`,
      type: "text" as const,
    });
  }

  if (showEligibility && age !== null) {
    fields.push({
      label: "対象年齢",
      value: isEligible ? "対象" : "対象外",
      type: "text" as const,
    });
  }

  fields.push({
    label: "保険料（月払）",
    value: premium,
    type: "text" as const,
  });

  if (showPremiumBreakdown && premiumNumber > 0) {
    fields.push({
      label: "年間保険料",
      value: `${(premiumNumber * 12).toLocaleString()}円`,
      type: "text" as const,
    });
  }

  return (
    <div className={`${styles.container} ${className || ""}`}>
      <FormCard title={title} fields={fields} />

      {!isEligible && age !== null && (
        <div className={styles.errorMessage}>
          年齢が対象外です（18歳〜69歳）
        </div>
      )}

      {age === null && (
        <div className={styles.errorMessage}>
          有効な生年月日を入力してください
        </div>
      )}
    </div>
  );
};

export default PremiumDisplayAdvanced;
