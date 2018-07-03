
import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from "react-apollo";

import { withRouter } from 'react-router'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { Neo4jGraphRenderer } from 'neo4j-graph-renderer';


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
              <FormControlLabel style={{float: 'right'}}
                control={
                  <Switch
                  value="Toggle Graph"
              />
                }
                label="Toggle Graph"
              />
                {
                  data.Gene.map( (ensId, i) => {
                    console.log('ensId: ', ensId);
                    const ss = 'MATCH q=(drug1:Drug)-[]-(target1:Gene {ensembl_gene_id: "' + ensId.ensembl_gene_id + '"})-[]-()-[]-(target2:Gene)<-[:TARGETS]-(drug2:Drug) RETURN q LIMIT 50'
                    console.log(ss)
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

