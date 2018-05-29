import * as React from "react";
import { Bar } from "components/Bar";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import cyan from "@material-ui/core/colors/cyan";

const theme = createMuiTheme({
    palette: {
        primary: cyan,
    },
});

class Main extends React.Component {
    public render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Bar />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Main;
