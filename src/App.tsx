import * as React from "react";
import "./App.css";
import logo from "./logo.svg";
import { Bar } from "components/Bar/index";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import cyan from "@material-ui/core/colors/cyan";

const theme = createMuiTheme({
    palette: {
        primary: cyan,
    },
});

class App extends React.Component {
    public render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    <Bar />
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to My awesome app</h1>
                    </header>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
