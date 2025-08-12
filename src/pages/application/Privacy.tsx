import React from "react";
import CommonButton from "@/components/CommonButton";
import TextCard from "@/components/TextCard";
import styles from "./Privacy.module.css";
import { useLocation } from "react-router-dom";

const PRIVACY_CONTENT_POINTS = [
  "当社が取得した個人情報は、次の目的のために業務上必要な範囲で利用します。",
  `保険契約の引受、維持・管理、継続、保険金・給付金等の支払い
    当社の業務運営・管理、商品・サービスの開発・充実
    その他保険に関連・付随する業務
    また、当社および当社グループ会社は、本保険契約に関する個人情報を、本保険契約以外の保険契約のお引受け、履行のために利用することがあります。`,
];

const PRIVACY_CONTENT = {
  INTRO:
    "ヒューマンライフ少額短期保険株式会社（以下、　「当社」といいます)は、お客様の個人情報の保護を重要な責務と位置付け、その取り扱いについて次のとおり定めています。",
  PRIVACYTERMS: [
    {
      SECTION_TITLE: "1) お客さまの個人情報の利用目的について",
      SECTION_CONTEXT:
        "当社では、お客様の個人情報は次の目的のために利用します。これらの目的のほかに利用することはありません。",
      SECTION_TERMS: [
        "保険契約のお引受け、継続・維持管理、保険金のお支払い。",
        "関連企業・提携先企業を含む各種商品やサービス等の案内・提供、ご契約の維持管理。",
        "業務に関する情報提供・運営管理、商品・サービスの充実。",
        "その他保険に関連・付随する業務。",
      ],
    },
    {
      SECTION_TITLE: "2) 外部への提供について",
      SECTION_CONTEXT:
        "当社は次の場合を除いて、ご本人の個人情報を外部に提供することはありません。",
      SECTION_TERMS: [
        "あらかじめ、ご本人が同意されている場合。",
        "利用目的の達成に必要な範囲内において、業務を外部（当社代理店等）へ委託する場合。",
        "ご本人または公共の利益のために必要であると考えられる場合。",
        "再保険の対象となる保険契約の特定に必要な契約者または被保険者の個人情報。",
        "その他法令に根拠がある場合。",
      ],
    },
    {
      SECTION_TITLE: "3) 機微（センシティブ）情報の取り扱い",
      SECTION_CONTEXT:
        "当社が保険業の適切な業務運営を確保するために必要な範囲で医療情報等のセンシティブ（機微）情報を取得・利用すること。なお、医療情報等のセンシティブ（機微）情報については、保険業法施行規則により、利用目的が限定されています。",
      SECTION_TERMS: [],
    },
    {
      SECTION_TITLE: "4) ご意見・ご相談への対応",
      SECTION_CONTEXT:
        "当社は、個人情報の開示、訂正、利用の停止、消去その他の個人情報の取り扱いに関するご意見やお問い合わせに対し、法令の規定に基づき、適切に対応いたします。",
      SECTION_TERMS: [],
    },
  ],
};

//const userType = localStorage.getItem("userType") || "insured";
// TODO: refactor this
const Privacy: React.FC = () => {
  const location = useLocation();
  const userType = location.pathname.includes("insured-policy")
    ? "insured"
    : "applicant";

  return (
    <div className={styles.privacyPage}>
      <TextCard
        title={
          userType === "insured"
            ? "申込際の注意及び意向確認"
            : "申込際の注意及び意向確認について"
        }
      >
        <div className={styles.intro}>
          {PRIVACY_CONTENT.INTRO}

          {PRIVACY_CONTENT.PRIVACYTERMS.map((point, index) => (
            <div key={index} className={styles.sectionTitle}>
              {point.SECTION_TITLE}
              <div className={styles.sectionContext}>
                {point.SECTION_CONTEXT}
                {Array.isArray(point.SECTION_TERMS) &&
                  point.SECTION_TERMS.length > 0 && (
                    <ol className={styles.sectionTerms}>
                      {point.SECTION_TERMS.map((term, i) => (
                        <li key={i}>{term}</li>
                      ))}
                    </ol>
                  )}
              </div>
            </div>
          ))}
        </div>
      </TextCard>

      <div className={styles.actionButtons}>
        <CommonButton
          to={
            userType === "applicant"
              ? "/submitIdentity"
              : "/insured-application"
          }
        >
          同意する
        </CommonButton>
      </div>
    </div>
  );
};

export default Privacy;
