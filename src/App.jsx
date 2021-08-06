import { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";

import Search from "./pages/Search";
import Detail from "./pages/Detail";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Search} />
          <Switch>
            <Route exact path="/detail/:id" component={Detail} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
