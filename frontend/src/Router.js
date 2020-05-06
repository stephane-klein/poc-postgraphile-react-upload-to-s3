import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import ContactsNewPage from './pages/contacts/NewPage';
import ContactsViewPage from './pages/contacts/ViewPage';
import ContactsEditPage from './pages/contacts/EditPage';
import ContactsListPage from './pages/contacts/ListPage';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route
                exact
                strict
                path='/'
                component={HomePage}
            />

            {/* Contacts section */}

            <Route
                exact
                strict
                path='/contacts/new'
                component={ContactsNewPage}
            />
            <Route
                exact
                strict
                path='/contacts/:contactId/'
                component={ContactsViewPage}
            />
            <Route
                exact
                strict
                path='/contacts/:contactId/edit'
                component={ContactsEditPage}
            />
            <Route
                exact
                strict
                path='/contacts/'
                component={ContactsListPage}
            />
        </Switch>
    </BrowserRouter>
);

export default Router;
