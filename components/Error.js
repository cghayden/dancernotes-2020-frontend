import styled from "styled-components";
import React from "react";

import PropTypes from "prop-types";

const ErrorStyles = styled.div`
  color: inherit;
  padding: 2rem;
  background: inherit;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

const Error = ({ error }) => {
  console.error("ERRROORRR:", error);
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <ErrorStyles key={i}>
        <p data-test="graphql-error">
          <strong>Shoot! An Error has occurred</strong>
          {error.message.replace("GraphQL error: ", "")}
        </p>
      </ErrorStyles>
    ));
  }
  if (error.message.includes("unique constraint would be violated")) {
    return (
      <ErrorStyles>
        <p data-test="graphql-error">
          <strong>Shoot!</strong>
          An account using this email already exists
        </p>
        <p>
          Visit the Sign in link above to sign in or reset your password,
        </p>{" "}
        <p>
          Or email{" "}
          <a href="mailto:admin@coreyhayden.tech for assistance">
            admin@coreyhayden.tech
          </a>{" "}
          for assistance
        </p>
      </ErrorStyles>
    );
  }
  return (
    <ErrorStyles>
      <p data-test="graphql-error">
        <strong>Shoot!</strong>
        {error.message}
        {error.message.replace("GraphQL error: ", "")}
      </p>
    </ErrorStyles>
  );
};

Error.defaultProps = {
  error: {}
};

Error.propTypes = {
  error: PropTypes.object
};

export default Error;
