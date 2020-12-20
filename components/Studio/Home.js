import styled from 'styled-components'
import Link from 'next/link'

const HomeStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
  padding: 0 1.25rem;
  a {
    display: flex;
    justify-content: center;
  }
  @media screen and (max-width: ${(props) => props.theme.mediumScreen}) {
  }
`
const PageTileLink = styled.div`
  font-size: 1rem;
  width: 100%;
  max-width: 350px;
  height: 100px;
  background: #19216c;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  h2 {
    color: inherit;
    font-size: 1.2em;
  }

  p {
    font-size: 1.4em;
  }

  @media screen and (max-width: ${(props) => props.theme.mediumScreen}) {
    font-size: 0.85rem;
    height: 80px;
  }
`
function Home({ studio }) {
  const pages = [
    { text: 'dance classes', key: 'danceClasses', link: 'classes' },
    { text: 'dancers', key: 'dancers', link: 'dancers' },
    { text: 'events', key: 'events', link: 'events' },
    { text: 'hairstyles', key: 'hairStyles', link: 'hairstyles' },
    { text: 'makeup', key: 'makeupSets', link: 'makeup' },
  ]

  return (
    <HomeStyles>
      {pages.map((page) => {
        const key = page.key
        const length = studio[key].length
        return (
          <Link key={page.key} href={`/studio/${page.link}`}>
            <a>
              <PageTileLink>
                <h2>{page.text.toUpperCase()}</h2>
                <p>{length}</p>
              </PageTileLink>
            </a>
          </Link>
        )
      })}
    </HomeStyles>
  )
}

export default Home
