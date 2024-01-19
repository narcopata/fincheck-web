import { useContext } from "preact/hooks";
import { DashboardContext } from ".";

export const useDashboard = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "Uso inválido do contexo de Dashboard. O hook useDashboard deve ser usado dentro de um DashboardProvider.",
    );
  }

  return context;
};
