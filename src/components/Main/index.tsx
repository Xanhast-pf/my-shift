import * as React from "react";
import { Bar } from "components/Bar";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { observer } from "mobx-react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { style } from "typestyle";
import { AddEvent } from "./form";
import { DisplayEvent } from "./event";
import { store } from "libs/mobx";
import { formState } from "./event";
/* eslint-disable */
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
// pick utils
import MomentUtils from "material-ui-pickers/utils/moment-utils";

BigCalendar.momentLocalizer(moment);

const theme = createMuiTheme({
    palette: {
        primary: indigo,
    },
});

export interface Slot {
    start: string | Date;
    end: string | Date;
    slots: Date[] | string[];
    action: "select" | "click" | "doubleClick";
}

export interface IEvent {
    id: string;
    title: string;
    allDay?: boolean;
    start: Date;
    end: Date;
    desc?: string;
}

@observer
class Main extends React.Component {
    public render() {
        return (
            <MuiThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <div
                        style={{
                            height: store.height,
                            backgroundColor: "pink",
                        }}
                    >
                        <Bar />
                        <Card>
                            <CardContent>
                                <BigCalendar
                                    className={calendarStyle}
                                    events={[...store.events]}
                                    defaultDate={moment().toDate()}
                                    selectable
                                    onSelectEvent={(event: IEvent) => {
                                        store.selectEvent(event);
                                        formState.set(event);
                                    }}
                                    onSelectSlot={(slotInfo: Slot) => {
                                        const init = {
                                            id: "",
                                            title: "",
                                            desc: "",
                                            start: moment(slotInfo.start)
                                                .set("hour", 9)
                                                .toDate(),
                                            end: moment(slotInfo.end)
                                                .set("hour", 21)
                                                .toDate(),
                                        };
                                        store.selectEvent(init);
                                        formState.set(init);
                                        store.setSelectedSlot(slotInfo);
                                    }}
                                    eventPropGetter={eventStyleGetter}
                                />
                            </CardContent>
                        </Card>
                        <AddEvent />
                        <DisplayEvent />
                    </div>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        );
    }
}

const eventStyleGetter = (
    event: IEvent,
    start: Date,
    end: Date,
    isSelected: boolean,
) => {
    console.log(event);
    var backgroundColor = indigo[500];
    var style = {
        backgroundColor,
        borderRadius: "0px",
        opacity: 0.8,
        color: "black",
        border: "0px",
        display: "block",
    };
    return {
        style: style,
    };
};

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
