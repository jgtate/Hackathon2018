
import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from "react-apollo";
import { withRouter } from 'react-router'

class DrugId extends React.Component {

  constructor(props) {
    super(props);
  }

  render = () => {
    console.log(this.props.match.params)
    return (
      <Query query={queries.drug} variables={{q: this.props.match.params.ChemblId}}>
        {
          ( {loading, error, data} ) => {
            console.log(data)
            if ( loading ) return 'Loading...';
            if ( error ) return `Error: ${error.message}`;

            return (
              <ul>
                {
                  data.Drug.map( (ensId, i) => {
                    console.log('ensId: ', ensId);
                    return <div>
                    <h2>Opportunity Score: 10</h2>
                    <h1>{ensId.chembl_id}</h1>
                    <li key={ensId.chembl_id}>{ensId.chembl_id}</li>
                    </div>
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

const RoutedDrugId = withRouter(DrugId)

DrugId.props = {
  chemblId: PropTypes.object.isRequired,
  drug: PropTypes.object.isRequired,
};

const queries = {
  drug: gql`
    query GetDrug($q: String) {
      Drug(chembl_id: $q, first: 5) {
        chembl_id
      }
    }
  `,
}

export default RoutedDrugId;

