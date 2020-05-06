import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import Router from './Router';
import ApolloClient from './Apollo';

function App() {
    return (
        <ApolloProvider client={ApolloClient}>
            <Router />
        </ApolloProvider>
    );
}

export default App;
