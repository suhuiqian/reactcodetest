import React from "react";
import Select, { type StylesConfig } from "react-select";
import styles from "./RelationshipSelectorOnePulldown.module.css";
import { relationshipOptions } from "@/constants/selectOptions";
import type { SelectOption } from "@/types/selectTypes";

export interface RelationshipSelectorOnePulldownProps {
  name?: string;
  value?: string;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  isClearable?: boolean;
}

const RelationshipSelectorOnePulldown: React.FC<
  RelationshipSelectorOnePulldownProps
> = ({
  name,
  value,
  onChange,
  placeholder = "続柄を選択してください",
  className,
  disabled = false,
  error = false,
  errorMessage,
}) => {
  // Find the selected option
  const selectedOption =
    relationshipOptions.find((option) => option.value === value) ?? null;

  // Handle selection change
  const handleChange = (option: SelectOption | null) => {
    if (onChange) {
      onChange(option ? option.value : null);
    }
  };

  // Custom option component to show description
  const CustomOption = ({ data, ...props }: any) => (
    <div {...props.innerProps} className={styles.customOption}>
      <div className={styles.optionLabel}>{data.label}</div>
    </div>
  );

  // Custom styles for react-select with yellow theme
  const customStyles: StylesConfig = {
    control: (provided: any, state: any) => ({
      ...provided,
      minHeight: "48px",
      border: error
        ? "2px solid #ef4444"
        : state.isFocused
        ? "2px solid #fdd100"
        : "1px solid #d1d5db",
      borderRadius: "8px",
      boxShadow: state.isFocused
        ? error
          ? "0 0 0 1px #ef4444"
          : "0 0 0 1px #fdd100"
        : "none",
      backgroundColor: disabled ? "#f3f4f6" : "white",
      "&:hover": {
        border: error ? "2px solid #ef4444" : "1px solid #9ca3af",
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#fdd100"
        : state.isFocused
        ? "#fef3c7"
        : "white",
      color: state.isSelected ? "#1f2937" : "#374151",
      padding: "12px 16px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: state.isSelected ? "#fdd100" : "#fef3c7",
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 1000,
      borderRadius: "8px",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: "300px",
      padding: "4px",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#9ca3af",
      fontSize: "16px",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#374151",
      fontSize: "16px",
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: "#9ca3af",
      "&:hover": {
        color: "#6b7280",
      },
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      color: "#9ca3af",
      "&:hover": {
        color: "#6b7280",
      },
    }),
  };

  // FIX: NOT SEARCHABLE
  return (
    <div className={`${styles.container} ${className ?? ""}`}>
      <Select
        name={name}
        value={selectedOption}
        onChange={handleChange}
        options={relationshipOptions}
        placeholder={placeholder}
        isDisabled={disabled}
        /* isClearable={isClearable} */
        /*  isSearchable={true} */
        styles={customStyles}
        className={styles.select}
        classNamePrefix="relationship-select"
        components={{
          Option: CustomOption,
        }}
        filterOption={(option, inputValue) => {
          return option.label.toLowerCase().includes(inputValue.toLowerCase());
        }}
      />

      {error && errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};

export default RelationshipSelectorOnePulldown;
