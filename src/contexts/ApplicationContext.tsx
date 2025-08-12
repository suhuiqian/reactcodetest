import React, { createContext, use, useMemo, useReducer } from "react";
import type { ReactNode } from "react";
import type { InsuredBeneficiaryPairData } from "@/types";
import { mockCurrentUser } from "@/constants/currentUser";
interface ApplicationState {
  applications: InsuredBeneficiaryPairData[];
  selectedApplications: string[];
  isLoading: boolean;
  error: string | null;
  applicantData: InsuredBeneficiaryPairData | null;
  operationTimestamp: number | null;
}

type ApplicationAction =
  | { type: "SET_APPLICATIONS"; payload: InsuredBeneficiaryPairData[] }
  | { type: "ADD_APPLICATION"; payload: InsuredBeneficiaryPairData }
  | { type: "UPDATE_APPLICATION"; payload: InsuredBeneficiaryPairData }
  | { type: "DELETE_APPLICATION"; payload: string }
  | { type: "SET_SELECTED"; payload: string[] }
  | { type: "TOGGLE_SELECTED"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "RESTORE_APPLICATIONS"; payload: InsuredBeneficiaryPairData[] };

const initialState: ApplicationState = {
  applications: [],
  selectedApplications: [],
  isLoading: false,
  error: null,
  applicantData: mockCurrentUser,
  operationTimestamp: null,
};

const applicationReducer = (
  state: ApplicationState,
  action: ApplicationAction
): ApplicationState => {
  switch (action.type) {
    case "SET_APPLICATIONS":
      return { ...state, applications: action.payload };

    case "ADD_APPLICATION":
      return {
        ...state,
        applications: [...state.applications, action.payload],
        operationTimestamp: new Date().getTime(),
      };

    case "UPDATE_APPLICATION":
      return {
        ...state,
        applications: state.applications.map((app) =>
          app.id === action.payload.id ? action.payload : app
        ),
        operationTimestamp: new Date().getTime(),
      };

    case "DELETE_APPLICATION":
      return {
        ...state,
        applications: state.applications.filter(
          (app) => app.id !== action.payload
        ),
        selectedApplications: state.selectedApplications.filter(
          (id) => id !== action.payload
        ),
        operationTimestamp: new Date().getTime(),
      };

    case "RESTORE_APPLICATIONS":
      return {
        ...state,
        applications: action.payload,
        selectedApplications: [], // Clear selections when restoring
        error: null,
      };

    case "SET_SELECTED":
      return { ...state, selectedApplications: action.payload };

    case "TOGGLE_SELECTED":
      return {
        ...state,
        selectedApplications: state.selectedApplications.includes(
          action.payload
        )
          ? state.selectedApplications.filter((id) => id !== action.payload)
          : [...state.selectedApplications, action.payload],
      };

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

interface ApplicationContextType {
  state: ApplicationState;
  dispatch: React.Dispatch<ApplicationAction>;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined
);

export const ApplicationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(applicationReducer, initialState);
  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );
  return (
    <ApplicationContext value={contextValue}>{children}</ApplicationContext>
  );
};

// TODO: file structure
export const useApplication = () => {
  const context = use(ApplicationContext);
  if (context === undefined) {
    throw new Error(
      "useApplication must be used within an ApplicationProvider"
    );
  }
  return context;
};
