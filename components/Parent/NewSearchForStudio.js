import { useLazyQuery } from '@apollo/client'
import { resetIdCounter, useCombobox } from 'downshift'
import gql from 'graphql-tag'
import debounce from 'lodash.debounce'
import { useRouter } from 'next/router'
import { DropDown, DropDownItem, SearchStyles } from '../styles/DropDown'

import { ApolloConsumer } from 'react-apollo'
import {
  RegistrationContext,
  RegistrationContextConsumer,
} from './RegistrationContext'

const SEARCH_STUDIOS_QUERY = gql`
  query SEARCH_STUDIOS_QUERY($searchTerm: String!) {
    studios(where: { studioName_contains: $searchTerm }) {
      id
      studioName
    }
  }
`

// autofocus on search box with useRef
export default function NewSearchForStudio() {
  const router = useRouter()
  const [findStudios, { loading, data, error }] = useLazyQuery(
    SEARCH_STUDIOS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  )
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
      console.log('selectedItem', selectedItem)
      router.push({
        pathname: `/parent/browseStudio`,
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

// class SearchForStudio extends React.Component {
//   state = {
//     studios: [],
//     loading: false,
//   }

//   textInput = React.createRef()
//   componentDidMount() {
//     this.textInput.current.focus()
//   }

//   onChange = debounce(async (e, client) => {
//     // turn loading on
//     this.setState({ loading: true })
//     // Manually query apollo client
//     const res = await client.query({
//       query: SEARCH_STUDIOS_QUERY,
//       variables: { searchTerm: e.target.value },
//     })
//     this.setState({
//       studios: res.data.studios,
//       loading: false,
//     })
//   }, 350)
//   render() {
//     const { dancerId } = this.props
//     return (
//       <RegistrationContextConsumer>
//         {({ setBrowsingDancer }) => {
//           return (
//               <Downshift
//                 onChange={async (studio) => {
//                   await setBrowsingDancer(dancerId)
//                   Router.push({
//                     pathname: '/parent/browseStudio',
//                     query: {
//                       studioId: studio.id,
//                     },
//                   })
//                 }}
//                 itemToString={(studio) =>
//                   studio === null ? '' : studio.studioName
//                 }
//               >
//                 {({
//                   getInputProps,
//                   getItemProps,
//                   isOpen,
//                   inputValue,
//                   highlightedIndex,
//                 }) => (
//                   <div>
//                     <ApolloConsumer>
//                       {(client) => (
//                         <input
//                           ref={this.textInput}
//                           {...getInputProps({
//                             type: 'search',
//                             placeholder: 'Search...',
//                             id: 'search',
//                             className: this.state.loading ? 'loading' : '',
//                             onChange: (e) => {
//                               e.persist()
//                               this.onChange(e, client)
//                             },
//                           })}
//                         />
//                       )}
//                     </ApolloConsumer>
//                     {isOpen && (
//                       <DropDown>
//                         {this.state.studios.map((item, index) => (
//                           <DropDownItem
//                             {...getItemProps({ item })}
//                             key={item.id}
//                             highlighted={index === highlightedIndex}
//                           >
//                             {item.studioName}
//                           </DropDownItem>
//                         ))}
//                         {!this.state.studios.length && !this.state.loading && (
//                           <DropDownItem>
//                             {' '}
//                             Nothing Found for {inputValue}
//                           </DropDownItem>
//                         )}
//                       </DropDown>
//                     )}
//                   </div>
//                 )}
//               </Downshift>
//           )
//         }}
//       </RegistrationContextConsumer>
//     )
//   }
// }

// export default SearchForStudio
