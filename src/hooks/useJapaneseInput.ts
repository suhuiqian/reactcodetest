import { useState, useCallback } from "react";
import { autoConvertInput } from "@/utils/japaneseTextUtils";

type FieldType = "name" | "kana" | "phone" | "postal" | "email" | "text";

interface UseJapaneseInputOptions {
  fieldType: FieldType;
  initialValue?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
}

export const useJapaneseInput = ({
  fieldType,
  initialValue = "",
  onChange,
  onBlur,
}: UseJapaneseInputOptions) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const convertedValue = autoConvertInput(inputValue, fieldType);

      setValue(convertedValue);
      onChange?.(convertedValue);
    },
    [fieldType, onChange]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const convertedValue = autoConvertInput(inputValue, fieldType);

      setValue(convertedValue);
      onBlur?.(convertedValue);
    },
    [fieldType, onBlur]
  );

  const setValueDirectly = useCallback(
    (newValue: string) => {
      const convertedValue = autoConvertInput(newValue, fieldType);
      setValue(convertedValue);
      onChange?.(convertedValue);
    },
    [fieldType, onChange]
  );

  return {
    value,
    onChange: handleChange,
    onBlur: handleBlur,
    setValue: setValueDirectly,
  };
};
