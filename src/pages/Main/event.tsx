import * as React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IEvent } from "./index";
import { observer } from "mobx-react";
import { observable } from "mobx";
import moment from "moment";
import uuid from "uuid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import DateTimePicker from "material-ui-pickers/DateTimePicker";
import { store } from "libs/mobx";
import DeleteIcon from "@material-ui/icons/Delete";

interface FormState {
    id: string;
    formTitle: string;
    title: string;
    description: string;
    start: Date;
    end: Date;
    set: (event: IEvent | null) => void;
    openDelete: boolean;
    eventType: string;
}

export const formState: FormState = observable({
    formTitle: "New Event",
    id: "",
    title: "",
    description: "",
    start: new Date(),
    end: new Date(),
    set: (event: IEvent | null) => {
        if (event) {
            formState.formTitle = "Event";
            formState.id = event.id;
            formState.title = event.title;
            formState.description = event.desc || "";
            formState.start = event.start;
            formState.end = event.end;
            formState.eventType = event.eventType;
        } else {
            formState.formTitle = "New Event";
            formState.id = "";
            formState.title = "";
            formState.description = "";
            formState.start = new Date();
            formState.end = new Date();
            formState.eventType = "common";
        }
    },
    openDelete: false,
    eventType: "common",
});

@observer
class DisplayEvent extends React.Component {
    onSave() {
        if (formState.id === "") {
            store.events.push({
                id: uuid.v4(),
                title: formState.title,
                desc: formState.description,
                start: moment(formState.start).toDate(),
                end: moment(formState.end).toDate(),
                eventType: formState.eventType,
            });
        } else {
            const index = store.events.findIndex(e => e.id === formState.id);
            store.events[index].title = formState.title;
            store.events[index].desc = formState.description;
            store.events[index].start = moment(formState.start).toDate();
            store.events[index].end = moment(formState.end).toDate();
            store.events = [...store.events];
        }
        store.selectEvent(null);
        formState.set(null);
    }

    cancel() {
        store.selectEvent(null);
    }

    onDelete() {
        store.events = store.events.filter(
            s => s.id !== store.selectedEvent!.id,
        );
        store.selectEvent(null);
        formState.openDelete = false;
    }

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
                    {formState.formTitle}
                </DialogTitle>
                <DialogContent>
                    <div>
                        <TextField
                            id="title"
                            label="Title"
                            value={formState.title}
                            onChange={(event: any) =>
                                (formState.title = event.target.value)
                            }
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div>
                        <TextField
                            id="description"
                            label="Description"
                            value={formState.description}
                            onChange={(event: any) =>
                                (formState.description = event.target.value)
                            }
                            multiline
                            rows={4}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div>
                        <DateTimePicker
                            id="datetime-local-start"
                            label="From"
                            disablePast
                            value={moment(formState.start).toDate()}
                            onChange={(date: Date) => {
                                formState.start = date;
                            }}
                            margin="normal"
                        />
                    </div>
                    <div>
                        <DateTimePicker
                            id="datetime-local-end"
                            label="to"
                            disablePast
                            value={moment(formState.end).toDate()}
                            onChange={(date: Date) => {
                                formState.end = date;
                            }}
                            margin="normal"
                        />
                    </div>
                    <div>
                        <TextField
                            id="select-eventtype"
                            fullWidth
                            select
                            label="Event Type"
                            helperText="Please Choose"
                            value={formState.eventType}
                            onChange={(event: any) =>
                                (formState.eventType = event.target.value)
                            }
                            margin="normal"
                        >
                            {eventTypeMenu()}
                        </TextField>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="raised"
                        onClick={this.onSave}
                        color="primary"
                        disabled={!isValid()}
                    >
                        Save
                    </Button>
                    <Button onClick={this.cancel} color="primary" autoFocus>
                        Cancel
                    </Button>
                    {store.selectedEvent &&
                        store.selectedEvent.id && (
                            <Button
                                variant="raised"
                                color="default"
                                disabled={
                                    !store.selectedEvent ||
                                    !store.selectedEvent.id
                                }
                                aria-label="delete"
                                onClick={() => (formState.openDelete = true)}
                            >
                                <DeleteIcon />
                                Delete
                            </Button>
                        )}
                </DialogActions>
                <Dialog
                    open={formState.openDelete}
                    onClose={() => (formState.openDelete = false)}
                >
                    <DialogTitle>
                        Are you sure to delete this event: {formState.title} ?
                    </DialogTitle>
                    <DialogActions>
                        <Button
                            variant="raised"
                            color="secondary"
                            disabled={
                                !store.selectedEvent || !store.selectedEvent.id
                            }
                            aria-label="delete"
                            onClick={this.onDelete}
                        >
                            <DeleteIcon />
                            Delete
                        </Button>
                        <Button
                            onClick={() => (formState.openDelete = false)}
                            color="primary"
                            autoFocus
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Dialog>
        );
    }
}

const eventTypeMenu = () => {
    const menuItems: Array<JSX.Element> = [];
    for (var i in store.eventType) {
        menuItems.push(
            <MenuItem key={i} value={i}>
                <div
                    style={{
                        height: 16,
                        width: 32,
                        backgroundColor: store.eventType[i].color,
                        marginRight: 16,
                        borderRadius: 2,
                    }}
                />
                {store.eventType[i].name}
            </MenuItem>,
        );
    }
    return menuItems;
};

const isValid = (): boolean => {
    if (!formState.title) return false;
    if (!formState.start) return false;
    if (!formState.end) return false;
    if (moment(formState.start).isAfter(moment(formState.end))) return false;

    return true;
};

export { DisplayEvent };
export default DisplayEvent;
