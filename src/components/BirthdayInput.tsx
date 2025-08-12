import React, { useState, useEffect, useMemo } from "react";
import Select, {
  type StylesConfig,
  type SingleValue,
  type MultiValue,
} from "react-select";
import styles from "./BirthdayInput.module.css";

export interface BirthdayInputProps {
  value?: string; // YYYY-MM-DD format as string
  onChange?: (value: string) => void; // Returns YYYY-MM-DD format as string
  className?: string;
  disabled?: boolean;
  minYear?: number;
  maxYear?: number;
  error?: boolean;
  errorMessage?: string;
}

interface SelectOption {
  value: number;
  label: string;
}

// Japanese calendar era mapping
const getJapaneseEra = (year: number): string => {
  if (year >= 2019) return "令和";
  if (year >= 1989) return "平成";
  if (year >= 1926) return "昭和";
  if (year >= 1912) return "大正";
  if (year >= 1868) return "明治";
  return "";
};

const getJapaneseEraYear = (year: number): number => {
  if (year >= 2019) return year - 2018; // Reiwa
  if (year >= 1989) return year - 1988; // Heisei
  if (year >= 1926) return year - 1925; // Showa
  if (year >= 1912) return year - 1911; // Taisho
  if (year >= 1868) return year - 1867; // Meiji
  return year;
};

// Parse YYYY-MM-DD string to date components
const parseYYYYMMDD = (dateString: string) => {
  if (!dateString || !dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return { year: null, month: null, day: null };
  }

  const [yearStr, monthStr, dayStr] = dateString.split("-");
  return {
    year: parseInt(yearStr, 10),
    month: parseInt(monthStr, 10),
    day: parseInt(dayStr, 10),
  };
};

// Format date components to YYYY-MM-DD string
const formatToYYYYMMDD = (year: number, month: number, day: number): string => {
  return `${year.toString()}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
};

// TODO
//const currentYear = new Date().getFullYear();
//  2025 - 15, MAXYEAR to 2010 ?
//const currentYear = 2025;
// TODO: for better UI/UX, auto select the date
// and auto scroll to the selected date (always show the selected date)
const BirthdayInput: React.FC<BirthdayInputProps> = ({
  value = "2020-01-01", // TODO: default set birthday
  onChange,
  className,
  disabled = false,
  minYear = 1900,
  maxYear = 2025, //currentYear, TODO: need to change this ?
  error = false,
  errorMessage,
}) => {
  // Parse current value
  const {
    year: currentYear,
    month: currentMonth,
    day: currentDay,
  } = parseYYYYMMDD(value || "");

  const [selectedYear, setSelectedYear] = useState<SelectOption | null>(
    currentYear
      ? {
          value: currentYear,
          label: `${currentYear.toString()}年 (${getJapaneseEra(
            currentYear
          )}${getJapaneseEraYear(currentYear).toString()}年)`,
        }
      : null
  );
  const [selectedMonth, setSelectedMonth] = useState<SelectOption | null>(
    currentMonth
      ? { value: currentMonth, label: `${currentMonth.toString()}月` }
      : null
  );
  const [selectedDay, setSelectedDay] = useState<SelectOption | null>(
    currentDay
      ? { value: currentDay, label: `${currentDay.toString()}日` }
      : null
  );

  // Update internal state when prop changes
  useEffect(() => {
    const { year, month, day } = parseYYYYMMDD(value || "");

    setSelectedYear(
      year
        ? {
            value: year,
            label: `${year.toString()}年 (${getJapaneseEra(
              year
            )}${getJapaneseEraYear(year).toString()}年)`,
          }
        : null
    );

    setSelectedMonth(
      month ? { value: month, label: `${month.toString()}月` } : null
    );
    setSelectedDay(day ? { value: day, label: `${day.toString()}日` } : null);
  }, [value]);

  // Generate year options with Japanese calendar
  const yearOptions = useMemo(() => {
    const years: SelectOption[] = [];
    for (let year = maxYear; year >= minYear; year--) {
      const era = getJapaneseEra(year);
      const eraYear = getJapaneseEraYear(year);
      years.push({
        value: year,
        label: `${year.toString()}年 (${era}${eraYear.toString()}年)`,
      });
    }
    return years;
  }, [minYear, maxYear]);

  // Generate month options
  const monthOptions = useMemo(() => {
    const months: SelectOption[] = [];
    for (let month = 1; month <= 12; month++) {
      months.push({ value: month, label: `${month.toString()}月` });
    }
    return months;
  }, []);

  // Generate day options based on selected year and month
  const dayOptions = useMemo(() => {
    if (!selectedYear || !selectedMonth) return [];

    const year = selectedYear.value;
    const month = selectedMonth.value;
    // TODO: really need this?
    const daysInMonth = new Date(year, month, 0).getDate();

    const days: SelectOption[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ value: day, label: `${day.toString()}日` });
    }
    return days;
  }, [selectedYear, selectedMonth]);

  // Update parent component with YYYY-MM-DD format
  const updateParentValue = (
    year: SelectOption | null,
    month: SelectOption | null,
    day: SelectOption | null
  ) => {
    if (year && month && day && onChange) {
      const dateString = formatToYYYYMMDD(year.value, month.value, day.value);
      onChange(dateString);
    }
  };

  // Handle year change
  const handleYearChange = (
    newValue: SingleValue<SelectOption> | MultiValue<SelectOption>
  ) => {
    const option = newValue as SingleValue<SelectOption>;
    setSelectedYear(option);

    // Reset day if it's no longer valid for the new year/month combination
    if (option && selectedMonth && selectedDay) {
      const daysInMonth = new Date(
        option.value,
        selectedMonth.value,
        0
      ).getDate();
      if (selectedDay.value > daysInMonth) {
        setSelectedDay(null);
        updateParentValue(option, selectedMonth, null);
      } else {
        updateParentValue(option, selectedMonth, selectedDay);
      }
    }
  };

  // Handle month change
  const handleMonthChange = (
    newValue: SingleValue<SelectOption> | MultiValue<SelectOption>
  ) => {
    const option = newValue as SingleValue<SelectOption>;
    setSelectedMonth(option);

    // Reset day if it's no longer valid for the new year/month combination
    if (selectedYear && option && selectedDay) {
      const daysInMonth = new Date(
        selectedYear.value,
        option.value,
        0
      ).getDate();
      if (selectedDay.value > daysInMonth) {
        setSelectedDay(null);
        updateParentValue(selectedYear, option, null);
      } else {
        updateParentValue(selectedYear, option, selectedDay);
      }
    }
  };

  // Handle day change
  const handleDayChange = (
    newValue: SingleValue<SelectOption> | MultiValue<SelectOption>
  ) => {
    const option = newValue as SingleValue<SelectOption>;
    setSelectedDay(option);
    updateParentValue(selectedYear, selectedMonth, option);
  };

  // Custom styles for react-select with yellow theme
  const customStyles: StylesConfig<SelectOption> = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "40px",
      border: error
        ? "1px solid #ef4444"
        : state.isFocused
        ? "1px solid #fdd100"
        : "1px solid #d1d5db",
      borderRadius: "6px",
      boxShadow: state.isFocused ? "0 0 0 1px #fdd100" : "none",
      backgroundColor: disabled ? "#f3f4f6" : "white",
      cursor: disabled ? "not-allowed" : "pointer", // not-allowed does not work, why
      "&:hover": {
        border: error
          ? "1px solid #ef4444"
          : disabled
          ? "1px solid #d1d5db" // Keep original border on hover when disabled
          : "1px solid #9ca3af",
      },
      pointerEvents: disabled ? "auto" : "auto", // Ensure pointer events work
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#fdd100"
        : state.isFocused
        ? "#fef3c7"
        : "white",
      color: state.isSelected ? "#1f2937" : "#374151",
      "&:hover": {
        backgroundColor: state.isSelected ? "#fdd100" : "#fef3c7",
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 1000,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: disabled ? "#9ca3af" : "#9ca3af",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: disabled ? "#9ca3af" : "#374151",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: disabled ? "#d1d5db" : "#d1d5db",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: disabled ? "#9ca3af" : "#6b7280",
    }),
  };

  return (
    <div className={`${styles.container} ${className ?? ""}`}>
      <div className={styles.selectGroup}>
        <div className={styles.selectWrapper}>
          <Select
            value={selectedYear}
            onChange={handleYearChange}
            options={yearOptions}
            placeholder="年"
            isDisabled={disabled}
            isClearable={false}
            isSearchable={false}
            styles={customStyles}
            className={styles.select}
            classNamePrefix="birthday-select"
            data-testid="birthday-year-select"
          />
        </div>

        <div className={styles.selectWrapper}>
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            options={monthOptions}
            placeholder="月"
            isDisabled={disabled}
            isClearable={false}
            isSearchable={false}
            styles={customStyles}
            className={styles.select}
            classNamePrefix="birthday-select"
            data-testid="birthday-month-select"
          />
        </div>

        <div className={styles.selectWrapper}>
          <Select
            value={selectedDay}
            onChange={handleDayChange}
            options={dayOptions}
            placeholder="日"
            isDisabled={disabled || !selectedYear || !selectedMonth}
            isClearable={false}
            isSearchable={false}
            styles={customStyles}
            className={styles.select}
            classNamePrefix="birthday-select"
            data-testid="birthday-day-select"
          />
        </div>
      </div>

      {error && errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};

export default BirthdayInput;
