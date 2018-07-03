
import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from "react-apollo";

function DiseaseInfo(props) {
  const disease = props.disease;
  return (
    <h1>{disease.disease_label} ({disease.disease_id})</h1>
  );
}

DiseaseInfo.props = {
  disease: PropTypes.object.isRequired,
};

DiseaseInfo.fragments = {
  diseaseInfo: gql`
    fragment DiseaseInfo on Disease {
      disease_label
      disease_id
    }
  `,
}

export default DiseaseInfo;

