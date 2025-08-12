import React from "react";
import styles from "./ApplicationCard.module.css";
interface TotalInsuranceFeeProps {
  totalFee: number;
  /*  applicationCount: number; */
  isNew?: boolean;
}

const formatCurrency = (amount: number) => {
  return `${amount.toLocaleString("ja-JP")}円`;
};

const TotalInsuranceFee: React.FC<TotalInsuranceFeeProps> = ({
  totalFee,
  /*  applicationCount, */
  isNew,
}) => {
  return (
    <div className={styles.applicationCard}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        {isNew ? "保険料の合計" : "保険料の合計(取消/謝絶は除く)"}
      </h3>
      <div className="text-3xl font-bold text-gray-900 text-center">
        {formatCurrency(totalFee)}
      </div>
    </div>
  );
};

export default TotalInsuranceFee;
