import styled from 'styled-components'
import DeleteDanceClass from './DeleteDanceClass'
import Router from 'next/router'

const SCDStyles = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;

  button[type='submit'],
  input[type='submit'] {
    width: 50%;
    max-width: 300px;
    padding: 0.5rem;
    &[aria-busy='true']::after {
      background-size: 50% auto;
      animation: ${(props) =>
        props.theme.loading ? ` 1s linear infinite` : null};
    }
  }
`

function SaveCancelDelete({ formId, loading, disableButton, danceClassId }) {
  return (
    <SCDStyles>
      <button
        className='btn-action-primary'
        type='submit'
        disabled={disableButton}
        form={formId}
      >
        SAV
        {loading ? 'ING ' : 'E '} Class
      </button>
      <div>
        <button
          className='btn-action-secondary'
          type='button'
          onClick={() => Router.back()}
        >
          Cancel
        </button>
        <DeleteDanceClass id={danceClassId} />
      </div>
    </SCDStyles>
  )
}

export default SaveCancelDelete
