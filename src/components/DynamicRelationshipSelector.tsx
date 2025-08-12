import React, { useState, useEffect } from "react";
import { ArrowLeft, ChevronRight, X } from "lucide-react";
import styles from "./DynamicRelationshipSelector.module.css";

// Type definitions
interface FlowOption {
  id: string;
  label: string;
  final?: string;
  next?: number;
}

interface FlowStep {
  title: string;
  options: FlowOption[];
}

interface FlowData {
  [key: number]: FlowStep;
}

interface DynamicRelationshipSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  compact?: boolean;
  className?: string;
  // New props for popup mode
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  triggerElement?: React.ReactNode;
}

// Relationship flow data
const RELATIONSHIP_FLOW_DATA: FlowData = {
  0: {
    title: "誰の関係ですか？",
    options: [
      { id: "self", label: "本人", final: "本人" },
      { id: "spouse", label: "配偶者", final: "配偶者" },
      { id: "my_family", label: "私の家族", next: 1 },
      { id: "spouse_family", label: "配偶者の家族", next: 2 },
      { id: "family_spouse", label: "家族の配偶者", next: 3 },
    ],
  },
  1: {
    title: "私の家族の誰ですか？",
    options: [
      { id: "parents", label: "両親", next: 11 },
      { id: "children", label: "子供", next: 12 },
      { id: "siblings", label: "兄弟姉妹", next: 13 },
      { id: "grandparents", label: "祖父母", next: 14 },
      { id: "grandchildren", label: "孫", next: 15 },
      { id: "uncle_aunt", label: "おじ・おば", final: "おじ・おば" },
      { id: "nephew_niece", label: "甥・姪", final: "甥・姪" },
    ],
  },
  2: {
    title: "配偶者の家族の誰ですか？",
    options: [
      { id: "spouse_parents", label: "両親", final: "配偶者の父母" },
      { id: "spouse_siblings", label: "兄弟姉妹", final: "配偶者の兄弟姉妹" },
      { id: "spouse_grandparents", label: "祖父母", final: "配偶者の祖父母" },
      {
        id: "spouse_uncle_aunt",
        label: "おじ・おば",
        final: "配偶者のおじ・おば",
      },
      { id: "spouse_nephew_niece", label: "甥・姪", final: "配偶者の甥・姪" },
    ],
  },
  3: {
    title: "誰の配偶者ですか？",
    options: [
      { id: "child_spouse", label: "子供の配偶者", final: "子の配偶者" },
      {
        id: "sibling_spouse",
        label: "兄弟姉妹の配偶者",
        final: "兄弟姉妹の配偶者",
      },
      { id: "grandchild_spouse", label: "孫の配偶者", final: "孫の配偶者" },
      {
        id: "uncle_aunt_spouse",
        label: "おじ・おばの配偶者",
        final: "おじ・おばの配偶者",
      },
    ],
  },
  11: {
    title: "どちらの親ですか？",
    options: [
      { id: "father", label: "父", final: "父" },
      { id: "mother", label: "母", final: "母" },
      { id: "both_parents", label: "父母", final: "父母" },
    ],
  },
  12: {
    title: "お子さんについて",
    options: [
      { id: "son", label: "息子", final: "息子" },
      { id: "daughter", label: "娘", final: "娘" },
      { id: "child_general", label: "子", final: "子" },
    ],
  },
  13: {
    title: "どの兄弟姉妹ですか？",
    options: [
      { id: "brother", label: "兄弟", final: "兄弟" },
      { id: "sister", label: "姉妹", final: "姉妹" },
      { id: "sibling_general", label: "兄弟姉妹", final: "兄弟姉妹" },
    ],
  },
  14: {
    title: "どちらの祖父母ですか？",
    options: [
      { id: "grandfather", label: "祖父", final: "祖父" },
      { id: "grandmother", label: "祖母", final: "祖母" },
      { id: "grandparents_both", label: "祖父母", final: "祖父母" },
    ],
  },
  15: {
    title: "お孫さんについて",
    options: [
      { id: "grandson", label: "孫息子", final: "孫息子" },
      { id: "granddaughter", label: "孫娘", final: "孫娘" },
      { id: "grandchild_general", label: "孫", final: "孫" },
    ],
  },
};

const DynamicRelationshipSelector: React.FC<
  DynamicRelationshipSelectorProps
> = ({
  value = "",
  onChange,
  disabled = false,
  compact = false,
  className = "",
  isOpen = false,
  onOpen,
  onClose,
  triggerElement,
}) => {
  const [step, setStep] = useState<number>(0);
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [finalSelection, setFinalSelection] = useState<string>(value);
  const [internalIsOpen, setInternalIsOpen] = useState<boolean>(false);

  // Use external isOpen if provided, otherwise use internal state
  const isModalOpen = isOpen !== undefined ? isOpen : internalIsOpen;

  // Reset when value changes externally
  useEffect(() => {
    if (value !== finalSelection) {
      setFinalSelection(value);
      if (value) {
        // If there's a value, we're in "selected" state
        setInternalIsOpen(false);
      } else {
        // Reset to initial state
        setStep(0);
        setSelectedPath([]);
        setInternalIsOpen(false);
      }
    }
  }, [value, finalSelection]);

  const currentStep = RELATIONSHIP_FLOW_DATA[step];

  const handleOptionClick = (option: FlowOption): void => {
    if (disabled) return;

    const newPath = [...selectedPath, option.label];
    setSelectedPath(newPath);

    if (option.final) {
      const finalValue = option.final;
      setFinalSelection(finalValue);
      setInternalIsOpen(false);
      onChange?.(finalValue);
      onClose?.(); // Close modal if using external control
    } else if (option.next !== undefined) {
      setStep(option.next);
    }
  };

  const goBack = (): void => {
    if (selectedPath.length > 0) {
      const newPath = selectedPath.slice(0, -1);
      setSelectedPath(newPath);

      // Determine previous step
      if (newPath.length === 0) {
        setStep(0);
      } else if (newPath.length === 1) {
        const firstChoice = newPath[0];
        if (firstChoice === "私の家族") setStep(1);
        else if (firstChoice === "配偶者の家族") setStep(2);
        else if (firstChoice === "家族の配偶者") setStep(3);
      }
    }
  };

  const reset = (): void => {
    setStep(0);
    setSelectedPath([]);
    setFinalSelection("");
    setInternalIsOpen(false);
    onChange?.("");
    onClose?.();
  };

  const openSelector = (): void => {
    if (!disabled) {
      setInternalIsOpen(true);
      onOpen?.();
    }
  };

  const closeSelector = (): void => {
    setInternalIsOpen(false);
    onClose?.();
  };

  // If disabled and no value, show disabled state
  if (disabled && !value) {
    return (
      <div
        className={`${styles.container} ${
          compact ? styles.compact : ""
        } ${className}`}
      >
        <div className={styles.selectorContainer}>
          <button className={styles.optionButton} disabled={true}>
            <span className={styles.optionText}>続柄を選択してください</span>
            <ChevronRight className={styles.optionIcon} />
          </button>
        </div>
      </div>
    );
  }

  // If we have a final selection and selector is closed, show the selected value
  if (finalSelection && !isModalOpen) {
    return (
      <div
        className={`${styles.container} ${
          compact ? styles.compact : ""
        } ${className}`}
      >
        <div className={styles.selectorContainer}>
          <div className={styles.successContainer}>
            <div className={styles.successCard}>
              <p className={styles.successText}>{finalSelection}</p>
            </div>
            <div className={styles.buttonGroup}>
              <button
                onClick={openSelector}
                className={`${styles.button} ${styles.buttonSecondary}`}
                disabled={disabled}
              >
                変更
              </button>
              <button
                onClick={reset}
                className={`${styles.button} ${styles.buttonPrimary}`}
                disabled={disabled}
              >
                クリア
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main selector interface
  return (
    <div
      className={`${styles.container} ${
        compact ? styles.compact : ""
      } ${className}`}
    >
      <div className={styles.selectorContainer}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTop}>
            {selectedPath.length > 0 && (
              <button
                onClick={goBack}
                className={styles.backButton}
                disabled={disabled}
              >
                <ArrowLeft className="w-4 h-4" />
                戻る
              </button>
            )}
            <div className={styles.stepIndicator}>
              ステップ {selectedPath.length + 1}
            </div>
            {/* Close button for modal mode */}
            {isModalOpen && (
              <button
                onClick={closeSelector}
                className={styles.closeButton}
                disabled={disabled}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {selectedPath.length > 0 && (
            <div className={styles.pathDisplay}>{selectedPath.join(" → ")}</div>
          )}

          <h2 className={styles.title}>{currentStep.title}</h2>
        </div>

        {/* Options */}
        <div className={styles.optionsContainer}>
          {currentStep.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className={styles.optionButton}
              disabled={disabled}
            >
              <span className={styles.optionText}>{option.label}</span>
              <ChevronRight className={styles.optionIcon} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicRelationshipSelector;
