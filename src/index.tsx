import { render } from "preact";
import { AppRouter } from "./Router";
import "./style.css";

export function App() {
  return <AppRouter />;
}

render(<App />, document.getElementById("app"));
