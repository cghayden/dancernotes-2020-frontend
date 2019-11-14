import React, { Component } from "react";
import cookie from "cookie";
import decode from "jwt-decode";
import LandingPage from "../components/LandingPage";

const Index = props => <LandingPage />;

Index.getInitialProps = function({ res, req }) {
  if (req) {
    // TODO - ERROR HANDLING FOR TOKEN READ ERRORS

    if (req.headers.cookie) {
      const cookies = cookie.parse(req.headers.cookie);
      if (cookies.token) {
        const token = decode(cookies.token);
        if (token.userType === "parent") {
          res.writeHead(302, { Location: `parent/notes/routines` });
        }
        if (token.userType === "studio") {
          res.writeHead(302, { Location: `studio/home` });
        } else {
          res.writeHead(302, { Location: `${token.userType}/home` });
        }
        res.end();
      }
    }
    return { user: "none" };
  }
  return { user: "none" };
};

export default Index;
