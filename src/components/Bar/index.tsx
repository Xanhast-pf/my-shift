import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

interface ViewProps extends WithStyles {}

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

export const Bar = withStyles(styles)((props: ViewProps) => {
    const { classes } = props;

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="Menu"
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="title"
                    color="inherit"
                    className={classes.flex}
                >
                    My shift
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
});
