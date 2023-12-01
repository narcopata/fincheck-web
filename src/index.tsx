import { render } from "preact";
import { LocationProvider, Route, Router } from "preact-iso";
import "./style.css"

import { Home } from "./pages/Home/index.jsx";

export function App() {
  return (
    <LocationProvider>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/:id" component={() => null} />
      </Router>
    </LocationProvider>
  );
}

render(<App />, document.getElementById("app"));
