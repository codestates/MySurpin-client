import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import SignPage from "./pages/SignPage";
import EditUserInfo from "./pages/EditUserInfo";
import SurpinModal from "./pages/SurpinModal";
import SurpinLists from "./pages/SurpinLists";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/searchpage" component={SearchPage} />
        <Route path="/signpage" component={SignPage} />
        <Route path="/edituserinfo" component={EditUserInfo} />
        <Route path="/surpinmodal/:listId" component={SurpinModal} />
        <Route path="/surpinlists/:writer" component={SurpinLists} />
      </Switch>
    </Router>
  );
}
export default App;
