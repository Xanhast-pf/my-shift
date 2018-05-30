import * as React from "react";
import { Bar } from "components/Bar";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { observable } from "mobx";
import { observer } from "mobx-react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { style } from "typestyle";
import { AddEvent } from "./form";
import { DisplayEvent } from "./event";
import uuid from "uuid";

BigCalendar.momentLocalizer(moment);

const theme = createMuiTheme({
    palette: {
        primary: indigo,
    },
});

window.addEventListener("resize", function() {
    store.height = this.window.innerHeight;
});

interface State {
    events: Array<IEvent>;
    height: number;
    openForm: boolean;
    setOpenForm: (bool: boolean) => void;
    selectedSlot: Slot | null;
    setSelectedSlot: (slot: Slot | null) => void;
    addEvent: (event: IEvent) => void;
    removeEvent: (id: string) => void;
    selectedEvent: IEvent | null;
    selectEvent: (event: IEvent | null) => void;
}

interface Slot {
    start: string | Date;
    end: string | Date;
    slots: Date[] | string[];
    action: "select" | "click" | "doubleClick";
}

interface IEvent {
    id: string;
    title: string;
    allDay?: boolean;
    start: Date;
    end: Date;
    desc?: string;
}

export const store: State = observable({
    events: [
        {
            id: uuid.v4(),
            title: "Vacances",
            start: moment("2018-05-31")
                .startOf("day")
                .toDate(),
            end: moment("2018-05-31")
                .endOf("day")
                .toDate(),
            desc: "C'est la journée de super vacances!!!",
            allDay: true,
        },
    ],
    height: window.innerHeight,
    openForm: false,
    setOpenForm: (bool: boolean) => (store.openForm = bool),
    selectedSlot: null,
    setSelectedSlot: (slot: Slot | null) => (store.selectedSlot = slot),
    addEvent: (event: IEvent) => store.events.push(event),
    removeEvent: (id: string) =>
        (store.events = store.events.filter(e => e.id === id)),
    selectedEvent: null,
    selectEvent: (event: IEvent | null) => (store.selectedEvent = event),
} as State);

@observer
class Main extends React.Component {
    public render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div style={{ height: store.height, backgroundColor: "pink" }}>
                    <Bar />
                    <Card>
                        <CardContent>
                            <BigCalendar
                                className={calendarStyle}
                                events={[...store.events]}
                                defaultDate={moment().toDate()}
                                selectable
                                onSelectEvent={(event: IEvent) =>
                                    store.selectEvent(event)
                                }
                                onSelectSlot={slotInfo => {
                                    store.setSelectedSlot(slotInfo);
                                    store.setOpenForm(true);
                                }}
                            />
                        </CardContent>
                    </Card>
                    <AddEvent />
                    <DisplayEvent />
                </div>
            </MuiThemeProvider>
        );
    }
}

const calendarStyle = style({
    cursor: "pointer",
    minHeight: store.height - 96,
    [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
        minHeight: store.height - 88,
    },
    [theme.breakpoints.up("sm")]: {
        minHeight: store.height - 104,
    },
});

export default Main;
