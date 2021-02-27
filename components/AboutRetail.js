import { AboutUl } from './styles/AboutStyles'
import Card from './styles/Card'

const AboutRetail = ({ setActive }) => {
  return (
    <Card>
      <h1>Dancernotes for Retailers</h1>
      <div>
        <AboutUl>
          <li>
            Link up with local studios and enjoy real time information on
            apparel requirements and enrollment numbers
          </li>
          <li>
            <p>Offer discounts and sales directly to parents</p>
          </li>
        </AboutUl>
      </div>
      <div>
        <button
          className='btn-action-secondary'
          // onClick={() => setActive('signupRetail')}
        >
          Coming Soon!
        </button>
      </div>
    </Card>
  )
}

export default AboutRetail
