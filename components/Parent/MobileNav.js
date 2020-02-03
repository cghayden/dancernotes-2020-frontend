import React from "react";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import { NavStyles } from "../styles/NavStyles";

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
      <Link href="/parent/notes/routines">
        <a>Notes</a>
      </Link>
      <Link href="/parent/discover">
        <a>Discover</a>
      </Link>
      <Link href="/parent/shop">
        <a>Shop</a>
      </Link>
      <Link href="/parent/account/profile">
        <a>Account</a>
      </Link>
    </NavStyles>
  );
};

export default MobileNav;
