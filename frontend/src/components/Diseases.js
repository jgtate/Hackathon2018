
import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from "react-apollo";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class DiseaseIds extends React.Component {

  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <Query query={queries.DiseaseIds}>
        {
          ( {loading, error, data} ) => {
            if ( loading ) return 'Loading...';
            if ( error ) return `Error: ${error.message}`;

            return (
              <ul>
                {
                  data.Disease.map( (ensId, i) => {
                    console.log('ensId: ', ensId);

                    return <li key={ensId.disease_id}><Link to={`/diseases/${ensId.disease_id}`}>{ensId.disease_id}</Link></li>;
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

DiseaseIds.props = {
  DiseaseIds: PropTypes.object.isRequired,
};

const queries = {
  DiseaseIds: gql`
    query GetDiseaseIds {
      Disease(first: 5) {
        disease_id
      }
    }
  `,
}

export default DiseaseIds;

