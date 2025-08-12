/* import React, { createContext, useContext, useState, ReactNode } from "react";

interface StepOverviewState {
  isInsuredPersonSameAsApplicant: boolean;
  isBeneficiarySameAsApplicant: boolean;
}

interface StepOverviewContextType {
  state: StepOverviewState;
  setInsuredPersonSameAsApplicant: (value: boolean) => void;
  setBeneficiarySameAsApplicant: (value: boolean) => void;
}

const StepOverviewContext = createContext<StepOverviewContextType | undefined>(
  undefined
);

export const useStepOverviewContext = () => {
  const context = useContext(StepOverviewContext);
  if (!context) {
    throw new Error(
      "useStepOverviewContext must be used within StepOverviewProvider"
    );
  }
  return context;
};

interface StepOverviewProviderProps {
  children: ReactNode;
}

export const StepOverviewProvider: React.FC<StepOverviewProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<StepOverviewState>({
    isInsuredPersonSameAsApplicant: true,
    isBeneficiarySameAsApplicant: false,
  });

  const setInsuredPersonSameAsApplicant = (value: boolean) => {
    setState((prev) => {
      return {
        ...prev,
        isInsuredPersonSameAsApplicant: value,
      };
    });
  };

  const setBeneficiarySameAsApplicant = (value: boolean) => {
    setState((prev) => {
      return {
        ...prev,
        isBeneficiarySameAsApplicant: value,
      };
    });
  };

  return (
    <StepOverviewContext.Provider
      value={{
        state,
        setInsuredPersonSameAsApplicant,
        setBeneficiarySameAsApplicant,
      }}
    >
      {children}
    </StepOverviewContext.Provider>
  );
};
 */
