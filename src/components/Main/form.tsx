import * as React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { store } from "libs/mobx";
import { observer } from "mobx-react";

@observer
class AddEvent extends React.Component {
    public render() {
        return (
            <Dialog
                open={store.openForm}
                onClose={() => {
                    store.setSelectedSlot(null);
                    store.setOpenForm(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Add event"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please fill the form below
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="raised"
                        onClick={() => {
                            store.setSelectedSlot(null);
                            store.setOpenForm(false);
                        }}
                        color="primary"
                    >
                        Save
                    </Button>
                    <Button
                        onClick={() => {
                            store.setSelectedSlot(null);
                            store.setOpenForm(false);
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

export { AddEvent };
export default AddEvent;
