import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";

// Address lookup response type
export interface AddressLookupResponse {
  postalCode: string;
  prefecture: string;
  city: string;
  address?: string;
  building?: string;
}

// Address lookup error type
export interface AddressLookupError {
  message: string;
  code?: string;
}

// Hook options interface
export interface UseAddressLookupOptions {
  // Form field names to populate
  addressFields: {
    prefecture: string;
    city: string;
    address?: string;
    building?: string;
  };
  // Callbacks
  onSuccess?: (address: AddressLookupResponse) => void;
  onError?: (error: AddressLookupError) => void;
  // Validation
  validatePostalCode?: (postalCode: string) => boolean;
  // API configuration
  apiEndpoint?: string;
  apiKey?: string;
}

// Default postal code validation (7 digits)
const defaultPostalCodeValidation = (postalCode: string): boolean => {
  return /^\d{7}$/.test(postalCode);
};

// Mock API response for testing
const mockAddressData: AddressLookupResponse = {
  postalCode: "1000001",
  prefecture: "東京都",
  city: "千代田区",
  address: "永田町1-7-1",
  building: "永田町ビル",
};

// Default API function (you'll need to replace this with your actual API)
const defaultAddressLookupApi = async (
  postalCode: string, // eslint-disable-line @typescript-eslint/no-unused-vars
  apiEndpoint?: string, // eslint-disable-line @typescript-eslint/no-unused-vars
  apiKey?: string // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<AddressLookupResponse> => {
  // This is a placeholder - replace with your actual API call
  /* const response = await fetch(`${apiEndpoint || "/api/address-lookup"}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey && { Authorization: `Bearer ${apiKey}` }),
    },
    body: JSON.stringify({ postalCode }),
  });

  if (!response.ok) {
    throw new Error(`Address lookup failed: ${response.statusText}`);
  }

  return response.json(); */

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Simulate random success/failure for testing
  if (Math.random() > 0.2) {
    // Success case - return the mock data
    return mockAddressData;
  } else {
    // Error case - throw an error
    throw new Error(
      /* "Address lookup failed: Invalid postal code or server error" */
      "Address lookup failed: server error"
    );
  }
};

export const useAddressLookup = (options: UseAddressLookupOptions) => {
  const {
    addressFields,
    onSuccess,
    onError,
    validatePostalCode = defaultPostalCodeValidation,
    apiEndpoint,
    apiKey,
  } = options;

  const form = useFormContext();

  // Address lookup mutation
  const mutation = useMutation({
    mutationFn: async (postalCode: string) => {
      // Validate postal code
      if (!validatePostalCode(postalCode)) {
        throw new Error("Invalid postal code format");
      }

      // Call the API
      return await defaultAddressLookupApi(postalCode, apiEndpoint, apiKey);
    },
    onSuccess: (data: AddressLookupResponse) => {
      // Populate form fields with the returned address data
      form.setValue(addressFields.prefecture, data.prefecture);
      form.setValue(addressFields.city, data.city);

      if (addressFields.address && data.address) {
        form.setValue(addressFields.address, data.address);
      }

      if (addressFields.building && data.building) {
        form.setValue(addressFields.building, data.building);
      }

      // Trigger form validation
      form.trigger([
        addressFields.prefecture,
        addressFields.city,
        ...(addressFields.address ? [addressFields.address] : []),
        ...(addressFields.building ? [addressFields.building] : []),
      ]);

      // Call success callback
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      const lookupError: AddressLookupError = {
        message: error.message,
        code: "ADDRESS_LOOKUP_FAILED",
      };

      onError?.(lookupError);
    },
  });

  // Function to trigger address lookup
  const lookupAddress = async (postalCode: string) => {
    try {
      await mutation.mutateAsync(postalCode);
    } catch (error) {
      // Error is handled by onError callback
      console.error("Address lookup failed:", error);
    }
  };

  // Function to clear address fields
  const clearAddress = () => {
    form.setValue(addressFields.prefecture, "");
    form.setValue(addressFields.city, "");

    if (addressFields.address) {
      form.setValue(addressFields.address, "");
    }

    if (addressFields.building) {
      form.setValue(addressFields.building, "");
    }
  };

  return {
    // Mutation state
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,

    // Actions
    lookupAddress,
    clearAddress,

    // Form integration helpers
    form,
  };
};
