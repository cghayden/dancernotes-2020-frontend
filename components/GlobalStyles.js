import React, { Component } from "react";
import Meta from "./Meta";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "./themeVariables";
//adobe font = 1. lato, 2. source-sans-pro, 300,400,700, reg and italic

const GlobalStyle = createGlobalStyle`
 
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    background-color: ${theme.background};
    margin: 0;
    line-height: 1.25;
    font-family: "Source Sans Pro", sans-serif;
    font-weight: 400;
    color: ${theme.blackText};
  }
  
  h1,
  h2,
  h3,
  h4,
  h5{
    margin: 0rem;
    letter-spacing: .02em;
  }

  h1{
    font-size: 1.4rem;
  }
  h2{
    font-size: 1.25rem;
  }
  h3{
    font-size: 1.2rem;
  }
  h4{
    font-size: 1.1rem;
  }
  h5{
    font-size: 1.05rem;
  }


  input[type='checkbox']{
  width: auto;
  margin-right: .5rem;
}
  a, button {
    display:inline-block;
  padding: .5rem 1rem;
  margin: .5rem;
  border: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
  text-decoration: none;
  border-radius: 5px;
  background: transparent;
    :hover {
    background-color: inherit;
    color: inherit;
    transition: background-color .25s ease-out;
    }
    :disabled{
      background-color: ${theme.gray4};
      color: ${theme.gray2};
      cursor: not-allowed;
    }

    &.btn-danger{
      background-color: ${theme.red6};
      color: ${theme.red0};
      :hover {
      background-color: ${theme.red7}; 
      color: ${theme.red0};
      }
    }
    &.btn-danger-outline{
      background-color: none;
      color: ${theme.red7};
      border: 1px solid ${theme.red7};
      :hover {
        background-color: ${theme.red6};
      color: ${theme.red0};
      }
    }

    &.btn-action-primary{
      background-color: ${theme.indigo1};
      color: ${theme.indigo9};
      :hover {
        background-color: ${theme.indigo9};
      } 
      :disabled{
      background-color: ${theme.gray3};
      color: ${theme.gray9};
      cursor: not-allowed;
    }
  }
  &.btn-action-primary-outline{
      background-color: none;
      color: ${theme.indigo8};
      border: 1px solid ${theme.indigo8};
      :hover {
        background-color: ${theme.indigo8};
      color: ${theme.indigo0};
      } 
      :disabled{
      background-color: ${theme.gray3};
      color: ${theme.gray9};
      cursor: not-allowed;
    }
  }
  &.btn-action-secondary{
      background-color: ${theme.indigo5};
      color: ${theme.indigo0};
      :hover {
      background-color: ${theme.indigo6};
      } 
      :disabled{
      background-color: ${theme.gray4};
      color: ${theme.gray2};
      cursor: not-allowed;
    }
    }
    &.btn-action-secondary-outline{
      background-color: none;
      color: ${theme.indigo5};
      border: 1px solid ${theme.indigo5};
    } :hover {
      background-color: ${theme.indigo5};
      color: ${theme.indigo0};
    }

    &.btn-small{
      font-size: 14px;
      padding: .25rem .75rem;
    }

  &.landingPage{
    font-size: 1.5rem;
    width: 200px;
    height: 50px;
  }
  &.textOnly-primary-action{
    border-radius: 0;
    color: ${theme.indigo8};
    border: none;
    outline: none;
    :hover{
      color: ${theme.indigo6};
      background: none;
    }
  }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  p {
    margin: 0;
  }

.mobileHeader{
  padding-bottom: 1rem;
}

.hideOnMobile {
    display: none;
  }
  .hideOnDesktop {
    display: block;
  }

  .active {
    color: ${props => props.theme.green8};
    font-weight: bold;
  }

  @media (min-width: ${props => props.theme.largeScreen}) {
    .hideOnMobile {
      display: block;
    }
    .hideOnDesktop {
      display: none;
    }
  }

`;

export default class GlobalStyles extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <>
          <Meta />
          <GlobalStyle />
          {this.props.children}
        </>
      </ThemeProvider>
    );
  }
}

// :global(body) {
//   overflow: hidden;
//             }
