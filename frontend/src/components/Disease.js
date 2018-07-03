
import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from "react-apollo";
import { withRouter } from 'react-router'

import Slider from '@material-ui/lab/Slider';

import { Neo4jGraphRenderer } from 'neo4j-graph-renderer';

class Disease extends React.Component {

  constructor(props) {
    super(props);
  }


  state = {
    value: 0.6,
  };

  handleChange = (event, value) => {
    console.log(event, value)
    this.setState({ value });
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
                    const ss = 'MATCH q=(disease1:Disease {disease_id: "' + ensId.disease_id + '"})--(t1:Gene)--(u1:Uniprot)-[i:INTERACTION]-(u2:Uniprot)--(t2:Gene)--(d1:Drug) WHERE i.intact_score >= ' + this.state.value + ' RETURN q LIMIT 100'
                    return <div>
                    <h1>{ensId.disease_label}</h1>
                    <h2>{ensId.is_unmet ? 'Unmet need' : 'Has existing drugs'}</h2>
                    <h4>Intact Score: {this.state.value} (slide to change)</h4>
                    <Slider value={this.state.value}  min={0} max={1} step={0.1} aria-labelledby="label" onChange={this.handleChange} />
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
        is_unmet
      }
    }
  `,
}

export default RoutedDisease;

