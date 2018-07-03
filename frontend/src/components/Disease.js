
import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from "react-apollo";
import { withRouter } from 'react-router'

import { Neo4jGraphRenderer } from 'neo4j-graph-renderer';

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
                    const ss = 'MATCH q=(disease1:Disease {disease_id: "' + ensId.disease_id + '"})--(t1:Gene)--(u1:Uniprot)-[i:INTERACTION]-(u2:Uniprot)--(t2:Gene)--(d1:Drug) WHERE i.intact_score >= 0.6 RETURN q LIMIT 100'
                    return <Neo4jGraphRenderer key={ensId.ensembl_gene_id} url="http://35.196.230.196:7474"
                    user="neo4j"
                    password="cosmicrocks"
                    query={ss}/>
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

