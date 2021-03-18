import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import SignPage from "./pages/SignPage";
import EditUserInfo from "./pages/EditUserInfo";
import SurpinModal from "./pages/SurpinModal";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/searchpage">
          <SearchPage />
        </Route>
        <Route path="/signpage">
          <SignPage />
        </Route>
        <Route path="/edituserinfo">
          <EditUserInfo />
        </Route>
        <Route path="/surpinmodal">
          <SurpinModal />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
