import React, { useState } from "react";
import { getCharacterTypeError } from "@/utils/japaneseTextUtils";

interface JapaneseInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "onBlur"
  > {
  fieldType: "name" | "kana" | "phone" | "postal" | "email" | "text";
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  error?: string;
  label?: string;
  required?: boolean;
  showCharacterTypeError?: boolean; // Whether to show character type errors
}

const JapaneseInput: React.FC<JapaneseInputProps> = ({
  fieldType,
  onChange,
  onBlur,
  error,
  label,
  required = false,
  className = "",
  showCharacterTypeError = true,
  ...inputProps
}) => {
  const [value, setValue] = useState((inputProps.defaultValue as string) || "");
  const [characterError, setCharacterError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    // Check for character type errors
    if (
      showCharacterTypeError &&
      fieldType !== "name" &&
      fieldType !== "text"
    ) {
      const charError = getCharacterTypeError(
        inputValue,
        fieldType as "phone" | "postal" | "email" | "kana"
      );
      setCharacterError(charError);
    }

    onChange?.(inputValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onBlur?.(inputValue);
  };

  const getPlaceholder = () => {
    switch (fieldType) {
      case "kana":
        return "カタカナで入力";
      case "phone":
        return "例: 090-1234-5678";
      case "postal":
        return "例: 123-4567";
      case "email":
        return "例: example@email.com";
      case "name":
        return "漢字・カタカナ・英字で入力";
      default:
        return "";
    }
  };

  const getInputNote = () => {
    switch (fieldType) {
      case "kana":
        return "※カタカナで入力してください";
      case "phone":
        return "※半角数字で入力してください";
      case "postal":
        return "※半角数字で入力してください";
      case "email":
        return "※半角英数字で入力してください";
      default:
        return "";
    }
  };

  const displayError = error || characterError;

  return (
    <div className={`japanese-input ${className}`}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        {...inputProps}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={inputProps.placeholder || getPlaceholder()}
        className={`input-field ${displayError ? "error" : ""}`}
      />
      {getInputNote() && <p className="input-note">{getInputNote()}</p>}
      {displayError && <span className="error-message">{displayError}</span>}
    </div>
  );
};

export default JapaneseInput;
