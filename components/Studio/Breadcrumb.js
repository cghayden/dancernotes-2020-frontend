import styled from 'styled-components'
import Link from 'next/link'
import HomeSvg from '../Icons/HomeSvg'
import PlusSvg from '../PlusSvg'

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

const CreateLinkDiv = styled.div`
  margin-left: auto;
`

function Breadcrumb({ page = '', selection, createLink }) {
  // home > page > selection
  return (
    <div className='hide-gtMedium'>
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
        {selection && (
          <>
            <p>{'>'}</p>
            <p>{selection}</p>
          </>
        )}
        {createLink && (
          <CreateLinkDiv>
            <Link href={`/studio/dancers/${createLink}`}>
              <a>
                <PlusSvg />
              </a>
            </Link>
          </CreateLinkDiv>
        )}
      </BreadcrumbStyles>
    </div>
  )
}

export default Breadcrumb
