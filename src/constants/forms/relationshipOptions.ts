export type RelationshipCategory = "primary" | "first" | "second" | "third";

export interface RelationshipOption {
  value: string;
  label: string;
  category: RelationshipCategory;
}

export const relationshipOptions: RelationshipOption[] = [
  // 本人・配偶者 (最も一般的)
  { value: "配偶者", label: "配偶者", category: "primary" },
  { value: "本人", label: "本人", category: "primary" },

  // 1親等 - 直系家族
  { value: "父母", label: "父母", category: "first" },
  { value: "子", label: "子", category: "first" },

  // 2親等 - 一般的な受益者
  { value: "兄弟姉妹", label: "兄弟姉妹", category: "second" },
  { value: "祖父母", label: "祖父母", category: "second" },
  { value: "孫", label: "孫", category: "second" },

  // 3親等 - あまり一般的ではないが有効
  { value: "叔父叔母", label: "叔父叔母", category: "third" },
  { value: "甥姪", label: "甥姪", category: "third" },

  // その他
  /* { value: "その他", label: "その他", category: "third" }, */
];

export const categoryLabels: Record<RelationshipCategory, string> = {
  primary: "本人・配偶者",
  first: "1親等",
  second: "2親等",
  /*  third: "3親等・その他", */
  third: "3親等",
};
