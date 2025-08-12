import { type InsuredBeneficiaryPairFormData } from "@/schemas";
import { faker } from "@faker-js/faker";
import type { InsuredBeneficiaryPairData } from "@/types";
import { validRelationshipOptions } from "./selectOptions";

type Gender = "男性" | "女性";

// Japanese common surnames and given names for more realistic data
const japaneseSurnames = [
  "田中",
  "佐藤",
  "鈴木",
  "高橋",
  "渡辺",
  "伊藤",
  "山本",
  "中村",
  "小林",
  "加藤",
];
const japaneseGivenNames = {
  male: [
    "太郎",
    "健太",
    "大輔",
    "拓也",
    "雅志",
    "洋一",
    "慎一",
    "正樹",
    "克也",
    "昌宏",
  ],
  female: [
    "花子",
    "美香",
    "恵子",
    "綾子",
    "美穂",
    "由美",
    "真理",
    "加奈子",
    "優子",
    "麻衣",
  ],
};

const japanesePrefs = [
  "東京都",
  "大阪府",
  "神奈川県",
  "愛知県",
  "埼玉県",
  "千葉県",
  "兵庫県",
  "北海道",
  "福岡県",
  "静岡県",
];

const generateJapaneseName = (gender: Gender) => {
  const surname = faker.helpers.arrayElement(japaneseSurnames);
  const givenName = faker.helpers.arrayElement(
    gender === "男性" ? japaneseGivenNames.male : japaneseGivenNames.female
  );
  return { lastName: surname, firstName: givenName };
};

const generateKatakanaName = (lastName: string, firstName: string) => {
  // Simple mapping for demo - in real app you'd use proper conversion
  const katakanaMap: { [key: string]: string } = {
    田中: "タナカ",
    佐藤: "サトウ",
    鈴木: "スズキ",
    高橋: "タカハシ",
    渡辺: "ワタナベ",
    太郎: "タロウ",
    花子: "ハナコ",
    健太: "ケンタ",
    美香: "ミカ",
    大輔: "ダイスケ",
    恵子: "ケイコ",
    拓也: "タクヤ",
    綾子: "アヤコ",
    雅志: "マサシ",
    美穂: "ミホ",
  };

  return {
    lastNameKana: katakanaMap[lastName] || "タナカ",
    firstNameKana: katakanaMap[firstName] || "タロウ",
  };
};

const generatePersonData = (gender?: Gender) => {
  const selectedGender =
    gender || faker.helpers.arrayElement(["男性", "女性"] as Gender[]);
  const { lastName, firstName } = generateJapaneseName(selectedGender);
  const { lastNameKana, firstNameKana } = generateKatakanaName(
    lastName,
    firstName
  );

  return {
    lastName,
    firstName,
    lastNameKana,
    firstNameKana,
    birthDate: faker.date
      .birthdate({ min: 20, max: 60, mode: "age" })
      .toISOString()
      .split("T")[0],
    gender: selectedGender,
    relationship: faker.helpers.arrayElement(validRelationshipOptions),
    postalCode: faker.string.numeric(7),
    prefecture: faker.helpers.arrayElement(japanesePrefs),
    city: `${faker.location.city()}市`,
    address: `${faker.location.streetAddress()}`,
    building: faker.datatype.boolean()
      ? `${faker.company.name()}マンション${faker.string.numeric(3)}号室`
      : "",
    phoneNumber: `0${faker.string.numeric(10)}`,
    email: faker.internet.email(),
  };
};

export const emptyInsured = {
  lastName: "",
  firstName: "",
  lastNameKana: "",
  firstNameKana: "",
  birthDate: "",
  gender: "男性" as Gender,
  relationship: "配偶者",
  postalCode: "",
  prefecture: "",
  city: "",
  address: "",
  building: "",
  phoneNumber: "",
  email: "",
};

export const emptyBeneficiary = {
  lastName: "",
  firstName: "",
  lastNameKana: "",
  firstNameKana: "",
  birthDate: "",
  gender: "男性" as Gender,
  relationship: "子",
  postalCode: "",
  prefecture: "",
  city: "",
  address: "",
  building: "",
  phoneNumber: "",
  email: "",
};

export const emptyInsuredBeneficiaryPair: InsuredBeneficiaryPairFormData = {
  insured: emptyInsured,
  beneficiary: emptyBeneficiary,
  isInsuredSameAsApplicant: false,
  isBeneficiarySameAsApplicant: false,
};

export const fakeSavedApplications = (): InsuredBeneficiaryPairData[] => {
  return Array.from({ length: faker.number.int({ min: 5, max: 5 }) }, () => {
    const insured = generatePersonData();
    const beneficiary = generatePersonData();

    return {
      id: faker.string.uuid(),
      insured,
      beneficiary,
      isInsuredSameAsApplicant: faker.datatype.boolean(),
      isBeneficiarySameAsApplicant: faker.datatype.boolean(),
      status: faker.helpers.arrayElement([
        "draft",
        "notified",
        "rejected",
      ] as const),
      createdAt: faker.date.recent({ days: 30 }).toISOString(),
      updatedAt: faker.date.recent({ days: 7 }).toISOString(),
    };
  });
};
