import styled from 'styled-components'
import Link from 'next/link'

const HomeStyles = styled.div`
  place-content: center;
  place-items: center;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, 200px);
`
const PageTile = styled.div`
  width: 200px;
  height: 200px;
  background: #19216c;
  color: white;
  display: grid;
  place-items: center;
  border-radius: 10px;
  h2 {
    color: inherit;
  }
  a {
    color: white;
  }
`
function Home({ studio }) {
  const pages = ['classes', 'dancers', 'events', 'hairstyles', 'makeup']

  return (
    <HomeStyles>
      {pages.map((page) => (
        <Link href={`/studio/${page}`}>
          <a>
            <PageTile>
              <h2>{page.toUpperCase()}</h2>
            </PageTile>
          </a>
        </Link>
      ))}
    </HomeStyles>
  )
}

export default Home
