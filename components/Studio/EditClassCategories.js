import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { CATEGORIES_QUERY } from './Queries'
import ClassCategoryList from './ClassCategoryList'

const CategoryCards = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 275px);
  justify-content: center;
  grid-gap: 20px;
  h3 {
    justify-self: center;
    grid-column: 1/-1;
  }

  h4 {
    text-align: center;
    /* font-size: 1.5rem; */
    margin: 0;
  }
`

const EditClassCategories = () => {
  const { data, loading, error } = useQuery(CATEGORIES_QUERY)
  console.log('data', data)
  const studioCategories = data ? data.studioCategories : {}
  const categories = ['styles', 'competitiveLevels', 'ageDivisions']
  if (loading) return <h1>5, 6, 7, 8...</h1>
  if (error) return <Error error={error} />
  return (
    <CategoryCards>
      {categories.map((cat) => (
        <ClassCategoryList
          key={cat}
          category={cat}
          existingItems={studioCategories[cat]}
        />
      ))}
    </CategoryCards>
  )
}

export default EditClassCategories
