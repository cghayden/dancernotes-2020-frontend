import React, { Component } from "react";
import Link from "next/link";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";
import SearchForStudio from "../SearchForStudio";
import Card from "../styles/Card";
import Edit from "../Icons/Edit";
import UpdateDancer from "./UpdateDancer";

import { RegistrationContextConsumer } from "./RegistrationContext";

const DancerCardHeaderStyles = styled(Card)`
  height: 80px;
  position: relative;
  text-align: right;
  padding: 1rem;
  margin-top: 80px;
  margin-bottom: -20px;
`;

const FlipButton = styled.button`
  padding: 0;
  margin: 0;
  box-shadow: none;
  /* background-color: transparent; */
  border: none;
`;

const DancerCardMain = styled.div``;

const DancerCardFooter = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardFlipAnimation = styled(Card)`
  display: flex;
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
  margin-left: auto;
  margin-right: auto;
  border: 5px solid ${props => props.theme.gray0};
  text-align: center;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  p {
    font-size: 5rem;
  }
`;

export default class DancerCard extends Component {
  state = {
    showStudioSearch: false,
    update: false,
    view: "info",
    newAvatar: ""
  };

  toggleStudioSearch = () => {
    this.setState({ showStudioSearch: !this.state.showStudioSearch });
  };

  switchView = () => {
    if (this.state.view === "info") {
      this.setState({ view: "update" });
    } else this.setState({ view: "info" });
  };

  changeAvatar = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "dancernotes-avatars");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/coreytesting/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    this.setState({
      newAvatar: file.eager[0].secure_url
    });
  };

  render() {
    const { dancer } = this.props;
    const hasDanceClasses = dancer.danceClasses.length > 0;
    console.log("dancer:", dancer);
    const hasAvatar = dancer.avatar;
    // if (dancer) {
    //   console.log("dancer classes:", dancer.classes.length);
    // }
    return (
      <RegistrationContextConsumer>
        {({ setBrowsingDancer }) => {
          return (
            <>
              <DancerCardHeaderStyles id={dancer.id}>
                <ImageDiv>
                  {this.state.newAvatar ? (
                    <img
                      src={this.state.newAvatar}
                      alt={`preview of new image picture`}
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
                      <UpdateDancer
                        id={dancer.id}
                        hasAvatar={hasAvatar}
                        closeFunc={this.switchView}
                        newAvatar={this.state.newAvatar}
                        changeAvatar={this.changeAvatar}
                      />
                    ) : (
                      <Card>
                        <DancerCardMain>
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
                        </DancerCardMain>
                        <DancerCardFooter>
                          <button
                            className="btn-dark"
                            onClick={this.toggleStudioSearch}
                          >
                            Find a Studio to Browse or Register{" "}
                            {dancer.firstName} for classes ->
                          </button>
                          {this.state.showStudioSearch && (
                            <SearchForStudio
                              setBrowsingDancer={setBrowsingDancer}
                              dancerName={dancer.firstName}
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
                      </Card>
                    )}
                  </CSSTransition>
                </TransitionGroup>
              </CardFlipAnimation>
            </>
          );
        }}
      </RegistrationContextConsumer>
    );
  }
}

export { DancerCardHeaderStyles, CardFlipAnimation };
