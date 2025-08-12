// YYYY/MM/DD HH:MM
export const formatTimestampToJapaneseDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

/**
 * Date utility functions for handling YYYYMMDD format
 * This format is used throughout the application for consistency
 */

/**
 * Converts a Date object to YYYYMMDD number format
 * @param date - Date object or null/undefined
 * @returns YYYYMMDD number or 0 if date is null/undefined
 */
export const formatDateToYYYYMMDD = (date: Date | null | undefined): number => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return 0;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return parseInt(`${year}${month}${day}`);
};

/**
 * Converts YYYYMMDD number to Date object
 * @param dateNumber - Date number in YYYYMMDD format
 * @returns Date object or null if invalid
 */
export const parseYYYYMMDDToDate = (dateNumber: number): Date | null => {
  if (!dateNumber || dateNumber <= 0) {
    return null;
  }

  const dateString = dateNumber.toString();
  if (dateString.length !== 8 || !/^\d{8}$/.test(dateString)) {
    return null;
  }

  const year = parseInt(dateString.substring(0, 4));
  const month = parseInt(dateString.substring(4, 6)) - 1; // Month is 0-indexed
  const day = parseInt(dateString.substring(6, 8));

  const date = new Date(year, month, day);

  // Validate that the date is valid (handles edge cases like 20230231)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

/**
 * Formats a Date object for display in Japanese locale
 * @param date - Date object or null/undefined
 * @param placeholder - Placeholder text when date is null/undefined
 * @returns Formatted date string for display
 */
export const formatDateForDisplay = (
  date: Date | null | undefined,
  placeholder: string = "日付を選択"
): string => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return placeholder;
  }

  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Validates if a YYYYMMDD number represents a valid date within a range
 * @param dateNumber - Date number in YYYYMMDD format
 * @param minDate - Minimum allowed date (YYYYMMDD format as number)
 * @param maxDate - Maximum allowed date (YYYYMMDD format as number)
 * @returns true if valid, false otherwise
 */
export const isValidDateInRange = (
  dateNumber: number,
  minDate: number,
  maxDate: number
): boolean => {
  if (!dateNumber || dateNumber <= 0) {
    return false;
  }

  return dateNumber >= minDate && dateNumber <= maxDate;
};

/**
 * Gets the current date in YYYYMMDD format
 * @returns Current date as YYYYMMDD number
 */
export const getCurrentDateYYYYMMDD = (): number => {
  return formatDateToYYYYMMDD(new Date());
};

/**
 * Converts ISO date string (YYYY-MM-DD) to YYYYMMDD format
 * @param isoDateString - Date string in YYYY-MM-DD format
 * @returns YYYYMMDD number or 0 if invalid
 */
export const convertISOToYYYYMMDD = (isoDateString: string): number => {
  if (!isoDateString || !/^\d{4}-\d{2}-\d{2}$/.test(isoDateString)) {
    return 0;
  }

  const date = new Date(isoDateString);
  if (isNaN(date.getTime())) {
    return 0;
  }

  return formatDateToYYYYMMDD(date);
};

/**
 * Converts YYYYMMDD number to ISO date string (YYYY-MM-DD)
 * @param yyyymmddNumber - Date number in YYYYMMDD format
 * @returns ISO date string or empty string if invalid
 */
export const convertYYYYMMDDToISO = (yyyymmddNumber: number): string => {
  const date = parseYYYYMMDDToDate(yyyymmddNumber);
  if (!date) {
    return "";
  }

  return date.toISOString().split("T")[0];
};

/**
 * Formats YYYYMMDD number to Japanese date string (YYYY年MM月DD日)
 * @param dateNumber - Date number in YYYYMMDD format
 * @returns Formatted Japanese date string or "未設定" if invalid
 */
export const formatYYYYMMDDToJapanese = (dateNumber: number): string => {
  if (!dateNumber || dateNumber <= 0) {
    return "未設定";
  }

  const dateString = dateNumber.toString();
  if (dateString.length !== 8 || !/^\d{8}$/.test(dateString)) {
    return "無効な日付";
  }

  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);

  return `${year}年${month}月${day}日`;
};
