import { ReactElement } from 'react'
import styles from './styles.module.scss'
import categoryLinks, { ICategoryLink } from '../../../../utils/categoryLinks'
import CategoryLink from '../CategoryLink'

export default function CategoryMenu(): ReactElement {
  return (
    <div className={styles.menuContainer}>
      <h3 className={styles.menuTitle}>Categories</h3>
      <div className={styles.menuLinksContainer}>
        {categoryLinks.map((categoryLink: ICategoryLink) => {
          return <CategoryLink {...categoryLink} key={categoryLink.id} />
        })}
      </div>
    </div>
  )
}
