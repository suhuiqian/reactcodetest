import type { InsuredBeneficiaryPairData } from "@/types";

/**
 * Mock current user data for development/testing
 * Uses common Japanese names and Tokyo address
 */
export const mockCurrentUser: InsuredBeneficiaryPairData = {
  id: "current_user_001",
  applicant: {
    lastName: "田中",
    firstName: "太郎",
    lastNameKana: "タナカ",
    firstNameKana: "タロウ",
    birthDate: "1985-03-15",
  },
  insured: {
    lastName: "田中",
    firstName: "太郎",
    lastNameKana: "タナカ",
    firstNameKana: "タロウ",
    birthDate: "1985-03-15",
    gender: "男性",
    relationship: "本人",
    postalCode: "1000001",
    prefecture: "東京都",
    city: "千代田区",
    address: "千代田1-1-1",
    building: "サンライズビル501",
    phoneNumber: "09012345678",
    email: "tanaka.taro@example.com",
  },
  beneficiary: {
    lastName: "田中",
    firstName: "美咲",
    lastNameKana: "タナカ",
    firstNameKana: "ミサキ",
    birthDate: "1988-07-22",
    gender: "女性",
    relationship: "配偶者",
    postalCode: "1000001",
    prefecture: "東京都",
    city: "千代田区",
    address: "千代田1-1-1",
    building: "サンライズビル501",
    phoneNumber: "08087654321",
    email: "tanaka.misaki@example.com",
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  status: "draft",
};
