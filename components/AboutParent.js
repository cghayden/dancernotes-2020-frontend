import React from "react";
import styled from "styled-components";

const AboutParent = ({ setActive }) => {
  return <AboutParentContent setActive={setActive} />;
};

const AboutParentContent = ({ setActive }) => {
  return (
    <div>
      <h1>Dancernotes for Parents</h1>
      <div className="aboutBody">
        <ul>
          <li>
            <p>
              All of your dancers' information, from all of their studios, in
              one place
            </p>
          </li>
        </ul>
      </div>

      <div>
        <button
          className="btn-action-primary landingPage"
          onClick={() => setActive("signupParent")}
        >
          Try dancernotes
        </button>
      </div>
    </div>
  );
};

export default AboutParent;
