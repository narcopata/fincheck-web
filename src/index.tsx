import { render } from "preact";
import { AppRouter } from "./Router";
import "./style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />;
    </QueryClientProvider>
  );
}

render(<App />, document.getElementById("app"));
