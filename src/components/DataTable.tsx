import React, { useState } from "react";
import styles from "./DataTable.module.css";

export interface InsuredPerson {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female";
  policyNumber: string;
  status: "active" | "inactive" | "pending";
  startDate: string;
  premium: number;
}

interface DataTableProps {
  data: InsuredPerson[];
  onRowClick?: (person: InsuredPerson) => void;
  className?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  onRowClick,
  className = "",
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof InsuredPerson;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: keyof InsuredPerson) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const getStatusColor = (status: InsuredPerson["status"]) => {
    switch (status) {
      case "active":
        return "status-active";
      case "inactive":
        return "status-inactive";
      case "pending":
        return "status-pending";
      default:
        return "";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(amount);
  };

  return (
    <div className={`${styles.dataTableContainer} ${className}`}>
      <div className={styles.dataTableWrapper}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>
                被保険者名
                {sortConfig?.key === "name" && (
                  <span
                    className={`${styles.sortIndicator} ${
                      styles[sortConfig.direction]
                    }`}
                  >
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </th>
              <th onClick={() => handleSort("age")}>
                年齢
                {sortConfig?.key === "age" && (
                  <span
                    className={`${styles.sortIndicator} ${
                      styles[sortConfig.direction]
                    }`}
                  >
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </th>
              <th onClick={() => handleSort("gender")}>
                性別
                {sortConfig?.key === "gender" && (
                  <span
                    className={`${styles.sortIndicator} ${
                      styles[sortConfig.direction]
                    }`}
                  >
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </th>
              <th onClick={() => handleSort("policyNumber")}>
                証券番号
                {sortConfig?.key === "policyNumber" && (
                  <span
                    className={`${styles.sortIndicator} ${
                      styles[sortConfig.direction]
                    }`}
                  >
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </th>
              <th onClick={() => handleSort("status")}>
                ステータス
                {sortConfig?.key === "status" && (
                  <span
                    className={`${styles.sortIndicator} ${
                      styles[sortConfig.direction]
                    }`}
                  >
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </th>
              <th onClick={() => handleSort("startDate")}>
                契約開始日
                {sortConfig?.key === "startDate" && (
                  <span
                    className={`${styles.sortIndicator} ${
                      styles[sortConfig.direction]
                    }`}
                  >
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </th>
              <th onClick={() => handleSort("premium")}>
                保険料
                {sortConfig?.key === "premium" && (
                  <span
                    className={`${styles.sortIndicator} ${
                      styles[sortConfig.direction]
                    }`}
                  >
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((person) => (
              <tr
                key={person.id}
                onClick={() => onRowClick?.(person)}
                className={onRowClick ? styles.clickable : ""}
              >
                <td>{person.name}</td>
                <td>{person.age}歳</td>
                <td>{person.gender === "male" ? "男性" : "女性"}</td>
                <td>{person.policyNumber}</td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${
                      styles[getStatusColor(person.status)]
                    }`}
                  >
                    {person.status === "active" && "有効"}
                    {person.status === "inactive" && "無効"}
                    {person.status === "pending" && "保留"}
                  </span>
                </td>
                <td>
                  {new Date(person.startDate).toLocaleDateString("ja-JP")}
                </td>
                <td>{formatCurrency(person.premium)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
