
import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from "react-apollo";

class EnsIds extends React.Component {

  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <Query query={queries.ensIds}>
        {
          ( {loading, error, data} ) => {
            if ( loading ) return 'Loading...';
            if ( error ) return `Error: ${error.message}`;

            return (
              <ul>
                {
                  data.Genes.map( (ensId, i) => {
                    console.log('ensId: ', ensId);
                    return <li key={ensId.ensembl_gene_id}>{ensId.ensembl_gene_id}</li>;
                  })
                }
              </ul>
            );
          }
        }
      </Query>
    );
  }
}

EnsIds.props = {
  ensIds: PropTypes.object.isRequired,
};

const queries = {
  ensIds: gql`
    query GetEnsIds {
      Genes(first: 5) {
        ensembl_gene_id
      }
    }
  `,
}

export default EnsIds;

