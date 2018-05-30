import * as React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { store } from "./index";
import { observer } from "mobx-react";
import moment from "moment";

@observer
class DisplayEvent extends React.Component {
    public render() {
        if (!store.selectedEvent) return null;

        return (
            <Dialog
                open={store.selectedEvent !== null}
                onClose={() => {
                    store.selectEvent(null);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {store.selectedEvent!.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Description: {store.selectedEvent!.desc || "none"}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-start">
                        From: {moment(store.selectedEvent!.start).format("LLL")}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-end">
                        to: {moment(store.selectedEvent!.end).format("LLL")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="raised"
                        onClick={() => {
                            store.selectEvent(null);
                        }}
                        color="primary"
                    >
                        Save
                    </Button>
                    <Button
                        onClick={() => {
                            store.selectEvent(null);
                        }}
                        color="primary"
                        autoFocus
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export { DisplayEvent };
export default DisplayEvent;
