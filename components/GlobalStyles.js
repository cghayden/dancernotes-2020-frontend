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
    font-family: "Open Sans",'source-sans-pro';
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

  a, button {
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
    background-color: ${theme.newBlue[10].hsl};
    color: ${theme.newBlue[90].hsl};
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

  &.landingPage{
    font-size: 1.5rem;
    width: 200px;
    height: 50px;
  }
  &.pageAction{
    color: ${theme.indigo8};
    border: none;
    outline: none;
    :hover{
      color: ${theme.indigo9};
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

  /* mobile-first */
  .content {
    text-align: center;
    max-width: 800px;
    border: 1px solid black;
    min-height: 90vh;
    width: 94vw;
    background-color:inherit;
    margin: 90px auto 0 auto;
    padding: 1rem 0rem;
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
