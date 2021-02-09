import React, { Component, createContext } from 'react'
import Cookies from 'js-cookie'

const RegistrationContext = createContext()

class RegistrationContextProvider extends Component {
  state = {
    browsingDancerId: '',
    browsingDancerName: '',
  }

  setBrowsingDancer = (id) => {
    Cookies.set('browsingDancerId', id)
    this.setState({ browsingDancerId: id })
  }
  render() {
    const { browsingDancerId } = this.state
    // console.log('browsingDancerId=', browsingDancerId)
    return (
      <RegistrationContext.Provider
        value={{
          browsingDancerId,
          setBrowsingDancer: this.setBrowsingDancer,
        }}
      >
        {this.props.children}
      </RegistrationContext.Provider>
    )
  }
}

const RegistrationContextConsumer = RegistrationContext.Consumer

export default RegistrationContextProvider
export { RegistrationContextConsumer, RegistrationContext }
