import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { render } from "preact";
import { AppRouter } from "./Router";
import { AuthContextProvider } from "./app/contexts/AuthContext";
import "./style.css";

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
      <AuthContextProvider value={null}>
        <AppRouter />;
      </AuthContextProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

render(<App />, document.getElementById("app"));
