import * as React from "react";
import Main from "pages/Main";
import { observable } from "mobx";
import { observer } from "mobx-react";

interface Router {
    path: string;
    set: (path: string) => void;
}

export const router: Router = observable({
    path: "/",
    set: (path: string) => (router.path = path),
});

@observer
class Route extends React.Component {
    render() {
        switch (router.path) {
            case "/":
                return <Main />;

            default:
                return <Main />;
        }
    }
}

export default Route;
export { Route };
