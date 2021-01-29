import React, { Component } from 'react'
import Meta from './Meta'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { theme } from './themeVariables'
//adobe font = 1. lato, 2. source-sans-pro, 300,400,700, reg and italic

const GlobalStyle = createGlobalStyle`
 
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    height:100vh; overflow: hidden;
    background-color: ${theme.background};
    margin: 0;
    line-height: 1.25;
    font-family: "Source Sans Pro", "Roboto", -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue;
    ${
      '' /* font-family: "Source Sans Pro", -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue; */
    }
    font-weight: 400;
    color: ${theme.blackText};
  }
  
  h1,
  h2,
  h3,
  h4,
  h5, h6{
    margin: 0rem;
    letter-spacing: .02em;
    color: ${theme.gray8}
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
  h6{
    font-size: 1rem
  } 


  input[type='checkbox']{
  width: auto;
  margin-right: .5rem;
}

.sr-only {
  border: 0; 
  clip: rect(0 0 0 0); 
  -webkit-clip-path: polygon(0px 0px, 0px 0px, 0px 0px);
  clip-path: polygon(0px 0px, 0px 0px, 0px 0px);
  height: 1px; 
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
}

//-------BUTTON AND ANCHOR STYLES ----------------//

// --- Default ---
  a, button {
    appearance: none;
    border: 0;
    border-radius: 5px;
    background: transparent;
    color: inherit;
    min-width:100px;
    font: inherit;
    padding: .5rem 1rem;
    cursor: pointer;
    margin: 0;
    //anchors only:
    text-decoration: none;
    text-align:center;
    //if using a span inside button or a, this will keep it centered:
    display: inline-flex;
    align-items: center;
    justify-content: center;
    // for tansitions to outlined:
    border: 2px solid transparent;

  :disabled {
      cursor: not-allowed;
  }
&.btn-icon{
  min-width:initial;
  text-align:center;
  /* padding: .25rem .5rem 0; */
}
&.link-item{
    border-radius: 0;
    margin: 0;
    padding: 10px 0.5rem 0.5rem 0.5rem;
    text-transform: uppercase;

    &:hover {
      color: hsl(200, 95%, 95%);
      background: ${(props) => props.theme.indigo5};
    }
  }

  :hover {
    background-color: inherit;
    color: inherit;
    transition: background-color .25s ease-out;
  }


  &.btn-danger {
    background-color: ${theme.red6};
    color: ${theme.red0};
    :hover {
      background-color: ${theme.red7}; 
      color: ${theme.red0};
    }
  }
  &.btn-danger-outline{
    background-color: none;
    color: ${theme.red6};
    border: 1px solid ${theme.red6};
    :hover {
      background-color: ${theme.red7};
      color: ${theme.red0};
    }
  }
  &.btn-danger-textOnly{
    color: ${theme.red7};
    border: none;
    outline: none;
    :hover{
      color: ${theme.red6};
      background: none;
    }
  }
  &.btn-action-secondary{
    background-color: ${theme.indigo1};
    color: ${theme.indigo9};
    :hover {
        background-color: ${theme.indigo2};
    } 
  }
  &.btn-action-secondary-outline{
      background-color: none;
      color: ${theme.indigo9};
      border: 1px solid ${theme.indigo9};
      :hover {
        /* background-color: ${theme.indigo9}; */
      color: ${theme.indigo7};
      } 
  }
  &.btn-action-primary{
      background-color: ${theme.indigo6};
      color: hsl(200,95%,95%);
      :hover {
      background-color: ${theme.indigo5};
      }
      :focus {
      outline: 1px solid ${theme.indigo2};
      }   
    }
    &.btn-action-primary-outline{
      background-color: none;
      color: ${theme.indigo6};
      border: 1px solid ${theme.indigo6};
     :hover {
      background-color: ${theme.indigo5};
      color: ${theme.indigo0};
      }
    }
    &.btn-comp-outline{
      background-color: none;
      color: ${theme.green8};
      border: 1px solid ${theme.green8};
      :hover {
        border: none;
      background-color: ${theme.green6};
      color: white;
      } 
    }
    &.btn-small{
      font-size: 14px;
      padding: .25rem .5rem;
      min-width:80px;
    }
 
  &.btn-action-primary-textOnly{
    color: ${theme.indigo6};
    border: none;
    outline: none;
    :hover{
      color: ${theme.indigo5};
      background: none;
    }
  }
  
  &.btn-nav{
    border-radius: 0;
    margin: 0;
    padding: 10px 0.5rem 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: left;
    text-transform: uppercase;

    &:hover {
      color: hsl(200, 95%, 95%);
      background: ${(props) => props.theme.indigo5};
    }
  }
  &.btn-selectionOption{
    border-radius: 0;
    margin: 0;
    padding: 10px 0.5rem 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;

    &:hover {
      color: hsl(200, 95%, 95%);
      background: ${(props) => props.theme.indigo5};
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
    color: ${theme.green8};
    font-weight: bold;
  }
  .activeStudioNav{
      background: ${theme.indigo6};
      color: hsl(200, 95%,95%);
      :focus{
        outline: 2px solid ${theme.indigo2};
        background: ${theme.indigo6};
        box-shadow: 1px -1px 3px 2px ${theme.indigo2}, 1px 1px 3px 2px ${
  theme.indigo2
};      
        ${'' /* box-shadow: 1px 1px 3px 2px ${theme.indigo2};       */}
        color: hsl(200, 95%,95%);

      }
      }

  @media (min-width: ${theme.largeScreen}) {
    .hideOnMobile {
      display: block;
    }
    .hideOnDesktop {
      display: none;
    }
  }
  .message {
    margin-bottom: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 14px;
  }
  .py1{
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

main {
  margin-top: ${(props) => props.theme.mobileStatusBarHeight};
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
  align-items: center;
  @media (min-width: ${(props) => props.theme.largeScreen}) {
    margin-top: ${(props) => props.theme.navHeight};
    padding-top: 1rem;
  }
}
.subHeading{
  font-size: 12px;
  ${'' /* font-weight: normal; */}
}
.left{
  text-align: left;
}

.react-datepicker-popper{
  transform: translate3d(50%, 190%, 0px)
}

/* ~~~~~~~~~~~~~MEDIA QUERY CLASSES ~~~~~~~~~~~~~~~~~~ */

.hide-ltMedium{
  @media screen and (max-width: ${(props) => props.theme.mediumScreen}) {
    display: none;
  }
}
.hide-ltLarge{
  @media screen and (max-width: ${(props) => props.theme.largeScreen}) {
    display: none;
  }
}

.hide-gtLarge {
  @media screen and (min-width: ${(props) => props.theme.largeScreen}) {
    display: none;
  }
}
.hide-gtMedium {
  @media screen and (min-width: ${(props) => props.theme.mediumScreen}) {
    display: none;
  }
}

`

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
    )
  }
}
