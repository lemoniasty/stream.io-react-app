import React from 'react';
import {Router, Route, Switch} from "react-router-dom";
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header'
import history from '../history';

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header/>
                    {/*
                        Thanks to Switch component React-Router will show only
                        one of a given route. This prevents a routing names
                        collision in case of /streams/new and /streams/:id -
                        Without Switch component in view /streams/new we will
                        also see /streams/:id view either.
                    */}
                    <Switch>
                        <Route path="/" exact component={StreamList}/>
                        <Route path="/streams/new" exact component={StreamCreate}/>
                        <Route path="/streams/edit/:id" exact component={StreamEdit}/>
                        <Route path="/streams/delete/:id" exact component={StreamDelete}/>
                        <Route path="/streams/:id" exact component={StreamShow}/>
                    </Switch>
                </div>
            </Router>
        </div>
    )
};

export default App;