import cookie from 'cookie'
import decode from 'jwt-decode'
import NewLandingPage from '../components/NewLandingPage'

const Index = () => <NewLandingPage />

Index.getInitialProps = function ({ res, req }) {
  if (req) {
    // TODO - ERROR HANDLING FOR TOKEN READ ERRORS

    if (req.headers.cookie) {
      const cookies = cookie.parse(req.headers.cookie)
      if (cookies.token) {
        const token = decode(cookies.token)
        if (token.userType === 'parent') {
          res.writeHead(302, { Location: `parent/routines` })
        }
        if (token.userType === 'studio') {
          res.writeHead(302, { Location: `studio/home` })
        } else {
          res.writeHead(302, { Location: `/` })
        }
        res.end()
      }
    }
    return { user: 'none' }
  }
  return { user: 'none' }
}

export default Index
