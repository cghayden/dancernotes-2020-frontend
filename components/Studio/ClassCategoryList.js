import { useState } from 'react'
import { useMutation } from '@apollo/client'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { CATEGORIES_QUERY } from './Queries'
import { STUDIO_USER_QUERY } from './useStudio'
import DeleteIcon from '../Icons/DeleteIcon'
import Card from '../styles/Card'
import Form from '../styles/Form'
import Error from '../Error'
import XSvg from '../Icons/XSvg'
// import TrashIcon from '../Icons/TrashIcon'

//TODO - add optimistic return to add category to list
const CategoryCard = styled(Card)`
  min-width: unset;
  width: unset;
  display: flex;
  flex-direction: column;
  label {
    font-size: 0.875rem;
  }
`

const StyledDeleteButton = styled.button`
  transform: rotate(0.5turn);
  color: red;
  height: 1.5em;
  width: 1.5em;
  padding: 0;
  margin: 0 0.5rem 2px 0;
  border-radius: 50%;
  background: none;
  box-shadow: none;
  border: none;
  svg {
    width: 20px;
    height: 20px;
    pointer-events: none;
  }
  :hover {
    background: inherit;
    color: red;
  }
`

const StyledUl = styled.ul`
  padding-bottom: 1rem;
`
const NewCategoryForm = styled(Form)`
  .input-item {
    max-width: 220px;
    text-align: left;
    margin: 0;
    input {
      margin: 2px 0 4px 0;
    }
  }
`
const UPDATE_CATEGORY_MUTATION = gql`
  mutation UPDATE_CATEGORY_MUTATION($category: String!, $items: [String]!) {
    updateStudioClassCategory(category: $category, items: $items) {
      id
    }
  }
`
const ItemWithDelete = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.gray2};
  padding: 2px 4px;
  &:hover {
    background: white;
  }
  button {
    margin-left: auto;
    color: ${(props) => props.theme.dutchRed};
  }
`
function ClassCategoryList({ existingItems, category }) {
  const [newItems, setNewItems] = useState('')

  const [updateCategoryMutation, { loading, error }] = useMutation(
    UPDATE_CATEGORY_MUTATION,
    {
      refetchQueries: [
        { query: CATEGORIES_QUERY },
        { query: STUDIO_USER_QUERY },
      ],
    }
  )

  const regex = new RegExp(`,\s*`, 'g')

  async function deleteItemFromCategoryList(e) {
    if (confirm('Do you Really Want To Delete This Category?')) {
      const newItems = existingItems.filter((item) => item !== e.target.value)
      return await updateCategoryMutation({
        variables: {
          category,
          items: newItems,
        },
      })
    }
  }

  function formatCategoryHeading(category) {
    if (category === 'styles') return 'Styles'
    if (category === 'ageDivisions') return 'Age Divisions'
    if (category === 'competitiveLevels') return 'Competitive Levels'
  }

  const categoryHeading = formatCategoryHeading(category)

  return (
    <CategoryCard>
      <div>
        <h4>{categoryHeading}</h4>
        <StyledUl>
          {existingItems.map((item) => (
            <ItemWithDelete key={item}>
              {item}
              <button
                title='Delete this option'
                type='button'
                className='btn-icon'
                aria-label={`delete `}
                value={item}
                onClick={(e) => deleteItemFromCategoryList(e)}
              >
                <XSvg w={14} h={14} />
                {/* <TrashIcon w={12} h={12} /> */}
              </button>
              {/* <StyledDeleteButton
                    title='Delete this option'
                    type='button'
                    className='btn-icon'
                    aria-label={`delete `}
                    value={item}
                    onClick={(e) => deleteItemFromCategoryList(e)}
                  >
                    <DeleteIcon />
                  </StyledDeleteButton>{' '} */}
            </ItemWithDelete>
          ))}
        </StyledUl>
      </div>
      <NewCategoryForm
        style={{ marginTop: 'auto' }}
        method='post'
        onSubmit={async (e) => {
          e.preventDefault(e)
          const newItemsArray = newItems.split(regex)
          const items = [...existingItems, ...newItemsArray]
          await updateCategoryMutation({
            variables: { category, items },
          })
          setNewItems('')
        }}
      >
        <fieldset disabled={loading} aria-busy={loading}>
          <Error error={error} />
          <div className='input-item'>
            <label>
              {`Add ${categoryHeading.slice(0, -1)}(s), separated by a comma`}
            </label>
            <input
              // pattern="\S+"
              type='text'
              name='newItem'
              value={newItems}
              placeholder={`${categoryHeading.slice(0, -1)}s...`}
              onChange={(e) => setNewItems(e.target.value)}
            />
          </div>
          <button type='submit' className='btn-action-primary'>
            Add to Category
          </button>
        </fieldset>
      </NewCategoryForm>
    </CategoryCard>
  )
}

export default ClassCategoryList
