import { useLazyQuery } from '@apollo/client'
import { resetIdCounter, useCombobox } from 'downshift'
import gql from 'graphql-tag'
import debounce from 'lodash.debounce'
import { useRouter } from 'next/router'
import { DropDown, DropDownItem, SearchStyles } from '../styles/DropDown'

const SEARCH_STUDIOS_QUERY = gql`
  query SEARCH_STUDIOS_QUERY($searchTerm: String!) {
    studios(where: { studioName_contains: $searchTerm }) {
      id
      studioName
    }
  }
`

// TODO autofocus on search box with useRef
export default function NewSearchForStudio() {
  const [findStudios, { loading, data, error }] = useLazyQuery(
    SEARCH_STUDIOS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  )

  const router = useRouter()
  const items = data?.studios || []
  const findStudiosDelayed = debounce(findStudios, 350)
  resetIdCounter()
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      findStudiosDelayed({
        variables: {
          searchTerm: inputValue,
        },
      })
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/parent/browseStudioxd`,
        query: { studioId: selectedItem.id },
      })
    },
    itemToString: (item) => item?.studioName || '',
  })

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for a Studio',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              {...getItemProps({ item, index })}
              key={item.id}
              highlighted={index === highlightedIndex}
            >
              {item.studioName}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry, No Studios Found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  )
}
