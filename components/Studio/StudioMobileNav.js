import React from "react";
import Link from "next/link";
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
    <Link href="classes">
      <a>Classes</a>
    </Link>
    <Link href="dancers">
      <a>Dancers</a>
    </Link>
    <Link href="account">
      <a>Account</a>
    </Link>
    <RequestsNavLink />
  </NavStyles>
);

export default StudioMobileNav;
