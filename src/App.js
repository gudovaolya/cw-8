import React, { Component, Fragment } from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';

import Header from "./components/Header/Header";
import QuotesList from "./containers/QuotesList/QuotesList";
import AddQuote from "./containers/Forms/AddQuote/AddQuote";
import EditQuote from "./containers/Forms/EditQuote/EditQuote";
import QuotesCategoryList from "./containers/QuotesCategoryList/QuotesCategoryList";

class App extends Component {
  render() {
    return (
        <Fragment>
            <Header />
            <Switch>
                <Route path="/" exact component={QuotesList}/>
                <Route path="/add_quote" exact component={AddQuote}/>
                <Route path="/edit_quote" exact component={EditQuote} />
                <Route path="/category/:category" exact component={QuotesCategoryList} />
                <Route render={() => <h1>404 page not found</h1>}/>
            </Switch>
        </Fragment>
    );
  }
}

export default App;
