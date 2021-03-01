import { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useQuery } from '@apollo/client'
import { PARENTS_DANCERS } from './Queries'

const RegistrationContext = createContext()

function RegistrationContextProvider({ children }) {
  const [browsingDancerId, setBrowsingDancerId] = useState(null)
  // const { data, loading, error } = useQuery(PARENTS_DANCERS, {
  //   onCompleted: (data) => setBrowsingDancerId(data.parentsDancers[0].id),
  // })

  const setBrowsingDancer = (id) => {
    Cookies.set('browsingDancerId', id, { secure: false })
    console.log('setting browsing dancer cookie')
    setBrowsingDancerId(id)
  }

  return (
    <RegistrationContext.Provider
      value={{
        browsingDancerId,
        setBrowsingDancer,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  )
}

const RegistrationContextConsumer = RegistrationContext.Consumer

function useRegistrationContext() {
  const all = useContext(RegistrationContext)
  return all
}

export default RegistrationContextProvider
export {
  RegistrationContextConsumer,
  RegistrationContext,
  useRegistrationContext,
}
