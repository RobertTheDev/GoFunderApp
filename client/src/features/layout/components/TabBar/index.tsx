import { ReactElement } from 'react'
import styles from './styles.module.scss'
import tabBarLinks from './tabBarLinks'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function TabBar(): ReactElement {
  const navigate = useNavigate()

  const { pathname } = useLocation()

  return (
    <div className={styles.tabBarContainer}>
      {tabBarLinks.map((tabBarLink) => {
        return (
          <motion.button
            initial={{ scale: 1 }}
            animate={{ scale: 0.9 }}
            key={tabBarLink.name}
            onClick={() => navigate(tabBarLink.path)}
            className={
              tabBarLink.path === pathname
                ? styles.tabBarButtonActive
                : styles.tabBarButton
            }
          >
            {tabBarLink.icon}
            <p>{tabBarLink.name}</p>
          </motion.button>
        )
      })}
    </div>
  )
}
