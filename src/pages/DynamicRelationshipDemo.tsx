import React from "react";
import DynamicRelationshipSelector from "../components/DynamicRelationshipSelector";
import RelationshipField from "../components/RelationshipField";
import styles from "./DynamicRelationshipDemo.module.css";

const DynamicRelationshipDemo: React.FC = () => {
  return (
    <div className={styles.demoWrapper}>
      <div className={styles.demoContainer}>
        <div className={styles.demoHeader}>
          <h1 className={styles.demoTitle}>Dynamic Relationship Selector</h1>
          <p className={styles.demoSubtitle}>
            ユーザーを段階的に誘導する関係選択UI
          </p>
        </div>

        <div className={styles.demoSection}>
          <h2 className={styles.sectionTitle}>基本使用例（フルサイズ）</h2>
          <DynamicRelationshipSelector />
        </div>

        <div className={styles.demoSection}>
          <h2 className={styles.sectionTitle}>useFormContext 統合</h2>
          <div style={{ maxWidth: "600px" }}>
            <p className={styles.demoText}>
              新しい RelationshipField コンポーネントは useFormContext
              を使用して、 プロップドリリングなしでフォームと統合されます。
            </p>
            <pre className={styles.codeExample}>
              {`// シンプルな使用法（FormProvider 内で）
<RelationshipField
  name="insured.relationship"
  disabled={isSameAsApplicant}
  label="続柄"
  helpText="※被保険者から見た契約者の続柄を入力してください。"
/>

// 従来の方法（プロップドリリング）
<DynamicRelationshipSelector
  value={watch("insured.relationship")}
  onChange={(value) => setValue("insured.relationship", value)}
  error={!!errors.insured?.relationship}
  errorMessage={errors.insured?.relationship?.message}
/>`}
            </pre>
          </div>
        </div>

        <div className={styles.infoSection}>
          <h3 className={styles.infoTitle}>このアプローチの利点</h3>
          <ul className={styles.infoList}>
            <li className={styles.infoItem}>
              <span className={styles.infoBullet}>•</span>
              <span className={styles.infoText}>
                <span className={styles.infoHighlight}>段階的選択</span>:
                複雑な関係を簡単なステップに分解
              </span>
            </li>
            <li className={styles.infoItem}>
              <span className={styles.infoBullet}>•</span>
              <span className={styles.infoText}>
                <span className={styles.infoHighlight}>直感的</span>:
                ユーザーの思考プロセスに合わせた流れ
              </span>
            </li>
            <li className={styles.infoItem}>
              <span className={styles.infoBullet}>•</span>
              <span className={styles.infoText}>
                <span className={styles.infoHighlight}>親等の概念不要</span>:
                法的分類をユーザーから隠蔽
              </span>
            </li>
            <li className={styles.infoItem}>
              <span className={styles.infoBullet}>•</span>
              <span className={styles.infoText}>
                <span className={styles.infoHighlight}>
                  モバイルフレンドリー
                </span>
                : 一度に表示するオプションが少ない
              </span>
            </li>
            <li className={styles.infoItem}>
              <span className={styles.infoBullet}>•</span>
              <span className={styles.infoText}>
                <span className={styles.infoHighlight}>拡張可能</span>:
                新しい関係を簡単に追加可能
              </span>
            </li>
            <li className={styles.infoItem}>
              <span className={styles.infoBullet}>•</span>
              <span className={styles.infoText}>
                <span className={styles.infoHighlight}>エラー防止</span>:
                正しい選択パスのみ提供
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DynamicRelationshipDemo;
