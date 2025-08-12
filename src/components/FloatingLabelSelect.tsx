import React, { forwardRef, useState } from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/utils/cn";
import styles from "./FloatingLabelSelect.module.css";

interface SelectOption {
  value: string;
  label: string;
}

interface FloatingLabelSelectProps {
  name: string;
  label: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  className?: string;
  helpText?: string;
}

const FloatingLabelSelect = forwardRef<
  HTMLButtonElement,
  FloatingLabelSelectProps
>(
  (
    {
      name,
      label,
      options,
      value = "",
      onChange,
      onBlur,
      error = false,
      errorMessage,
      disabled = false,
      required = false,
      placeholder = "選択してください",
      className,
      helpText,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasValue = value.length > 0;
    const shouldFloat = isOpen || hasValue;

    //const selectedOption = options.find((option) => option.value === value);
    // default value?
    return (
      <div className={cn(styles.container, className)}>
        <Select.Root
          value={value}
          onValueChange={onChange}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open && onBlur) {
              onBlur();
            }
          }}
          disabled={disabled}
          name={name}
        >
          <Select.Trigger
            ref={ref}
            className={cn(
              styles.trigger,
              shouldFloat && styles.floating,
              error && styles.error,
              disabled && styles.disabled
            )}
          >
            <Select.Value placeholder={placeholder} />
            <Select.Icon className={styles.icon}>
              <ChevronDownIcon />
            </Select.Icon>
            <label
              className={cn(
                styles.label,
                shouldFloat && styles.labelFloating,
                error && styles.labelError
              )}
            >
              {label}
              {required && <span className={styles.required}>*</span>}
            </label>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className={styles.content}>
              <Select.Viewport className={styles.viewport}>
                {options.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    className={styles.item}
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>

        {error && errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}

        {helpText && !error && (
          <div className={styles.helpText}>{helpText}</div>
        )}
      </div>
    );
  }
);

FloatingLabelSelect.displayName = "FloatingLabelSelect";

export default FloatingLabelSelect;
