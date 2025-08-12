export interface PremiumData {
  ageRange: string;
  male: string;
  female: string;
}

// Store premium data for helper functions to access
const premiumData: PremiumData[] = [
  { ageRange: "18~39歳", male: "590 円", female: "590 円" },
  { ageRange: "40~44歳", male: "810 円", female: "860 円" },
  { ageRange: "45~49歳", male: "940 円", female: "980 円" },
  { ageRange: "50~54歳", male: "1,290 円", female: "1,170 円" },
  { ageRange: "55~59歳", male: "1,840 円", female: "1,330 円" },
  { ageRange: "60~64歳", male: "2,260 円", female: "1,570 円" },
  { ageRange: "65~69歳", male: "3,340 円", female: "1,880 円" },
];

/**
 * Calculate insurance premium based on age and gender
 * @param age - Age of the person
 * @param gender - Gender ('male' or 'female')
 * @returns Premium amount in Japanese format (e.g., "590 円") or "対象外" if not eligible
 */
export const calculatePremium = (
  age: number,
  gender: "male" | "female"
): string => {
  // Find the appropriate age range
  let ageRange: PremiumData | undefined;

  if (age >= 18 && age <= 39) {
    ageRange = premiumData.find((data) => data.ageRange === "18~39歳");
  } else if (age >= 40 && age <= 44) {
    ageRange = premiumData.find((data) => data.ageRange === "40~44歳");
  } else if (age >= 45 && age <= 49) {
    ageRange = premiumData.find((data) => data.ageRange === "45~49歳");
  } else if (age >= 50 && age <= 54) {
    ageRange = premiumData.find((data) => data.ageRange === "50~54歳");
  } else if (age >= 55 && age <= 59) {
    ageRange = premiumData.find((data) => data.ageRange === "55~59歳");
  } else if (age >= 60 && age <= 64) {
    ageRange = premiumData.find((data) => data.ageRange === "60~64歳");
  } else if (age >= 65 && age <= 69) {
    ageRange = premiumData.find((data) => data.ageRange === "65~69歳");
  }

  if (!ageRange) {
    return "対象外"; // Not eligible
  }

  return gender === "male" ? ageRange.male : ageRange.female;
};

/**
 * Get premium as number for calculations
 * @param age - Age of the person
 * @param gender - Gender ('male' or 'female')
 * @returns Premium amount as number or 0 if not eligible
 */
export const getPremiumAsNumber = (
  age: number,
  gender: "male" | "female" // TODO: generalize male(dansei) and female(josei), EN OR JA-JP
): number => {
  const premiumString = calculatePremium(age, gender);

  if (premiumString === "対象外") {
    return 0;
  }

  // Remove "円" and commas, then convert to number
  const cleanPremium = premiumString.replace(/[円,\s]/g, "");
  return parseInt(cleanPremium, 10) || 0;
};

/**
 * Check if age is eligible for insurance
 * @param age - Age to check
 * @returns true if age is within eligible range (18-69), false otherwise
 */
export const isAgeEligible = (age: number): boolean => {
  return age >= 18 && age <= 69;
};

/**
 * Get all premium data for display purposes
 * @returns Array of premium data
 */
export const getPremiumData = (): PremiumData[] => {
  return [...premiumData]; // Return a copy to prevent external modification
};

/**
 * Calculate total premium for multiple people
 * @param people - Array of people with age and gender
 * @returns Total premium amount as number
 */

/* export const calculateTotalPremium = (
  people: Array<{ age: number; gender: "male" | "female" }>
): number => {
  return people.reduce((total, person) => {
    return total + getPremiumAsNumber(person.age, person.gender);
  }, 0);
}; */

/**
 * Calculate age from a YYYY-MM-DD date string
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Age as number, or null if invalid date
 */
export const calculateAgeFromDate = (dateString: string): number | null => {
  if (!dateString) {
    return null;
  }

  const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
  const match = dateRegex.exec(dateString);

  if (!match) {
    return null;
  }

  const birthDate = new Date(dateString);

  // Check if the date is valid
  if (isNaN(birthDate.getTime())) {
    return null;
  }

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Adjust age if birthday hasn't occurred yet this year
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

/**
 * Calculate age and check eligibility for insurance from a YYYY-MM-DD date string
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Object with age and eligibility status, or null if invalid date
 */
export const calculateAgeAndEligibility = (
  dateString: string
): { age: number; isEligible: boolean } | null => {
  const age = calculateAgeFromDate(dateString);

  if (age === null) {
    return null;
  }

  return {
    age,
    isEligible: isAgeEligible(age),
  };
};
