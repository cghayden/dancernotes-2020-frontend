import React, { Component } from "react";
import Link from "next/link";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";
import SearchForStudio from "../SearchForStudio";
import Card from "../styles/Card";
import Edit from "../Icons/Edit";
import UpdateDancerForm from "./UpdateDancerForm";
import { RegistrationContextConsumer } from "./RegistrationContext";

const DancerCardContainer = styled(Card)`
  padding-bottom: 0;
  margin-top: 4rem;
`;
const DancerCardHeaderStyles = styled.div`
  height: 80px;
  position: relative;
  text-align: right;
  /* padding: 1rem; */
  /* margin-top: 80px; */
  margin-bottom: -20px;
  z-index: 100;
  /* background: ${props => props.theme.gray0}; */
  /* z-index to hide top box shadow of edit dancer form */
`;

const FlipButton = styled.button`
  padding: 0;
  margin: 0;
  box-shadow: none;
  border: none;
`;

const DancerCardFooter = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
`;

const CardFlipAnimation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  .body {
    position: relative;
    transition: all 0.4s;
    backface-visibility: hidden;
  }
  .body-enter {
    transform: rotateY(0.5turn);
    opacity: 0.1;
  }
  .body-enter-active {
    transform: rotateY(0);
    opacity: 1;
  }
  .body-exit {
    top: 0;
    position: absolute;
    transform: rotateY(0);
    opacity: 0.5;
  }
  .body-exit-active {
    transform: rotateY(0.5turn);
    opacity: 0;
  }
`;

const ImageDiv = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto;
  border-radius: 50%;
  background: ${props => props.theme.gray2};
  position: absolute;
  top: -60px;
  left: 0;
  right: 0;
  border: 5px solid ${props => props.theme.gray0};
  text-align: center;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    margin: 0;
  }
  p {
    font-size: 5rem;
  }
`;

export default class DancerCard extends Component {
  state = {
    showStudioSearch: false,
    view: "info"
  };

  toggleStudioSearch = () => {
    this.setState({ showStudioSearch: !this.state.showStudioSearch });
  };

  switchView = () => {
    if (this.state.view === "info") {
      this.setState({ view: "update" });
    } else {
      this.setState({ view: "info" });
    }
  };

  showAvatarPreview = newAvatar => {
    this.setState({ newAvatar });
  };

  render() {
    const { dancer } = this.props;
    const hasDanceClasses = dancer.danceClasses.length > 0;
    const hasAvatar = dancer.avatar;
    // Router.events.on("routeChangeStart", this.handleRouteChange);

    return (
      <RegistrationContextConsumer>
        {({ setBrowsingDancer }) => {
          return (
            <DancerCardContainer>
              <DancerCardHeaderStyles id={dancer.id}>
                <ImageDiv>
                  {this.state.newAvatar ? (
                    <img
                      src={this.state.newAvatar}
                      alt={`preview of new avatar image`}
                    />
                  ) : hasAvatar ? (
                    <img
                      src={dancer.avatar}
                      alt={`${dancer.firstName}'s picture`}
                    />
                  ) : (
                    <p>{dancer.firstName[0]}</p>
                  )}
                </ImageDiv>
                <FlipButton onClick={this.switchView}>
                  <Edit />
                </FlipButton>
              </DancerCardHeaderStyles>

              <CardFlipAnimation>
                <TransitionGroup component={null}>
                  <CSSTransition
                    timeout={{ enter: 400, exit: 400 }}
                    className="body"
                    classNames="body"
                    key={this.state.view}
                    unmountOnExit
                  >
                    {this.state.view === "update" ? (
                      <UpdateDancerForm
                        dancer={dancer}
                        closeFunc={this.switchView}
                        hasAvatar={hasAvatar}
                        showAvatarPreview={this.showAvatarPreview}
                      />
                    ) : (
                      <>
                        <div>
                          <h2>{dancer.firstName}</h2>
                          {hasDanceClasses ? (
                            <div>
                              <h3>Classes</h3>
                              {dancer.studios.map(studio => (
                                <div key={studio.id}>
                                  <h4>Classes at {studio.studioName}</h4>
                                  <ul>
                                    {dancer.danceClasses.map(dance => {
                                      if (dance.studio.id === studio.id) {
                                        return (
                                          <li key={dance.id}>{dance.name}</li>
                                        );
                                      }
                                    })}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p>
                              {dancer.firstName} is not registered in any
                              classes.
                            </p>
                          )}
                        </div>
                        <DancerCardFooter>
                          {dancer.studios.map(studio => (
                            <Link
                              key={studio.id}
                              href={`/parent/account/browseStudio?studioId=${studio.id}`}
                            >
                              <button
                                className="btn-action-secondary"
                                onClick={() => setBrowsingDancer(dancer.id)}
                              >
                                Browse Classes at {studio.studioName}
                              </button>
                            </Link>
                          ))}

                          <button
                            className="btn-dark"
                            onClick={this.toggleStudioSearch}
                          >
                            Find a Studio to Browse or Register{" "}
                            {dancer.firstName} for classes ->
                          </button>
                          {this.state.showStudioSearch && (
                            <SearchForStudio
                              // setBrowsingDancer={setBrowsingDancer}
                              // dancerName={dancer.firstName}
                              dancerId={dancer.id}
                            />
                          )}
                          <div>
                            <p>OR</p>
                          </div>
                          <Link href="/parent/createCustomRoutine">
                            <a className="btn-dark">
                              Create Your Own Routine for {dancer.firstName}
                            </a>
                          </Link>
                        </DancerCardFooter>
                      </>
                    )}
                  </CSSTransition>
                </TransitionGroup>
              </CardFlipAnimation>
            </DancerCardContainer>
          );
        }}
      </RegistrationContextConsumer>
    );
  }
}

export { DancerCardHeaderStyles, CardFlipAnimation, DancerCardContainer };
