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
}

interface IEvent {
    id: number;
    title: string;
    allDay?: boolean;
    start: Date;
    end: Date;
    desc?: string;
}

export const store: State = observable({
    events: [
        {
            id: 0,
            title: "All Day Event very long title",
            allDay: true,
            start: moment().toDate(),
            end: moment().toDate(),
            desc: "Description",
        },
    ],
    height: window.innerHeight,
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
                                className={style({
                                    minHeight: store.height - 56,
                                    [`${theme.breakpoints.up(
                                        "xs",
                                    )} and (orientation: landscape)`]: {
                                        minHeight: store.height - 48,
                                    },
                                    [theme.breakpoints.up("sm")]: {
                                        minHeight: store.height - 64,
                                    },
                                })}
                                events={[
                                    {
                                        id: 0,
                                        title: "All Day Event very long title",
                                        allDay: true,
                                        start: moment().toDate(),
                                        end: moment().toDate(),
                                        desc: "Description",
                                    },
                                ]}
                                startAccessor="startDate"
                                endAccessor="endDate"
                                defaultView="month"
                                defaultDate={moment().toDate()}
                            />
                        </CardContent>
                    </Card>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Main;
