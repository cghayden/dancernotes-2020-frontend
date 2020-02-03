import React from "react";

const AboutStudio = ({ setActive }) => {
  return (
    <div>
      <h1>Dancernotes for Studios</h1>
      <div className="aboutBody">
        All of your dance and costume information in one place
      </div>
      <div className="aboutBody">
        A single location for all parent communications
      </div>

      <div className="aboutBody">
        Keep parents and retailers up to date on all apparel requirements
      </div>

      <div>
        <button
          className="btn-action-primary"
          onClick={() => setActive("signupStudio")}
        >
          Try dancernotes
        </button>
      </div>
    </div>
  );
};

export default AboutStudio;
