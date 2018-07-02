
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
                  this.props.ensIds.map( (ensId, i) => {
                    console.log('ensId: ', ensId);
                    return <li key={ensId}>{ensId}</li>;
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
      Gene(first:10) {
        ensembl_gene_id
      }
    }
  `,
}

export default EnsIds;

