export interface IdentityVerifySection {
  title: string;
  noBulletPoints?: string[];
  points?: string[];
  comments?: string[];
}

export interface IdentityContent {
  IDENTITY_CONTENT: IdentityVerifySection[];
  fileNumber: number;
}

export const IDENTITY_VERIFY_CONTENT: IdentityContent = {
  IDENTITY_CONTENT: [
    {
      title: "顔写真付き本人確認書類をお持ちの方",
      points: [
        "運転免許証（表裏）",
        "マイナンバーカード（表面のみ）",
        "住民基本台帳カード",
        "在留カード（表裏）",
        "特別永住者証明書",
      ],
      noBulletPoints: ["次のいずれか1点をご提出ください"],
      comments: [
        "有効期限内のものをご用意ください",
        "画像が不鮮明な場合は再提出をお願いすることがあります",
      ],
    },
    {
      title: "顔写真付き本人確認書類をお持ちでない方",
      points: [
        "健康保険証",
        "年金手帳",
        "住民票",
        "戸籍謄(抄)本",
      ],
      noBulletPoints: [
        "下記の書類の中から2点をご提出ください（氏名・住所・生年月日が記載されているもの）。",
      ],
      comments: [
        "2点の書類はすべて、記載されている情報が一致している必要があります。",
        "不備がある場合は再提出をお願いする場合があります。",
        "第三者によるなりすまし防止の観点から、提出内容に不備がある場合はご連絡させていただきます。",
      ],
    },
  ],
  fileNumber: 2,
};
