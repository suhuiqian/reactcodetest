import React from "react";
import TextTitle from "@/components/TextTitle";
import type { FormCardProps } from "@/types/forms";
import styles from "./FormCard.module.css";

const FormCard: React.FC<FormCardProps> = ({ title, fields }) => {
  return (
    <div className={styles.formCard}>
      <TextTitle text={title} />
      <div className={styles.formFields}>
        {fields.map((field, index) => (
          <div key={index} className={styles.formField}>
            <label className={styles.fieldLabel}>
              {field.label}
              {field.required && (
                <span className={styles.requiredMark}>必須</span>
              )}
            </label>
            <input
              type={field.type ?? "text"}
              value={field.value}
              disabled={field.disabled !== false}
              className={styles.fieldInput}
              readOnly={field.disabled !== false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormCard;
