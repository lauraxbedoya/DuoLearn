import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from "styled-components"
import { theme } from "./themes/theme"
import AppRouter from "./AppRouter"
import "../styles/globals.scss"


const App = () => {
  return (
    // <ReduxProvider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <AppRouter />
      </Router>
    </ThemeProvider>
    // </ReduxProvider>
  )
}

export default App