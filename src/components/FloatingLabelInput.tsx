import React, { forwardRef, useState } from "react";
import * as Label from "@radix-ui/react-label";
import { cn } from "@/utils/cn";
import styles from "./FloatingLabelInput.module.css";

interface FloatingLabelInputProps {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "password" | "number";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  maxLength?: number;
  className?: string;
  helpText?: string | string[];
}

const FloatingLabelInput = forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(
  (
    {
      name,
      label,
      type = "text",
      placeholder,
      value = "",
      onChange,
      onBlur,
      error = false,
      errorMessage,
      disabled = false,
      readonly = false,
      required = false,
      maxLength,
      className,
      helpText,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = (value || "").length > 0;
    const shouldFloat = isFocused || hasValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onChange?.(newValue);
    };

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
      onBlur?.();
    };

    return (
      <div className={cn(styles.container, className)}>
        <div className={styles.inputWrapper}>
          <input
            ref={ref}
            id={name} // Important for label association
            name={name}
            type={type}
            value={value || ""}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readonly}
            /* required={required} */
            maxLength={maxLength}
            className={cn(
              styles.input,
              shouldFloat && styles.floating,
              error && styles.error,
              disabled && styles.disabled,
              readonly && styles.readonly
            )}
          />
          <Label.Root
            htmlFor={name} // Associates with input via id
            className={cn(
              styles.label,
              shouldFloat && styles.labelFloating,
              error && styles.labelError
            )}
          >
            {label}
            {required && <span className={styles.required}>*</span>}
          </Label.Root>
        </div>

        {error &&
          errorMessage &&
          (console.log(errorMessage),
          (<div className={styles.errorMessage}>{errorMessage}</div>))}

        {helpText && (
          <div className={styles.helpText}>
            {Array.isArray(helpText) ? (
              <ul className={styles.helpList}>
                {helpText.map((text, index) => (
                  <li className={styles.helpItem} key={index}>
                    {text}
                  </li>
                ))}
              </ul>
            ) : (
              helpText
            )}
          </div>
        )}
      </div>
    );
  }
);

FloatingLabelInput.displayName = "FloatingLabelInput";

export default FloatingLabelInput;
