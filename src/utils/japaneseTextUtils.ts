/**
 * Japanese Text Utilities for handling full-width (全角) and half-width (半角) characters
 */

// Character mapping for full-width to half-width conversion
const FULL_TO_HALF_MAP: Record<string, string> = {
  // Numbers
  "０": "0",
  "１": "1",
  "２": "2",
  "３": "3",
  "４": "4",
  "５": "5",
  "６": "6",
  "７": "7",
  "８": "8",
  "９": "9",

  // Alphabets
  Ａ: "A",
  Ｂ: "B",
  Ｃ: "C",
  Ｄ: "D",
  Ｅ: "E",
  Ｆ: "F",
  Ｇ: "G",
  Ｈ: "H",
  Ｉ: "I",
  Ｊ: "J",
  Ｋ: "K",
  Ｌ: "L",
  Ｍ: "M",
  Ｎ: "N",
  Ｏ: "O",
  Ｐ: "P",
  Ｑ: "Q",
  Ｒ: "R",
  Ｓ: "S",
  Ｔ: "T",
  Ｕ: "U",
  Ｖ: "V",
  Ｗ: "W",
  Ｘ: "X",
  Ｙ: "Y",
  Ｚ: "Z",
  ａ: "a",
  ｂ: "b",
  ｃ: "c",
  ｄ: "d",
  ｅ: "e",
  ｆ: "f",
  ｇ: "g",
  ｈ: "h",
  ｉ: "i",
  ｊ: "j",
  ｋ: "k",
  ｌ: "l",
  ｍ: "m",
  ｎ: "n",
  ｏ: "o",
  ｐ: "p",
  ｑ: "q",
  ｒ: "r",
  ｓ: "s",
  ｔ: "t",
  ｕ: "u",
  ｖ: "v",
  ｗ: "w",
  ｘ: "x",
  ｙ: "y",
  ｚ: "z",

  // Symbols
  "！": "!",
  "＂": '"',
  "＃": "#",
  "＄": "$",
  "％": "%",
  "＆": "&",
  "＇": "'",
  "（": "(",
  "）": ")",
  "＊": "*",
  "＋": "+",
  "，": ",",
  "－": "-",
  "．": ".",
  "／": "/",
  "：": ":",
  "；": ";",
  "＜": "<",
  "＝": "=",
  "＞": ">",
  "？": "?",
  "＠": "@",
  "［": "[",
  "＼": "\\",
  "］": "]",
  "＾": "^",
  "＿": "_",
  "｀": "`",
  "｛": "{",
  "｜": "|",
  "｝": "}",
  "～": "~",

  // Spaces
  "　": " ", // Full-width space to half-width space
};

// Character mapping for half-width to full-width conversion
const HALF_TO_FULL_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(FULL_TO_HALF_MAP).map(([full, half]) => [half, full])
);

/**
 * Convert full-width characters to half-width
 */
export const toHalfWidth = (str: string): string => {
  return str
    .split("")
    .map((char) => FULL_TO_HALF_MAP[char] || char)
    .join("");
};

/**
 * Convert half-width characters to full-width
 */
export const toFullWidth = (str: string): string => {
  return str
    .split("")
    .map((char) => HALF_TO_FULL_MAP[char] || char)
    .join("");
};

/**
 * Check if string contains only half-width characters
 */
export const isHalfWidth = (str: string): boolean => {
  return str === toHalfWidth(str);
};

/**
 * Check if string contains only full-width characters
 */
export const isFullWidth = (str: string): boolean => {
  return str === toFullWidth(str);
};

/**
 * Check if string contains any full-width characters
 */
export const hasFullWidth = (str: string): boolean => {
  return str !== toHalfWidth(str);
};

/**
 * Check if string contains any half-width characters
 */
export const hasHalfWidth = (str: string): boolean => {
  return str !== toFullWidth(str);
};

/**
 * Validate katakana (both full-width and half-width)
 */
export const isValidKatakana = (str: string): boolean => {
  // Full-width katakana: ァ-ヶー
  // Half-width katakana: ｦ-ﾟ
  const katakanaRegex = /^[ァ-ヶーｦ-ﾟ]+$/;
  return katakanaRegex.test(str);
};

/**
 * Validate hiragana (full-width only)
 */
export const isValidHiragana = (str: string): boolean => {
  const hiraganaRegex = /^[ぁ-んー]+$/;
  return hiraganaRegex.test(str);
};

/**
 * Validate kanji, hiragana, katakana, and basic punctuation
 */
export const isValidJapaneseName = (str: string): boolean => {
  const japaneseNameRegex = /^[一-龯ぁ-んァ-ヶーｦ-ﾟ\s　]+$/;
  return japaneseNameRegex.test(str);
};

/**
 * Validate phone number (accepts both full-width and half-width numbers)
 */
export const isValidPhoneNumber = (str: string): boolean => {
  const normalized = toHalfWidth(str.replace(/[-\s　]/g, ""));
  return /^\d{10,11}$/.test(normalized);
};

/**
 * Validate postal code (accepts both full-width and half-width numbers)
 */
export const isValidPostalCode = (str: string): boolean => {
  const normalized = toHalfWidth(str.replace(/[-\s　]/g, ""));
  return /^\d{7}$/.test(normalized);
};

/**
 * Validate email (converts full-width characters to half-width)
 */
export const isValidEmail = (str: string): boolean => {
  const normalized = toHalfWidth(str);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(normalized);
};

/**
 * Check if phone number contains full-width characters (for error messages)
 */
export const hasFullWidthInPhone = (str: string): boolean => {
  return /[０-９　]/.test(str);
};

/**
 * Check if postal code contains full-width characters (for error messages)
 */
export const hasFullWidthInPostal = (str: string): boolean => {
  return /[０-９　]/.test(str);
};

/**
 * Check if email contains full-width characters (for error messages)
 */
export const hasFullWidthInEmail = (str: string): boolean => {
  return /[Ａ-Ｚａ-ｚ０-９　]/.test(str);
};

/**
 * Get appropriate error message for field type
 */
export const getCharacterTypeError = (
  str: string,
  fieldType: "phone" | "postal" | "email" | "kana"
): string | null => {
  switch (fieldType) {
    case "phone":
      return hasFullWidthInPhone(str) ? "半角数字で入力してください" : null;
    case "postal":
      return hasFullWidthInPostal(str) ? "半角数字で入力してください" : null;
    case "email":
      return hasFullWidthInEmail(str) ? "半角英数字で入力してください" : null;
    case "kana":
      return !isValidKatakana(str) ? "カタカナで入力してください" : null;
    default:
      return null;
  }
};

/**
 * Format phone number with hyphens (only if valid)
 */
export const formatPhoneNumber = (str: string): string => {
  const normalized = toHalfWidth(str.replace(/[-\s　]/g, ""));
  if (normalized.length === 10) {
    return `${normalized.slice(0, 3)}-${normalized.slice(
      3,
      6
    )}-${normalized.slice(6)}`;
  } else if (normalized.length === 11) {
    return `${normalized.slice(0, 3)}-${normalized.slice(
      3,
      7
    )}-${normalized.slice(7)}`;
  }
  return normalized;
};

/**
 * Format postal code with hyphen (only if valid)
 */
export const formatPostalCode = (str: string): string => {
  const normalized = toHalfWidth(str.replace(/[-\s　]/g, ""));
  if (normalized.length === 7) {
    return `${normalized.slice(0, 3)}-${normalized.slice(3)}`;
  }
  return normalized;
};

/**
 * Auto-convert input based on field type (optional, for convenience)
 */
export const autoConvertInput = (
  value: string,
  fieldType: "name" | "kana" | "phone" | "postal" | "email" | "text"
): string => {
  switch (fieldType) {
    case "name":
      // Allow mixed Japanese characters, convert spaces
      return value.replace(/　/g, " ");
    case "kana":
      // Convert to full-width katakana
      return toFullWidth(value.toUpperCase());
    case "phone":
      // Convert to half-width numbers
      return toHalfWidth(value);
    case "postal":
      // Convert to half-width numbers
      return toHalfWidth(value);
    case "email":
      // Convert to half-width
      return toHalfWidth(value);
    case "text":
    default:
      // No conversion
      return value;
  }
};
