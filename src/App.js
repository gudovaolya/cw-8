import React, { Component, Fragment } from 'react';
import {Switch, Route} from 'react-router-dom';

import Header from "./components/Header/Header";
import QuotesList from "./containers/QuotesList/QuotesList";

class App extends Component {
  render() {
    return (
        <Fragment>
            <Header />
            <Switch>
                <Route path="/" exact component={QuotesList}/>
                <Route render={() => <h1>404 page not found</h1>}/>
            </Switch>
        </Fragment>
    );
  }
}

export default App;
