import React from "react";
import styles from "./PremiumTable.module.css";

interface PremiumData {
  ageRange: string;
  male: string;
  female: string;
}

const PremiumTable: React.FC = () => {
  // Store premium data in a Map for better maintainability
  const premiumData: PremiumData[] = [
    { ageRange: "18~39歳", male: "590 円", female: "590 円" },
    { ageRange: "40~44歳", male: "810 円", female: "860 円" },
    { ageRange: "45~49歳", male: "940 円", female: "980 円" },
    { ageRange: "50~54歳", male: "1,290 円", female: "1,170 円" },
    { ageRange: "55~59歳", male: "1,840 円", female: "1,330 円" },
    { ageRange: "60~64歳", male: "2,260 円", female: "1,570 円" },
    { ageRange: "65~69歳", male: "3,340 円", female: "1,880 円" },
  ];

  return (
    <table className={styles.premiumTable}>
      <thead>
        {/* <tr className={styles.tableHeader}>
          <th colSpan={3}>保険料</th>
        </tr> */}
        <tr className={styles.tableSubheader}>
          <th>年齢</th>
          <th>男性</th>
          <th>女性</th>
        </tr>
      </thead>
      <tbody>
        {premiumData.map((row, index) => (
          <tr key={`${row.ageRange}-${index.toString()}`}>
            <td>{row.ageRange}</td>
            <td>{row.male}</td>
            <td>{row.female}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PremiumTable;
