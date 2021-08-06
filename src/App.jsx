import "./App.css";
import Search from "./pages/Search";

// Redux
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Search />
      </div>
    </Provider>
  );
}

export default App;
