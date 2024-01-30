import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import { ICategoryLink } from '../../../../utils/categoryLinks'

export default function CategoryLink(
  categoryLink: ICategoryLink,
): ReactElement {
  return (
    <Link
      to={`/fundraisers?category=${categoryLink.name}`}
      className={styles.categoryLinkContainer}
      key={categoryLink.id}
    >
      <div className={styles.categoryLinkImageContainer}>
        <img
          className={styles.categoryLinkImage}
          src={categoryLink.image.url}
          alt={categoryLink.image.alt}
        />
      </div>
      <div className={styles.categoryLinkContentContainer}>
        <p>{categoryLink.name}</p>
      </div>
    </Link>
  )
}
