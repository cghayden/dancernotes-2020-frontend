import { useLazyQuery, useQuery } from '@apollo/client'
import { resetIdCounter, useCombobox } from 'downshift'
import gql from 'graphql-tag'
import debounce from 'lodash.debounce'
import { useRouter } from 'next/router'
import { DropDown, DropDownItem, SearchStyles } from '../styles/DropDown'
import { useRegistrationContext } from './RegistrationContext'
import { PARENTS_DANCERS } from './Queries'

const SEARCH_STUDIOS_QUERY = gql`
  query SEARCH_STUDIOS_QUERY($searchTerm: String!) {
    searchStudios(searchTerm: $searchTerm) {
      id
      studioName
    }
  }
`

// TODO autofocus on search box with useRef
export default function NewSearchForStudio() {
  const [searchStudios, { loading, data, error }] = useLazyQuery(
    SEARCH_STUDIOS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  )
  const {
    data: parentsDancers,
    loading: loadingDancers,
    error: errorLoadingDancers,
  } = useQuery(PARENTS_DANCERS)

  const dancerId = parentsDancers ? parentsDancers.parentsDancers[0].id : 0
  const { setBrowsingDancer } = useRegistrationContext()

  const router = useRouter()
  const items = data?.studios || []
  const findStudiosDelayed = debounce(searchStudios, 350)
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
      setBrowsingDancer(dancerId)
      router.push({
        pathname: `/parent/browseStudio`,
        query: { studioId: selectedItem.id, dancer: dancerId },
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
