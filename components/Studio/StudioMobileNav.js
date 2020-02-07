import React from "react";
import StyledLink from "../StyledLink";
import Router from "next/router";
import NProgress from "nprogress";
import { NavStyles } from "../styles/NavStyles";
import RequestsNavLink from "./RequestsNavLink";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const StudioMobileNav = () => (
  <NavStyles>
    <StyledLink activeClassName="active" href="home">
      <a>Home</a>
    </StyledLink>
    <StyledLink activeClassName="active" href="classes">
      <a>Classes</a>
    </StyledLink>
    <StyledLink activeClassName="active" href="dancers">
      <a>Dancers</a>
    </StyledLink>
    <StyledLink activeClassName="active" href="account">
      <a>Account</a>
    </StyledLink>
    <RequestsNavLink />
  </NavStyles>
);

export default StudioMobileNav;
