import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, array, object } from '@storybook/addon-knobs/react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import EnsIds from '../src/components/EnsIds';

storiesOf('MUI modules', module)//{{{
  .addDecorator( story => (
      <React.Fragment>
        <CssBaseline />
        {story()}
      </React.Fragment>
    )
  )
  .add('MUI button',
    () => (
      <Button variant='contained'>Default button</Button>
    )
  );//}}}

        // uri: 'http://35.196.230.196:7474/graphql',

storiesOf('Ensembl IDs', module)
  .addDecorator(withKnobs)
  .addDecorator(
    (story) => {
      const client = new ApolloClient({
        uri: 'http://104.196.199.2:4000/graphql',
      });
      return <ApolloProvider client={client}>
        <React.Fragment>
          <CssBaseline />
          {story()}
        </React.Fragment>
      </ApolloProvider>;
    }
  )
  .add('ID list',
    () => (
      <EnsIds />
    )
  );
