import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, array, object } from '@storybook/addon-knobs/react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import DiseaseInfo from '../src/components/DiseaseInfo';
import DrugInfo from '../src/components/DrugInfo';
import DiseaseSearchBox from '../src/components/DiseaseSearchBox';
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
const disease = {
  disease_label: 'some disease',
  disease_id: 1,
};
const drug = {
  chembl_id: "CHEMBL0000001",
  molecule_type: "Small molecule",
  related_genes: 10,
};

storiesOf('Non-graphql components', module)
  .addDecorator(withKnobs)
  .add('Disease info',
    () => (
      <DiseaseInfo disease={object('disease', disease)} />
    )
  )
  .add('Drug info',
    () => (
      <DrugInfo drug={object('drug', drug)} />
    )
  );

storiesOf('Graphql-enabled components', module)
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
  .add('Disease search',
    () => (
      <DiseaseSearchBox
        onSelect={ (selectedItem) => {
          console.log('item selected in search box: ', selectedItem);
        } }
      />
    )
  )
  .add('ID list',
    () => (
      <EnsIds />
    )
  );
