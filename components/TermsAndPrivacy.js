import { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { PARENT_USER_QUERY } from './Parent/Queries'

const SET_TERMS_AND_PRIVACY = gql`
  mutation SET_TERMS_AND_PRIVACY($agreedToTermsAndPrivacy: DateTime!) {
    setTermsAndPrivacy(agreedToTermsAndPrivacy: $agreedToTermsAndPrivacy) {
      message
    }
  }
`

const TermsOverlay = styled.div`
  position: fixed;
  background: ${(props) => props.theme.gray2};
  height: 300px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100000;
  display: grid;
  place-items: center;
  padding: 0.5rem 0;
  box-shadow: 8px -15px 50px 7px rgba(0, 0, 0, 0.3);
`
const TermsContainer = styled.div`
  /* background: whitesmoke; */
  font-size: 20px;
  color: ${(props) => props.theme.indigo9};
  width: 80%;
  text-align: center;
  display: grid;
  grid-gap: 20px;
  a {
    display: inline-block;
    padding: 0 5px;
    margin: 0;
    text-decoration: underline;
    text-transform: uppercase;
    min-width: initial;
  }
  button {
    color: ${(props) => props.theme.indigo0};
    background-color: ${(props) => props.theme.indigo9};
  }
`

function TermsAndPrivacy() {
  const [hideOverlay, setHideOverlay] = useState(false)
  const [setTermsAndPrivacy, { error, loading }] = useMutation(
    SET_TERMS_AND_PRIVACY,
    {
      variables: {
        agreedToTermsAndPrivacy: new Date(Date.now()),
      },
      refetchQueries: [{ query: PARENT_USER_QUERY }],
    }
  )
  if (hideOverlay) return null
  return (
    <TermsOverlay>
      <TermsContainer>
        <div>
          <p>By continuing to use Dancer Notes, </p>
          <p>you agree to our updated</p>
        </div>
        <div>
          <a
            rel='noreferrer noopener'
            target='_blank'
            href='https://www.websitepolicies.com/policies/view/Xd9syaYo'
          >
            Terms
          </a>
          and
          <a
            rel='noreferrer noopener'
            target='_blank'
            href='https://www.websitepolicies.com/policies/view/Xd9syaYo'
          >
            Privacy Policy
          </a>
        </div>
        <div>
          <button
            type='button'
            onClick={async () => {
              setHideOverlay(true)
              await setTermsAndPrivacy()
            }}
          >
            Ok !
          </button>
        </div>
      </TermsContainer>
    </TermsOverlay>
  )
}

export default TermsAndPrivacy
