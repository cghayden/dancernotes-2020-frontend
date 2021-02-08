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
          // onClick={() => setActive('signupRetail')}
        >
          Coming Soon!
        </button>
      </div>
    </div>
  )
}

export default AboutRetail
