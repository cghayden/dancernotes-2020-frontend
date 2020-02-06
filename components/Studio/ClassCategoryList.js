import React, { Fragment, Component } from "react";
import { Mutation } from "react-apollo";
import styled from "styled-components";

import { UPDATE_CATEGORY_MUTATION } from "../Mutations";
import { CATEGORIES_QUERY } from "./Queries";
import { STUDIO_USER_QUERY } from "./useStudio";
import XIcon from "../Icons/X";
//TODO - add optimistic return to add category to list

const EditCategoriesCard = styled.div`
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.gray0};
  padding: 1rem;
  input {
    background: ${props => props.theme.gray1};
  }
`;

const StyledDeleteButton = styled.button`
  height: 1.5em;
  width: 1.5em;
  padding: 0;
  margin: 0 1rem 0 0;
  border-radius: 50%;
  background: none;
  box-shadow: none;
  border: none;
  svg {
    pointer-events: none;
  }
`;
const StyledUl = styled.ul`
  li {
    display: flex;
    align-items: center;
    padding: 0.25rem 0;
  }
`;

const EditCategoriesCardFooter = styled.div`
  margin-top: auto;
`;

export default class ClassCategoryList extends Component {
  state = {
    newItem: ""
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  addItemToCategory = async updateCategoryMutation => {
    const newItems = [...this.props.currentItems, this.state.newItem];
    return await updateCategoryMutation({
      variables: {
        category: this.props.category,
        items: newItems
      },
      refetchQueries: [
        { query: STUDIO_USER_QUERY },
        { query: CATEGORIES_QUERY }
      ]
    })
      .then(() => this.setState({ newItem: "" }))
      .catch(err => {
        alert(err.message);
      });
  };

  deleteItemFromCategoryList = async (e, updateCategoryMutation) => {
    const newItems = this.props.currentItems.filter(
      item => item !== e.target.value
    );
    return await updateCategoryMutation({
      variables: {
        category: this.props.category,
        items: newItems
      }
    }).catch(err => {
      alert(err.message);
    });
  };
  configure;
  formatCategoryHeading = category => {
    if (category === "styles") return "Styles";
    if (category === "ageDivisions") return "Age Divisions";
    if (category === "competitiveLevels") return "Competitive Levels";
  };
  render() {
    const currentItems = this.props.currentItems;
    const category = this.formatCategoryHeading(this.props.category);
    const disabled = this.state.newItem === "" ? true : false;
    return (
      <Mutation
        mutation={UPDATE_CATEGORY_MUTATION}
        refetchQueries={[{ query: CATEGORIES_QUERY }]}
      >
        {(updateStudioClassCategory, error) => (
          <EditCategoriesCard>
            <div>
              <h4>{category}</h4>
              <StyledUl>
                {currentItems.map(item => (
                  <li key={item}>
                    <StyledDeleteButton
                      value={item}
                      onClick={e =>
                        this.deleteItemFromCategoryList(
                          e,
                          updateStudioClassCategory
                        )
                      }
                    >
                      <XIcon />
                    </StyledDeleteButton>{" "}
                    {item}
                  </li>
                ))}
              </StyledUl>
            </div>
            <EditCategoriesCardFooter>
              <input
                required
                title="this field is required"
                pattern="\S+"
                type="text"
                name="newItem"
                value={this.state.newItem}
                placeholder={`Add a new ${category.slice(0, -1)}`}
                onChange={this.handleInputChange}
              />
              <button
                className="btn-action-primary"
                disabled={disabled}
                onClick={() =>
                  this.addItemToCategory(updateStudioClassCategory)
                }
              >
                Add to Category
              </button>
            </EditCategoriesCardFooter>
          </EditCategoriesCard>
        )}
      </Mutation>
    );
  }
}
