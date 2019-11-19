import React from "react";
import Cookies from "js-cookie";
import Downshift from "downshift";
import Router from "next/router";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
// import debounce from "lodash.debounce";
import debounce from "../lib/debounce";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";

//TODO: props
const SEARCH_STUDIOS_QUERY = gql`
  query SEARCH_STUDIOS_QUERY($searchTerm: String!) {
    studios(where: { studioName_contains: $searchTerm }) {
      id
      studioName
    }
  }
`;

class SearchForStudio extends React.Component {
  state = {
    studios: [],
    loading: false
  };
  onChange = debounce(async (e, client) => {
    // turn loading on
    this.setState({ loading: true });
    // Manually query apollo client
    const res = await client.query({
      query: SEARCH_STUDIOS_QUERY,
      variables: { searchTerm: e.target.value }
    });
    this.setState({
      studios: res.data.studios,
      loading: false
    });
  }, 350);
  render() {
    const { dancerId, dancerName } = this.props;
    return (
      <SearchStyles>
        <Downshift
          onChange={async studio => {
            Cookies.set("browsingDancerId", dancerId);
            Cookies.set("browsingDancerName", dancerName);
            await this.props.setBrowsingDancer(dancerId, dancerName);

            Router.push({
              pathname: "/parent/account/browseStudio",
              query: {
                studioId: studio.id
              }
            });
          }}
          itemToString={studio => (studio === null ? "" : studio.studioName)}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex
          }) => (
            <div>
              <ApolloConsumer>
                {client => (
                  <input
                    {...getInputProps({
                      type: "search",
                      placeholder: "Search For A Studio",
                      id: "search",
                      className: this.state.loading ? "loading" : "",
                      onChange: e => {
                        e.persist();
                        this.onChange(e, client);
                      }
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {this.state.studios.map((item, index) => (
                    <DropDownItem
                      {...getItemProps({ item })}
                      key={item.id}
                      highlighted={index === highlightedIndex}
                    >
                      {item.studioName}
                    </DropDownItem>
                  ))}
                  {!this.state.studios.length && !this.state.loading && (
                    <DropDownItem> Nothing Found for {inputValue}</DropDownItem>
                  )}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    );
  }
}

export default SearchForStudio;
