import { formatDateForDisplay } from "./dateUtils";

/**
 * Format a person's full name
 */
export const formatFullName = (lastName: string, firstName: string): string => {
  return `${lastName} ${firstName}`;
};

/**
 * Format a person's full name in kana
 */
export const formatFullNameKana = (
  lastNameKana: string,
  firstNameKana: string
): string => {
  return `${lastNameKana} ${firstNameKana}`;
};

/**
 * Format a complete address
 */
export const formatAddress = (
  prefecture: string,
  city: string,
  address?: string,
  building?: string
): string => {
  const parts = [prefecture, city, address, building].filter(Boolean);
  return parts.join(" ");
};

/**
 * Format postal code with proper spacing
 */
export const formatPostalCode = (postalCode: string): string => {
  /* return `〒${postalCode}`; */
  return `${postalCode.slice(0, 3)}-${postalCode.slice(3)}`;
};

/**
 * Format phone number with proper spacing
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  // Format as 090-1234-5678
  if (phoneNumber.length === 11) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
      3,
      7
    )}-${phoneNumber.slice(7)}`;
  }
  return phoneNumber;
};

/**
 * Format birth date for display
 */
export const formatBirthDate = (birthDate: string): string => {
  return formatDateForDisplay(new Date(birthDate));
};

/**
 * Format status for display
 */
export const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    draft: "下書き",
    submitted: "提出済み",
    approved: "承認済み",
    rejected: "却下",
  };
  return statusMap[status] || status;
};

/**
 * Format date time for display
 */
export const formatDateTime = (dateTime: string): string => {
  return new Date(dateTime).toLocaleString("ja-JP");
};

export const formatCurrency = (amount: number) => {
  return amount.toLocaleString("ja-JP") + "円";
};
