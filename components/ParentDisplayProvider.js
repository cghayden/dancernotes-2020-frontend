import React, { Component } from "react";

// const ParentDisplayContext = React.createContext({
//   hiddenDances: [],
//   hiddenDancers: [],
//   hiddenStudios: [],
//   hiddenIndependents: [],
//   toggleDance: () => {},
//   toggleDancer: () => {},
//   toggleStudio: () => {},
//   toggleIndependent: () => {},
//   toggleControlPanel: () => {},
//   showControlPanel: false,
// });
const ParentDisplayContext = React.createContext(null);

class ParentDisplayProvider extends Component {
  state = {
    hiddenDances: [],
    hiddenDancers: [],
    hiddenStudios: [],
    hiddenIndependents: [],
    showControlPanel: false,
  };

  toggleDance = (id, hiddenDances) => {
    const index = hiddenDances.indexOf(id);
    if (index > -1) {
      hiddenDances.splice(index, 1);
    } else {
      hiddenDances.push(id);
    }
    this.setState({ hiddenDances });
  };

  toggleDancer = (id, hiddenDancers) => {
    const index = hiddenDancers.indexOf(id);
    if (index > -1) {
      hiddenDancers.splice(index, 1);
    } else {
      hiddenDancers.push(id);
    }
    this.setState({ hiddenDancers });
  };

  toggleStudio = (id, hiddenStudios) => {
    const index = hiddenStudios.indexOf(id);
    if (index > -1) {
      hiddenStudios.splice(index, 1);
    } else {
      hiddenStudios.push(id);
    }
    this.setState({ hiddenStudios });
  };

  toggleIndependent = (id, hiddenIndependents) => {
    const index = hiddenIndependents.indexOf(id);
    if (index > -1) {
      hiddenIndependents.splice(index, 1);
    } else {
      hiddenIndependents.push(id);
    }
    this.setState({ hiddenIndependents });
  };

  toggleControlPanel = () => {
    this.setState({ showControlPanel: !this.state.showControlPanel });
  };

  render() {
    return (
      <ParentDisplayContext.Provider
        value={{
          hiddenDances: this.state.hiddenDances,
          hiddenDancers: this.state.hiddenDancers,
          hiddenStudios: this.state.hiddenStudios,
          hiddenIndependents: this.state.hiddenIndependents,
          toggleDance: this.toggleDance,
          toggleDancer: this.toggleDancer,
          toggleStudio: this.toggleStudio,
          toggleIndependent: this.toggleIndependent,
          showControlPanel: this.state.showControlPanel,
          toggleControlPanel: this.toggleControlPanel,
        }}
      >
        {this.props.children}
      </ParentDisplayContext.Provider>
    );
  }
}

const ParentDisplayConsumer = ParentDisplayContext.Consumer;

export default ParentDisplayProvider;
export { ParentDisplayConsumer, ParentDisplayContext };
