import type { InsuredBeneficiaryPairData } from "@/types";

/**
 * Check if the current user (applicant) is included in the applications list
 * @param applications - List of insured-beneficiary pairs
 * @param applicantData - Current user's data
 * @returns true if current user is in applications, false otherwise
 */
export const isCurrentUserInApplications = (
  applications: InsuredBeneficiaryPairData[],
  applicantData: InsuredBeneficiaryPairData | null
): boolean => {
  if (!applicantData) return false;

  return applications.some((app) => {
    // Check if the insured or beneficiary matches the current user
    const insuredMatches =
      app.insured.lastName === applicantData.insured.lastName &&
      app.insured.firstName === applicantData.insured.firstName &&
      app.insured.birthDate === applicantData.insured.birthDate;

    const beneficiaryMatches =
      app.beneficiary.lastName === applicantData.beneficiary.lastName &&
      app.beneficiary.firstName === applicantData.beneficiary.firstName &&
      app.beneficiary.birthDate === applicantData.beneficiary.birthDate;

    return insuredMatches || beneficiaryMatches;
  });
};

/**
 * Get the workflow type based on whether current user is in applications
 * @param applications - List of insured-beneficiary pairs
 * @param applicantData - Current user's data
 * @returns 'with-disclosure' or 'skip-disclosure'
 */
export const getWorkflowType = (
  applications: InsuredBeneficiaryPairData[],
  applicantData: InsuredBeneficiaryPairData | null
): "with-disclosure" | "skip-disclosure" => {
  return isCurrentUserInApplications(applications, applicantData)
    ? "skip-disclosure"
    : "with-disclosure";
};
