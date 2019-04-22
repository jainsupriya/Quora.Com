import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./redux/store";
import Main from "./components/Main";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/" component={Main} />
                        </Switch>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
