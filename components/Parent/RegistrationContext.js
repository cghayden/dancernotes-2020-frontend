import React, { Component, createContext } from "react";

const RegistrationContext = createContext();

class RegistrationContextProvider extends Component {
  state = {
    browsingDancerId: "",
    browsingDancerName: "",
  };

  setBrowsingDancer = (id, name) => {
    this.setState({ browsingDancerId: id, browsingDancerName: name });
  };
  render() {
    const { browsingDancerId, browsingDancerName } = this.state;
    return (
      <RegistrationContext.Provider
        value={{
          browsingDancerId,
          browsingDancerName,
          setBrowsingDancer: this.setBrowsingDancer,
        }}
      >
        {this.props.children}
      </RegistrationContext.Provider>
    );
  }
}

const RegistrationContextConsumer = RegistrationContext.Consumer;

export default RegistrationContextProvider;
export { RegistrationContextConsumer, RegistrationContext };
