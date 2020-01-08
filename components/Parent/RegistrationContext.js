import React, { Component, createContext } from "react";
import Cookies from "js-cookie";

const RegistrationContext = createContext();

class RegistrationContextProvider extends Component {
  state = {
    browsingDancerId: "",
    browsingDancerName: ""
  };

  setBrowsingDancer = (id, name) => {
    console.log(" set browsing dancer:", name);
    Cookies.set("browsingDancerId", id);
    Cookies.set("browsingDancerName", name);
    this.setState({ browsingDancerId: id, browsingDancerName: name });
  };
  render() {
    const { browsingDancerId, browsingDancerName } = this.state;
    return (
      <RegistrationContext.Provider
        value={{
          browsingDancerId,
          browsingDancerName,
          setBrowsingDancer: this.setBrowsingDancer
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
