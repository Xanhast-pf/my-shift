import { observable, autorun } from "mobx";
import { IEvent, Slot } from "pages/Main";
import throttle from "lodash/throttle";

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
    eventType: { [key: string]: EventType };
}
export interface EventType {
    name: string;
    color: string;
}

const eventTypeDefault = {
    common: {
        name: "Common",
        color: "#3f51b5",
    },
    important: {
        name: "Important",
        color: "#F44336",
    },
};

export const loadState = () => {
    console.log("Loading State");
    try {
        const serializedState = localStorage.getItem("events");
        if (serializedState === null) {
            return { events: [], eventType: eventTypeDefault };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return { events: [], eventType: eventTypeDefault };
    }
};

export const store: State = observable({
    events: loadState().events,
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
    eventType: loadState().eventType,
} as State);

window.addEventListener("resize", function() {
    store.height = this.window.innerHeight;
});

export const saveState = (
    events: IEvent[],
    eventType: { [key: string]: EventType },
) => {
    try {
        const serializedState = JSON.stringify({ events, eventType });
        localStorage.setItem("events", serializedState);
    } catch (err) {
        // Ignore write errors.
        console.error("failed to save events");
    }
};

autorun(
    throttle(() => {
        saveState(store.events, store.eventType);
    }, 1000),
);
