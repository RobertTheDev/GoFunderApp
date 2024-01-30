import { ReactElement } from 'react'
import Seo from '../../../common/Seo'

export default function NotFoundPage(): ReactElement {
  return (
    <>
      <Seo
        title='404 - Not Found'
        description={`
  The page you are looking for has returned a 404 error. 
  This happens when a page you are looking for no longer 
  exists or because of an incorrect page link.
  `}
      />
      <div>
        <p>404 - Page Not Found.</p>
      </div>
    </>
  )
}
