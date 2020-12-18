import React from 'react'
// import SignupRetail from "./SignupRetail";

const AboutRetail = ({ setActive }) => {
  return (
    <div>
      <h1>Dancernotes for Retail</h1>
      <div className='aboutBody'>
        Link up with local studios and enjoy real time information on their
        apparel requirements and enrollment numbers
      </div>
      <div>Offer discounts and sales directly to parents</div>
      <div>
        <button
          className='btn-action-secondary'
          onClick={() => setActive('signupRetail')}
        >
          Try dancernotes
        </button>
      </div>
    </div>
  )
}

export default AboutRetail
