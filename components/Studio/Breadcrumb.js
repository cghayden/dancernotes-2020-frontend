import styled from 'styled-components'
import { useRouter } from 'next/router'
import Link from 'next/link'
import HomeSvg from '../Icons/HomeSvg'

const BreadcrumbStyles = styled.div`
  display: flex;
  padding: 1rem 0.5rem 0.5rem 0.5rem;
  p {
    padding: 0 0.5rem;
    margin: 0;
  }
  a {
    padding: 0;
    margin: 0;
    text-decoration: underline;
    color: ${(props) => props.theme.indigo6};
  }
`

function Breadcrumb({ page, selection }) {
  const router = useRouter()
  // home > page > selection
  return (
    <BreadcrumbStyles>
      <Link href={'/studio/home'}>
        <a>
          <HomeSvg />
        </a>
      </Link>
      <p>{'>'}</p>
      <Link href={`/studio/${page.toLowerCase()}`}>
        <a>{page}</a>
      </Link>
      <p>{'>'}</p>
      <p>{selection}</p>
    </BreadcrumbStyles>
  )
}

export default Breadcrumb
