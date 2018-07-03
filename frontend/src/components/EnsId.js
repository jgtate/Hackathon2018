
import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from "react-apollo";
import { withRouter } from 'react-router'

class EnsId extends React.Component {

  constructor(props) {
    super(props);
  }

  render = () => {
    console.log(this.props.match.params)
    return (
      <Query query={queries.gene} variables={{q: this.props.match.params.EnsId}}>
        {
          ( {loading, error, data} ) => {
            console.log(data)
            if ( loading ) return 'Loading...';
            if ( error ) return `Error: ${error.message}`;

            return (
              <ul>
                {
                  data.Gene.map( (ensId, i) => {
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

const RoutedEnsId = withRouter(EnsId)

EnsId.props = {
  ensId: PropTypes.object.isRequired,
  gene: PropTypes.object.isRequired,
};

const queries = {
  gene: gql`
    query GetEnsIds($q: String) {
      Gene(ensembl_gene_id: $q, first: 5) {
        ensembl_gene_id
      }
    }
  `,
}

export default RoutedEnsId;

