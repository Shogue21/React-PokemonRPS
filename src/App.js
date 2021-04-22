import Header from "./components/Header";
import Container from "./components/Container";
import StarterPage from "./components/StarterPage";
import Description from "./components/Description";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              <StarterPage />
            </>
          )}
        />
        <Route path="/description" component={Description} />
        <Route path="/play" component={Container} />
      </div>
    </Router>
  );
}

export default App;
