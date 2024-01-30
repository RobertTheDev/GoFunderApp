import { ReactElement } from 'react'
import settingsLinks from '../../../../utils/settingsLinks'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

export default function SettingsMenu(): ReactElement {
  return (
    <div className={styles.menuContainer}>
      <h3>Settings Menu</h3>
      {settingsLinks.map((settingsLink) => {
        return (
          <Link to={settingsLink.path} key={settingsLink.path}>
            {settingsLink.name}
          </Link>
        )
      })}
    </div>
  )
}
