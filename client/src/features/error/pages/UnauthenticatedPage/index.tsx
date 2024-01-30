import { ReactElement } from 'react'
import Seo from '../../../common/Seo'

export default function UnauthenticatedPage(): ReactElement {
  return (
    <>
      <Seo
        title='Unauthenticated'
        description={`
        The page you tried to access returned a 401 error 
        meaning that you are not authenticated. 
        Sign in or sign up to your account and 
        then try accessing the page again.
        `}
      />

      <div>
        <p>Unauthenticated.</p>
      </div>
    </>
  )
}
