import React from 'react';

// Step 1
//  Import BrowserRouter, Route and Link components to App component.
import {BrowserRouter, Route} from "react-router-dom";
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header'

const App = () => {
    // Step 2
    //  Implement BrowseRouter component and define routes by using Route
    //  component.
    return (
        <div className="ui container">
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/" exact component={StreamList} />
                    <Route path="/streams/new" exact component={StreamCreate} />
                    <Route path="/streams/edit" exact component={StreamEdit} />
                    <Route path="/streams/delete" exact component={StreamDelete} />
                    <Route path="/streams/show" exact component={StreamShow} />
                </div>
            </BrowserRouter>
        </div>
    )
};

export default App;