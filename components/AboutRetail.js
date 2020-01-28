import React from "react";
// import SignupRetail from "./SignupRetail";

const AboutRetail = ({ setActive }) => {
  return (
    <div>
      <h1>Dancernotes for Retail</h1>
      <div>
        Some people have an ability to write placeholder text... It's an art
        you're basically born with. You either have it or you don't.
      </div>
      <div>
        Despite the constant negative ipsum covfefe. Lorem Ispum is a choke
        artist. It chokes! I'm speaking with myself, number one, because I have
        a very good brain and I've said a lot of things. The concept of Lorem
        Ipsum was created by and for the Chinese in order to make U.S. design
        jobs non-competitive.
      </div>
      <div>
        <button className="btn-action-primary" onClick={() => setActive("signupRetail")}>
          Try dancernotes
        </button>
      </div>
    </div>
  );
};

export default AboutRetail;
