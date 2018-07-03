
import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from "react-apollo";
import { withRouter } from 'react-router'

class Disease extends React.Component {

  constructor(props) {
    super(props);
  }

  render = () => {
    console.log(this.props.match.params)
    return (
      <Query query={queries.disease} variables={{q: this.props.match.params.DiseaseId}}>
        {
          ( {loading, error, data} ) => {
            console.log(data)
            if ( loading ) return 'Loading...';
            if ( error ) return `Error: ${error.message}`;

            return (
              <ul>
                {
                  data.Disease.map( (ensId, i) => {
                    console.log('ensId: ', ensId);
                    return <li key={ensId.disease_id}>{ensId.disease_label}</li>;
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

const RoutedDisease = withRouter(Disease)

Disease.props = {
  diseaseId: PropTypes.object.isRequired,
  disease: PropTypes.object.isRequired,
};

const queries = {
  disease: gql`
    query GetDisease($q: String) {
      Disease(disease_id: $q, first: 5) {
        disease_id
        disease_label
      }
    }
  `,
}

export default RoutedDisease;

