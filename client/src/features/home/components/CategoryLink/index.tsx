import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import { ICategoryLink } from '../../../../utils/categoryLinks'

export default function CategoryLink(
  categoryLink: ICategoryLink,
): ReactElement {
  const navigate = useNavigate()
  return (
    <button
      className={styles.categoryLinkContainer}
      onClick={() => {
        navigate(`/fundraisers?category=${categoryLink.name}`)
      }}
      key={categoryLink.id}
    >
      <div className={styles.categoryLinkImageContainer}>
        <img
          className={styles.categoryLinkImage}
          src={categoryLink.image.url}
          alt={categoryLink.image.alt}
        />
      </div>
      <p>{categoryLink.name}</p>
    </button>
  )
}
