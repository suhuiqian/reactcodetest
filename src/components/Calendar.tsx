import React from "react";
import { formatDateForDisplay } from "@/utils/dateUtils";
import styles from "./Calendar.module.css";

export interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  disabled?: Date[];
  className?: string;
  placeholder?: string;
  showOutsideDays?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

const Calendar: React.FC<CalendarProps> = ({
  selected,
  onSelect,
  disabled = [],
  className,
  placeholder = "日付を選択",
  minDate,
  maxDate,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    selected instanceof Date ? selected : undefined
  );
  const [currentMonth, setCurrentMonth] = React.useState(() => {
    /* const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1); */
    // TODO: hardcod data now
    // BETTER SOLUTION ?
    // 2000//1/1 , CAUTION: MONTH IS 0-11
    return new Date(2000, 0, 1);
  });

  // Update selected date when prop changes
  React.useEffect(() => {
    if (selected instanceof Date) {
      setSelectedDate(selected);
      setCurrentMonth(new Date(selected.getFullYear(), selected.getMonth(), 1));
    }
  }, [selected]);

  const handleSelect = (date: Date) => {
    setSelectedDate(date);
    onSelect?.(date);
    setIsOpen(false);
  };

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(e.target.value);
    const newMonth = new Date(year, currentMonth.getMonth(), 1);
    setCurrentMonth(newMonth);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(e.target.value);
    const newMonth = new Date(currentMonth.getFullYear(), month, 1);
    setCurrentMonth(newMonth);
  };

  const handleBackdropClick = () => {
    setIsOpen(false);
  };

  // Generate year options (50 years back from current year)
  //const currentYear = new Date().getFullYear();
  const currentYear = 2025;
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  // Generate month options
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: new Date(2024, i, 1).toLocaleDateString("ja-JP", { month: "long" }),
  }));

  // Check if a date is disabled based on min/max dates and disabled prop
  const isDateDisabled = (date: Date): boolean => {
    const today = new Date();

    // Check if date is in disabled array
    const isInDisabledArray = disabled.some(
      (d) => d.toDateString() === date.toDateString()
    );

    // Check if date is before min date
    const isBeforeMin = minDate && date < minDate;

    // Check if date is after max date
    const isAfterMax = maxDate && date > maxDate;

    // Check if date is in the future (for birthday selection)
    const isInFuture = date > today;

    return isInDisabledArray || isBeforeMin || isAfterMax || isInFuture;
  };

  // Generate calendar days
  const generateCalendarDays = (): CalendarDay[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Get first day of month and last day of month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Get the day of week for first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay();

    // Calculate days from previous month to fill first week
    const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // Monday = 0

    const days: CalendarDay[] = [];

    // Add days from previous month
    for (let i = daysFromPrevMonth; i > 0; i--) {
      const date = new Date(year, month, 1 - i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: Boolean(
          selectedDate && date.toDateString() === selectedDate.toDateString()
        ),
        isDisabled: isDateDisabled(date),
      });
    }

    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      const today = new Date();
      days.push({
        date,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString(),
        isSelected: Boolean(
          selectedDate && date.toDateString() === selectedDate.toDateString()
        ),
        isDisabled: isDateDisabled(date),
      });
    }

    // Add days from next month to fill last week (always 28 days total)
    const remainingDays = 28 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: Boolean(
          selectedDate && date.toDateString() === selectedDate.toDateString()
        ),
        isDisabled: isDateDisabled(date),
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className={`${styles.calendarContainer} ${className || ""}`}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={formatDateForDisplay(selectedDate, placeholder)}
          onClick={handleInputClick}
          onKeyDown={handleInputKeyDown}
          readOnly
          className={styles.dateInput}
          placeholder={placeholder}
          aria-label="日付を選択"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        />
        <button
          type="button"
          onClick={handleInputClick}
          className={styles.calendarButton}
          aria-label="カレンダーを開く"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className={styles.popover}>
          <div className={styles.calendarHeader}>
            <div className={styles.dropdownContainer}>
              <select
                value={currentMonth.getFullYear()}
                onChange={handleYearChange}
                className={styles.yearSelect}
              >
                {years.map((year) => (
                  // !FIX: can apply general CSS rules to render background color
                  // on all options
                  // NEED a 3rd-party component or custom component
                  // useState + <div> to replace <option>
                  <option key={year} value={year}>
                    {year}年
                  </option>
                ))}
              </select>
              <select
                value={currentMonth.getMonth()}
                onChange={handleMonthChange}
                className={styles.monthSelect}
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.calendarGrid}>
            {Array.from({ length: 4 }, (_, weekIndex) => (
              <div key={weekIndex} className={styles.calendarRow}>
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  const dayData = calendarDays[weekIndex * 7 + dayIndex];
                  if (!dayData)
                    return (
                      <div key={dayIndex} className={styles.calendarCell} />
                    );

                  const {
                    date,
                    isCurrentMonth,
                    isToday,
                    isSelected,
                    isDisabled,
                  } = dayData;

                  return (
                    <div key={dayIndex} className={styles.calendarCell}>
                      <button
                        type="button"
                        onClick={() => !isDisabled && handleSelect(date)}
                        className={`
                          ${styles.calendarDay}
                          ${
                            isCurrentMonth
                              ? styles.currentMonth
                              : styles.otherMonth
                          }
                          ${isToday ? styles.today : ""}
                          ${isSelected ? styles.selected : ""}
                          ${isDisabled ? styles.disabled : ""}
                        `}
                        disabled={isDisabled}
                      >
                        {date.getDate()}
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop for closing */}
      {isOpen && (
        <div className={styles.backdrop} onClick={handleBackdropClick} />
      )}
    </div>
  );
};

export default Calendar;
