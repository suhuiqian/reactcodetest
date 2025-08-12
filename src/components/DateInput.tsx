import React from "react";
import Calendar from "./Calendar";
import { formatDateToYYYYMMDD, parseYYYYMMDDToDate } from "@/utils/dateUtils";
import styles from "./FormCard.module.css";

export interface DateInputProps {
  value?: number; // YYYYMMDD format as number
  onChange?: (value: number) => void; // Returns YYYYMMDD format as number
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  error?: boolean;
  errorMessage?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  placeholder = "日付を選択",
  className,
  minDate,
  maxDate,
  error = false,
  errorMessage,
}) => {
  // Convert YYYYMMDD number to Date object for Calendar
  const selectedDate = value
    ? parseYYYYMMDDToDate(value) || undefined
    : undefined;

  const handleDateSelect = (date: Date | undefined) => {
    if (onChange) {
      const yyyymmdd = formatDateToYYYYMMDD(date);
      onChange(yyyymmdd);
    }
  };

  return (
    <div className={className}>
      <Calendar
        selected={selectedDate}
        onSelect={handleDateSelect}
        placeholder={placeholder}
        minDate={minDate}
        maxDate={maxDate}
        className={`${styles.fieldInput} ${error ? styles.error : ""}`}
      />
      {error && errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};

export default DateInput;
