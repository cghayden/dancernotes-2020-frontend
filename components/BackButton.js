import React from "react";
import Router from "next/router";

const BackButton = ({ text, classNames }) => {
  return (
    <button role="button" className={classNames} onClick={() => Router.back()}>
      {text}
    </button>
  );
};

export default BackButton;
