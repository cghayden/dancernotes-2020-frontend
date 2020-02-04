import React from "react";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import { NavStyles } from "../styles/NavStyles";
import StyledLink from "../StyledLink";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const MobileNav = () => {
  return (
    <NavStyles>
      <StyledLink activeClassName="active" href="/parent/notes/routines">
        <a>Notes</a>
      </StyledLink>
      <StyledLink activeClassName="active" href="/parent/discover">
        <a>Discover</a>
      </StyledLink>
      <StyledLink activeClassName="active" href="/parent/shop">
        <a>Shop</a>
      </StyledLink>
      <StyledLink activeClassName="active" href="/parent/account/profile">
        <a>Account</a>
      </StyledLink>
    </NavStyles>
  );
};

export default MobileNav;
