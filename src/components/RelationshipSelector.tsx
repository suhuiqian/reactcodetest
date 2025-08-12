import React, { useState, useEffect } from "react";
import styles from "./RelationshipSelector.module.css";
import {
  relationshipOptions,
  categoryLabels,
  type RelationshipCategory,
  type RelationshipOption,
} from "@/constants/forms/relationshipOptions";

// TODO: potential BETTER UI
// Option 1: Single Grouped Dropdown
// Option 2: Card-based Selection
// Option 3: Tab-based Selection
export interface RelationshipSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

const RelationshipSelector: React.FC<RelationshipSelectorProps> = ({
  value,
  onChange,
  disabled = false,
  className,
  placeholder = "関係を選択",
}) => {
  // Get current relationship's category
  const currentRelationship = relationshipOptions.find(
    (option) => option.value === value
  );
  const currentCategory = currentRelationship?.category || "";

  // Initialize selected category based on current value
  const [selectedCategory, setSelectedCategory] = useState<
    RelationshipCategory | ""
  >(currentCategory);

  // Update selected category when value changes
  useEffect(() => {
    const newCurrentRelationship = relationshipOptions.find(
      (option) => option.value === value
    );
    const newCurrentCategory = newCurrentRelationship?.category || "";
    setSelectedCategory(newCurrentCategory);
  }, [value]);

  // Group options by category
  const groupedOptions = relationshipOptions.reduce((acc, option) => {
    if (!acc[option.category]) {
      acc[option.category] = [];
    }
    acc[option.category].push(option);
    return acc;
  }, {} as Record<RelationshipCategory, RelationshipOption[]>);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value as RelationshipCategory | "";
    setSelectedCategory(category);

    // If category is empty, clear the relationship
    if (!category) {
      onChange("");
      return;
    }

    // If there's only one option in the category, auto-select it
    const optionsInCategory = groupedOptions[category] || [];
    if (optionsInCategory.length === 1) {
      onChange(optionsInCategory[0].value);
    } else {
      // Keep current value if it's in the selected category, otherwise clear
      const currentValueInCategory = optionsInCategory.find(
        (opt) => opt.value === value
      );
      if (!currentValueInCategory) {
        onChange("");
      }
    }
  };

  const handleRelationshipChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onChange(event.target.value);
  };

  // Get available relationships for the selected category
  const availableRelationships = selectedCategory
    ? groupedOptions[selectedCategory] || []
    : currentCategory
    ? groupedOptions[currentCategory] || []
    : [];

  return (
    <div className={`${styles.container} ${className || ""}`}>
      {/* Category Selector */}
      <div className={styles.categoryContainer}>
        <label className={styles.categoryLabel}>関係カテゴリ</label>
        <select
          value={selectedCategory || currentCategory || ""}
          onChange={handleCategoryChange}
          disabled={disabled}
          className={styles.categorySelect}
        >
          <option value="">カテゴリを選択</option>
          {Object.entries(categoryLabels).map(([category, label]) => (
            <option key={category} value={category}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Relationship Selector */}
      <div className={styles.relationshipContainer}>
        <label className={styles.relationshipLabel}>具体的な関係</label>
        <select
          value={value}
          onChange={handleRelationshipChange}
          disabled={disabled || (!selectedCategory && !currentCategory)}
          className={styles.relationshipSelect}
        >
          <option value="">{placeholder}</option>
          {availableRelationships.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RelationshipSelector;
