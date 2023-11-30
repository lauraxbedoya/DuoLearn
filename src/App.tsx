import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./themes/theme";
import AppRouter from "./AppRouter";
import "../styles/globals.scss";
import { PrimeReactProvider } from "primereact/api";
import { store } from "@src/redux/store";
import { Provider as ReduxProvider } from "react-redux";

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PrimeReactProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <AppRouter />
          </Router>
        </ThemeProvider>
      </PrimeReactProvider>
    </ReduxProvider>
  );
};

export default App;
