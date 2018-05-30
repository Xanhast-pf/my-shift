import { observable, autorun } from "mobx";
import { IEvent, Slot } from "components/Main";
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
}

export const loadState = () => {
    console.log("Loading State");
    try {
        const serializedState = localStorage.getItem("events");
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return [];
    }
};

export const store: State = observable({
    events: loadState(),
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

window.addEventListener("resize", function() {
    store.height = this.window.innerHeight;
});

export const saveState = (event: IEvent[]) => {
    try {
        const serializedState = JSON.stringify(event);
        localStorage.setItem("events", serializedState);
    } catch (err) {
        // Ignore write errors.
        console.error("failed to save events");
    }
};

autorun(
    throttle(() => {
        saveState(store.events);
    }, 1000),
);
