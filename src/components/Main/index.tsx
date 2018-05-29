import * as React from "react";
import { Bar } from "components/Bar";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import cyan from "@material-ui/core/colors/cyan";
import Typography from "@material-ui/core/Typography";

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
                    <Typography>Je t'aime mon coeur à moi :)</Typography>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Main;
