import { useBankAccount } from "@hooks/useBankAccount";
import { useReducer } from "preact/hooks";

type State = {
  bankAccountId: string | null;
  year: number | null;
};

type Action = {
  set:
    | Pick<State, "bankAccountId">
    | {
        year: {
          type: "increment" | "decrement";
        };
      };
};

export const useFiltersModal = () => {
  const [filtersData, dispatchFilters] = useReducer<State, Action>(
    (prevState, action) => {
      const newState = structuredClone(prevState);

      if (("bankAccountId" satisfies keyof State) in action.set) {
        newState.bankAccountId =
          action.set.bankAccountId === newState.bankAccountId
            ? null
            : action.set.bankAccountId;
      } else {
        if (!newState.year) {
          return newState;
        }

        newState.year =
          action.set.year.type === "increment"
            ? newState.year + 1
            : newState.year - 1;
      }

      return newState;
    },
    {
      bankAccountId: null,
      year: new Date().getFullYear(),
    } satisfies State,
  );

  const [selectedBankAccountId, dispatchSelectedBankAccountId] = useReducer(
    (prevState: null | string, newId: string) => {
      return prevState === newId ? null : newId;
    },
    null,
  );

  const { accounts } = useBankAccount();

  return {
    selectedBankAccountId,
    dispatchSelectedBankAccountId,
    filtersData,
    dispatchFilters,
    accounts,
  };
};
