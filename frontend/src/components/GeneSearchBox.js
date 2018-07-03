
import React from 'react';

import Downshift from 'downshift';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class GeneSearchBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    return <Downshift
      onChange={this.props.onChange}
      itemToString={item => ( item ? item.disease_label : '' )}
      onSelect={
        (selectedItem, stateAndHelpers) => {
          console.log(`onSelect: inputValue: ${stateAndHelpers.inputValue}, selectedItem: `, selectedItem);
          let items = this.state.items || [];
          console.log(`onSelect: items: |${items}|`);
          items.push(selectedItem.disease_label);
          stateAndHelpers.setState( { inputValue: items.join(', ') } );
        }
      }
      onInputValueChange={
        (inputValue, stateAndHelpers) => {
          console.log(`onInputValueChange: inputValue: ${inputValue}`);
          // console.log(`inputValue changed to |${inputValue}|; stateAndHelpers: `, stateAndHelpers);
          if ( inputValue.includes(',') ) {
            // eslint-disable-next-line
            let items = inputValue.split(/,\ */).filter( i => i != '' );
            console.log('onInputValueChange: setting state for multiple items');
            this.setState( {
              searchValue: items.pop(),
              items: items,
            } );
          } else {
            console.log('onInputValueChange: setting state for a single item');
            this.setState( {
              searchValue: inputValue,
            } );
          }
        }
      }>
      {
        ({
          getInputProps,
          getItemProps,
          getLabelProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
        }) => (
          <div>
            <label {...getLabelProps()}>Disease: </label>
            <input {...getInputProps( {placeholder: 'Disease name'})} />
            { isOpen ? (
              <Query
                skip={!inputValue}
                query={this.queries.diseaseSearchQuery}
                variables={ { 'q': this.state.searchValue } }
              >
                { ( {loading, error, data} ) => {
                  if ( loading ) return 'Loading...';
                  if ( error ) return `Error: ${error.message}`;
                  return (
                    <List>
                      {data.DiseasesBySubstring
                        .map(
                          (item, index) => (
                            <ListItem
                              {...getItemProps({item})}
                              key={item.disease_id}
                              style={{
                                backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                                fontWeight: highlightedIndex === index ? 'bold' : 'normal',
                              }}
                            >
                            <Link to={`/diseases/${item.disease_id}`}>{item.disease_label}</Link>
                            </ListItem>
                          )
                        )
                      }
                    </List>
                  );
                } }
              </Query>
            ) : null }
          </div>
        )
      }
    </Downshift>
  };

  queries = {
    diseaseSearchQuery: gql`
      query SearchDisease($q: String) {
        DiseasesBySubstring(substring: $q, first: 10) {
          disease_label
          disease_id
        }
      }
    `,
  };

}

export default GeneSearchBox;

