
import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from "react-apollo";
import { withRouter } from 'react-router'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { Neo4jGraphRenderer } from 'neo4j-graph-renderer';

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
              <FormControlLabel style={{float: 'right'}}
                control={
                  <Switch
                  value="Toggle Graph"
              />
                }
                label="Toggle Graph"
              />
                {
                  data.Drug.map( (ensId, i) => {
                    console.log('ensId: ', ensId);
                    const ss = 'MATCH q=(drug1:Drug {chembl_id:"' + ensId.chembl_id + '"})-[]-(target1:Gene )-[]-()-[]-(target2:Gene)<-[:TARGETS]-(drug2:Drug)-[]-(disease1:Disease) RETURN q LIMIT 20'
                    return <div key={ensId.chembl_id}>
                    <h1>{ensId.chembl_id}</h1>
                    <h2>Opportunity Score: {ensId.pagerank.toFixed(2)}</h2>
                    <h2>{ensId.betweenness ? `Interconnectivity: ${ensId.betweenness.toFixed(2)}` : ''}</h2>
                    <Neo4jGraphRenderer key={ensId.disease_id} url="http://35.196.230.196:7474"
                    user="neo4j"
                    password="cosmicrocks"
                    query={ss}/>
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
        pagerank
        betweenness
      }
    }
  `,
}

export default RoutedDrugId;

