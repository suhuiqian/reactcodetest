import React from "react";
import { useWatch } from "react-hook-form";
import {
  useAddressLookup,
  type AddressLookupResponse,
  type AddressLookupError,
} from "@/hooks/useAddressLookup";
import { showToast } from "./SimpleToast";
import styles from "./AddressLookupButton.module.css";

interface AddressLookupButtonProps {
  // Form field names
  postalCodeField: string;
  addressFields: {
    prefecture: string;
    city: string;
    address?: string;
    building?: string;
  };
  // Button customization
  buttonText?: string;
  loadingText?: string;
  errorText?: string;
  // Callbacks
  onSuccess?: (address: AddressLookupResponse) => void;
  onError?: (error: AddressLookupError) => void;
  // Validation
  validatePostalCode?: (postalCode: string) => boolean;
  // API configuration
  apiEndpoint?: string;
  apiKey?: string;
  // Disable button when postal code is empty
  disableWhenEmpty?: boolean;
  disabled?: boolean;
}

const AddressLookupButton: React.FC<AddressLookupButtonProps> = ({
  postalCodeField,
  addressFields,
  buttonText = "住所検索",
  loadingText = "検索中...",
  errorText = "エラー",
  onSuccess,
  onError,
  validatePostalCode,
  apiEndpoint,
  apiKey,
  disableWhenEmpty = true,
  disabled = false,
}) => {
  // Watch the postal code field
  const postalCode = useWatch({ name: postalCodeField });

  // Use the address lookup hook
  const { isLoading, isError, lookupAddress } = useAddressLookup({
    addressFields,
    onSuccess: (address) => {
      showToast("住所が見つかりました", "success");
      onSuccess?.(address);
    },
    onError: (error) => {
      showToast(error.message, "error");
      onError?.(error);
    },
    validatePostalCode,
    apiEndpoint,
    apiKey,
  });

  // Handle button click
  const handleClick = async () => {
    if (!postalCode || postalCode.trim() === "") {
      onError?.({
        message: "郵便番号を入力してください",
        code: "EMPTY_POSTAL_CODE",
      });
      return;
    }

    await lookupAddress(postalCode.trim());
  };

  // Determine button state and text
  const getButtonState = () => {
    if (isLoading) return "loading";
    if (isError) return "error";
    return "default";
  };

  const getButtonText = () => {
    if (isLoading) return loadingText;
    if (isError) return errorText;
    return buttonText;
  };

  // Determine if button should be disabled
  const isDisabled =
    isLoading ||
    (disableWhenEmpty && (!postalCode || postalCode.trim() === ""));

  // Build CSS classes
  const buttonClasses = [
    styles.addressLookupButton,
    getButtonState() === "loading" ? styles.loading : "",
    getButtonState() === "error" ? styles.error : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || isDisabled}
      aria-label={getButtonText()}
    >
      {isLoading && <div className={styles.spinner} />}
      <span className={styles.buttonText}>{getButtonText()}</span>
    </button>
  );
};

export default AddressLookupButton;
