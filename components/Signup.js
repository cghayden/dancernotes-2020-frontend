import React from "react";

const Signup = ({ setActive }) => {
  const handleTypeChange = radioEvent => setActive(radioEvent.target.value);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button className="btn-dark" onClick={() => setActive("signupParent")}>
        Sign up as a Parent
      </button>
      <button className="btn-dark" onClick={() => setActive("signupStudio")}>
        Sign up as a Studio
      </button>
    </div>
  );
};
export default Signup;
