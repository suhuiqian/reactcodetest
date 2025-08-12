import React, { useState, useRef, useEffect } from "react";
import styles from "./CupertinoDatePicker.module.css";

interface CupertinoDatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

const CupertinoDatePicker: React.FC<CupertinoDatePickerProps> = ({
  value,
  onChange,
  disabled = false,
  className = "",
  placeholder = "日付を選択",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(
    value?.getFullYear() ?? new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState(
    (value?.getMonth() ?? new Date().getMonth()) + 1
  );
  const [selectedDay, setSelectedDay] = useState(
    value?.getDate() ?? new Date().getDate()
  );

  const pickerRef = useRef<HTMLDivElement>(null);
  const yearWheelRef = useRef<HTMLDivElement>(null);
  const monthWheelRef = useRef<HTMLDivElement>(null);
  const dayWheelRef = useRef<HTMLDivElement>(null);

  // Generate arrays for picker wheels
  const years = Array.from(
    { length: 50 },
    (_, i) => new Date().getFullYear() - 65 + i
  );
  // 15 -> 65
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // Get days in selected month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    const daysInMonth = getDaysInMonth(year, selectedMonth);
    if (selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth);
    }
    // Real-time update
    const newDate = new Date(year, selectedMonth - 1, selectedDay);
    onChange?.(newDate);
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    const daysInMonth = getDaysInMonth(selectedYear, month);
    if (selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth);
    }
    // Real-time update
    const newDate = new Date(selectedYear, month - 1, selectedDay);
    onChange?.(newDate);
  };

  const handleDayChange = (day: number) => {
    setSelectedDay(day);
    // Real-time update
    const newDate = new Date(selectedYear, selectedMonth - 1, day);
    onChange?.(newDate);
  };

  const handleConfirm = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    // Reset to original value
    if (value) {
      setSelectedYear(value.getFullYear());
      setSelectedMonth(value.getMonth() + 1);
      setSelectedDay(value.getDate());
    }
  };

  // Scroll to selected item
  const scrollToItem = (
    wheelRef: React.RefObject<HTMLDivElement | null>,
    targetItem: number,
    items: number[]
  ) => {
    if (wheelRef.current) {
      const itemHeight = 40; // Match CSS height
      const targetIndex = items.indexOf(targetItem);
      if (targetIndex !== -1) {
        const scrollTop = targetIndex * itemHeight;
        wheelRef.current.scrollTo({
          top: scrollTop,
          behavior: "smooth",
        });
      }
    }
  };

  // Handle scroll events for real-time updates
  const handleScroll = (
    wheelRef: React.RefObject<HTMLDivElement | null>,
    items: number[],
    onChange: (value: number) => void
  ) => {
    if (wheelRef.current) {
      const itemHeight = 40; // Match CSS height
      const scrollTop = wheelRef.current.scrollTop;
      const index = Math.round(scrollTop / itemHeight);
      const newValue = items[index];
      if (newValue !== undefined) {
        onChange(newValue);
      }
    }
  };

  // Handle wheel events for better UX
  const handleWheel = (
    e: React.WheelEvent,
    wheelRef: React.RefObject<HTMLDivElement | null>,
    items: number[],
    currentValue: number,
    onChange: (value: number) => void
  ) => {
    e.preventDefault();
    if (wheelRef.current) {
      const delta = e.deltaY > 0 ? 1 : -1;
      const currentIndex = items.indexOf(currentValue);
      const newIndex = Math.max(
        0,
        Math.min(items.length - 1, currentIndex + delta)
      );
      const newValue = items[newIndex];
      onChange(newValue);
      scrollToItem(wheelRef, newValue, items);
    }
  };

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Update internal state when value prop changes
  useEffect(() => {
    if (value) {
      setSelectedYear(value.getFullYear());
      setSelectedMonth(value.getMonth() + 1);
      setSelectedDay(value.getDate());
    }
  }, [value]);

  // Scroll to selected items when picker opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        scrollToItem(yearWheelRef, selectedYear, years);
        scrollToItem(monthWheelRef, selectedMonth, months);
        scrollToItem(
          dayWheelRef,
          selectedDay,
          Array.from(
            { length: getDaysInMonth(selectedYear, selectedMonth) },
            (_, i) => i + 1
          )
        );
      }, 100);
    }
  }, [isOpen, selectedYear, selectedMonth, selectedDay]);

  const renderPickerWheel = (
    items: number[],
    selectedValue: number,
    onChange: (value: number) => void,
    formatItem: (item: number) => string,
    wheelRef: React.RefObject<HTMLDivElement | null>
  ) => {
    return (
      <div className={styles.pickerWheel}>
        <div
          ref={wheelRef}
          className={styles.pickerWheelContent}
          onScroll={() => handleScroll(wheelRef, items, onChange)}
          onWheel={(e) =>
            handleWheel(e, wheelRef, items, selectedValue, onChange)
          }
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`${styles.pickerItem} ${
                item === selectedValue ? styles.selected : ""
              }`}
              onClick={() => {
                onChange(item);
                scrollToItem(wheelRef, item, items);
              }}
            >
              {formatItem(item)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`${styles.container} ${className}`} ref={pickerRef}>
      <button
        type="button"
        className={`${styles.trigger} ${disabled ? styles.disabled : ""}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className={styles.triggerText}>
          {value ? formatDate(value) : placeholder}
        </span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.rotated : ""}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.pickerOverlay}>
          <div className={styles.pickerContainer}>
            <div className={styles.pickerHeader}>
              <button
                type="button"
                className={styles.pickerButton}
                onClick={handleCancel}
              >
                キャンセル
              </button>
              <span className={styles.pickerTitle}>日付を選択</span>
              <button
                type="button"
                className={`${styles.pickerButton} ${styles.confirmButton}`}
                onClick={handleConfirm}
              >
                完了
              </button>
            </div>

            <div className={styles.pickerContent}>
              {renderPickerWheel(
                years,
                selectedYear,
                handleYearChange,
                (year) => `${year}年`,
                yearWheelRef
              )}
              {renderPickerWheel(
                months,
                selectedMonth,
                handleMonthChange,
                (month) => `${month}月`,
                monthWheelRef
              )}
              {renderPickerWheel(
                Array.from(
                  { length: getDaysInMonth(selectedYear, selectedMonth) },
                  (_, i) => i + 1
                ),
                selectedDay,
                handleDayChange,
                (day) => `${day}日`,
                dayWheelRef
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CupertinoDatePicker;
