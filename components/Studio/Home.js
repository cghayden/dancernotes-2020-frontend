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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  h2 {
    color: inherit;
    font-size: 1.3rem;
  }
  a {
    color: white;
  }
  p {
    font-size: 1.5rem;
  }
`
function Home({ studio }) {
  console.log('studio', studio)
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
              <PageTile>
                <h2>{page.text.toUpperCase()}</h2>
                <p>{length}</p>
              </PageTile>
            </a>
          </Link>
        )
      })}
    </HomeStyles>
  )
}

export default Home
