import type { SelectOption } from "@/types/selectTypes";

export const relationshipOptions: SelectOption[] = [
  {
    value: "本人",
    label: "本人",
  },
  {
    value: "子",
    label: "子",
  },
  {
    value: "孫",
    label: "孫",
  },
  {
    value: "曾孫",
    label: "曾孫",
  },
  {
    value: "子の配偶者",
    label: "子の配偶者",
  },
  {
    value: "孫の配偶者",
    label: "孫の配偶者",
  },
  {
    value: "曾孫の配偶者",
    label: "曾孫の配偶者",
  },
  {
    value: "父母",
    label: "父母",
  },
  {
    value: "祖父母",
    label: "祖父母",
  },
  {
    value: "曾祖父母",
    label: "曾祖父母",
  },
  {
    value: "伯叔父母",
    label: "伯叔父母",
  },
  {
    value: "伯叔父母の配偶者",
    label: "伯叔父母の配偶者",
  },
  {
    value: "兄弟姉妹",
    label: "兄弟姉妹",
  },
  {
    value: "甥姪",
    label: "甥姪",
  },
  {
    value: "兄弟姉妹の配偶者",
    label: "兄弟姉妹の配偶者",
  },
  {
    value: "甥姪の配偶者",
    label: "甥姪の配偶者",
  },
  {
    value: "配偶者",
    label: "配偶者",
  },
  {
    value: "配偶者の兄弟姉妹",
    label: "配偶者の兄弟姉妹",
  },
  {
    value: "配偶者の甥姪",
    label: "配偶者の甥姪",
  },
  {
    value: "配偶者の父母",
    label: "配偶者の父母",
  },
  {
    value: "配偶者の伯叔父母",
    label: "配偶者の伯叔父母",
  },
  {
    value: "配偶者の祖父母",
    label: "配偶者の祖父母",
  },
  {
    value: "配偶者の曾祖父母",
    label: "配偶者の曾祖父母",
  },
] as const;

export const validRelationshipOptions = relationshipOptions.map(
  ({ value }) => value
);
