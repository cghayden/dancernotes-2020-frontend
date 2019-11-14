import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import Link from "next/link";
import gql from "graphql-tag";
import { STUDIO_ALL_DANCERS_QUERY, SINGLE_DANCE_QUERY } from "./Queries";
import Card from "../styles/Card";
import RemoveDancerFromDanceButton from "./RemoveDancerFromDanceButton";

const REGISTER_DANCER_MUTATION = gql`
  mutation REGISTER_DANCER_MUTATION($dancerId: ID!, $danceId: ID!) {
    addDancer(dancerId: $dancerId, danceId: $danceId) {
      message
    }
  }
`;

class AddDancers extends Component {
  state = {
    dancer: "",
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Mutation
        mutation={REGISTER_DANCER_MUTATION}
        variables={{
          dancerId: this.state.dancer,
          danceId: this.props.id,
        }}
        refetchQueries={[
          {
            query: SINGLE_DANCE_QUERY,
            variables: { id: this.props.id },
          },
        ]}
      >
        {(addDancer, { error, loading }) => {
          return (
            <Query query={STUDIO_ALL_DANCERS_QUERY}>
              {({ data: { studioDancers }={} }, error, loading) => {
                return (
                  <Query
                    query={SINGLE_DANCE_QUERY}
                    variables={{ id: this.props.id }}
                  >
                    {({ data: { danceClass }={}, loading, error }) => {
                      if (loading) return <p>Loading...</p>;
                      if (!danceClass)
                        return (
                          <p>
                            Error: No DanceClass found for ID {this.props.id}
                          </p>
                        );
                      return (
                        <Card>
                          <div className="card__header">
                            <h2>{danceClass.name}</h2>
                          </div>
                          <div className="card__section">
                            <h2>Dancers in {danceClass.name}:</h2>
                            <ul>
                              {danceClass.dancers.map((dancer, index) => (
                                <li key={index}>
                                  {dancer.firstName}
                                  <span>
                                    <RemoveDancerFromDanceButton
                                      dancerId={dancer.id}
                                      danceId={this.props.id}
                                    />
                                  </span>{" "}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="card__section">
                            <h2>Select a Dancer to add:</h2>
                            <label htmlFor="dancer">
                              <select
                                required
                                id="dancer"
                                name="dancer"
                                value={this.state.dancer}
                                onChange={this.handleChange}
                              >
                                <option default value={""} disabled>
                                  Dancer...
                                </option>
                                {studioDancers.map(dancer => (
                                  <option key={dancer.id} value={dancer.id}>
                                    {dancer.firstName}
                                  </option>
                                ))}
                              </select>
                            </label>
                          </div>
                          <div className="card__section">
                            <button
                              type="button"
                              onClick={async () => {
                                await addDancer();
                                this.setState({ dancer: "" });
                              }}
                            >
                              Add
                            </button>
                            <Link href="/studio/classes">
                              <a>Return to Classes</a>
                            </Link>
                          </div>
                        </Card>
                      );
                    }}
                  </Query>
                );
              }}
            </Query>
          );
        }}
      </Mutation>
    );
  }
}

export default AddDancers;
