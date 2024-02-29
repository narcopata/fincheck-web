import { AuthContextProvider } from "@contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { render } from "preact";
import { Toaster } from "react-hot-toast";

import { AppRouter } from "./Router";

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
        <Toaster />
        <AppRouter />;
      </AuthContextProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

render(<App />, document.getElementById("app"));
