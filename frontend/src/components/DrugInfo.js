
import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from "react-apollo";

function DrugInfo(props) {
  const drug = props.drug;
  return (
    <React.Fragment>
      <h1>{drug.chembl_id} ({drug.molecule_type})</h1>
      <h2>{drug.related_genes} related genes</h2>
    </React.Fragment>
  );
}

DrugInfo.props = {
  disease: PropTypes.object.isRequired,
};

DrugInfo.fragments = {
  drugInfo: gql`
    fragment DrugInfo on Drug {
      chembl_id
      molecule_type
      related_genes
    }
  `,
}

export default DrugInfo;

