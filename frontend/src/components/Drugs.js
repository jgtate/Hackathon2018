
import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from "react-apollo";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class DrugIds extends React.Component {

  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <Query query={queries.drugIds}>
        {
          ( {loading, error, data} ) => {
            if ( loading ) return 'Loading...';
            if ( error ) return `Error: ${error.message}`;

            return (
              <ul>
                {
                  data.Drug.map( (ensId, i) => {
                    console.log('ensId: ', ensId);

                    return <li key={ensId.chembl_id}><Link to={`/drugs/${ensId.chembl_id}`}>{ensId.chembl_id}</Link></li>;
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

DrugIds.props = {
  drugIds: PropTypes.object.isRequired,
};

const queries = {
  drugIds: gql`
    query GetDrugIds {
      Drug(first: 5) {
        chembl_id
      }
    }
  `,
}

export default DrugIds;

