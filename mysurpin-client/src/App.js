import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import SignPage from "./pages/SignPage";
import EditUserInfo from "./pages/EditUserInfo";
import SurpinModal from "./pages/SurpinModal";
import SurpinLists from "./pages/SurpinLists";

function App() {
  return (
    <Router>
      <Route
        render={({ location }) => {
          return (
            <TransitionGroup>
              <CSSTransition
                timeout={{ enter: 300, exit: 300 }}
                classNames="fade"
                key={location.key}
              >
                <Switch location={location}>
                  <Route exact path="/" component={MainPage} />
                  <Route path="/searchpage" component={SearchPage} />
                  <Route path="/signpage" component={SignPage} />
                  <Route path="/edituserinfo" component={EditUserInfo} />
                  <Route path="/surpinmodal/:listId" component={SurpinModal} />
                  <Route path="/surpinlists/:writer" component={SurpinLists} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          );
        }}
      ></Route>
    </Router>
  );
}
export default App;
