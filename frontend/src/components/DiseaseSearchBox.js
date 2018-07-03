
import React from 'react';

import Downshift from 'downshift';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import DiseaseInfo from './DiseaseInfo';
import DrugInfo from './DrugInfo';

class DiseaseSearchBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  itemToString = (item) => {
    // console.log('itemToString: ', item);
    if ( item.disease_id ) {
      return item.disease_label;
    } else {
      return item.chembl_id;
    }
  };

      //   (selectedItem, stateAndHelpers) => {
      //     console.log(`onSelect: inputValue: ${stateAndHelpers.inputValue}, selectedItem: `, selectedItem);
      //     let items = this.state.items || [];
      //     console.log(`onSelect: items: |${items}|`);
      //     items.push(selectedItem.disease_label);
      //     stateAndHelpers.setState( { inputValue: items.join(', ') } );
      //   }
      // }
  render = () => {
    return <Downshift
      onChange={this.props.onChange}
      itemToString={this.itemToString}
      onSelect={this.props.onSelect}
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
                variables={ { 'disease': this.state.searchValue, 'drug': this.state.searchValue } }
              >
                { ( {loading, error, data} ) => {
                  if ( loading ) return 'Loading...';
                  if ( error ) return `Error: ${error.message}`;

                  const mergedData = [
                    ...data.DiseasesBySubstring,
                    ...data.DrugBySubstring,
                  ];

                  return (
                    <React.Fragment>
                      <List>
                        {mergedData.map(
                          (item, index) => (
                            <ListItem
                              {...getItemProps({item})}
                              key={item.disease_id ? item.disease_label : item.chembl_id}
                              style={{
                                backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                                fontWeight: highlightedIndex === index ? 'bold' : 'normal',
                              }}
                            >
                              {item.disease_id ? item.disease_label : item.chembl_id}
                            </ListItem>
                          )
                        ) }
                      </List>
                    </React.Fragment>
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
      query SearchDisease($disease: String, $drug: String) {
        DiseasesBySubstring(substring: $disease, first: 5) {
          ...DiseaseInfo
        }
        DrugBySubstring(substring: $drug, first: 5) {
          ...DrugInfo
        }
      }
      ${DiseaseInfo.fragments.diseaseInfo}
      ${DrugInfo.fragments.drugInfo}
    `,
  };

}

export default DiseaseSearchBox;

