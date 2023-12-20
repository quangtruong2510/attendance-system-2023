import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { RouterPage } from "./components/layouts/routes/routes";
import store from "./store/configstore";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    // primary: {
    //   main: "rgb(17, 121, 87)",
    // },
    secondary: {
      main: "rgb(0, 130, 146)",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <RouterPage />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  )
}

export default App;
