import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { RouterPage } from "./components/layouts/routes/routes";
import store from "./store/configstore";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <RouterPage />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
