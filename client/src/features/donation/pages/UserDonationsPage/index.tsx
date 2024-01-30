import { ReactElement } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getDonationsByCurrentUser } from '../../service/donation.service'
import DonationCard from '../../components/DonationCard'
import styles from './styles.module.scss'
import Seo from '../../../common/Seo'

export default function UserDonationsPage(): ReactElement {
  const { isPending, error, data } = useQuery({
    queryKey: ['getDonationsByCurrentUserData'],
    queryFn: getDonationsByCurrentUser,
  })

  if (isPending) return <p>Loading...</p>

  if (error) return <p>An error has occurred: + {error.message}</p>

  return (
    <>
      <Seo
        title={'My Donations'}
        description={`
       The donations you have made will appear here. 
       Keep track of your kind philanthropic efforts to the fundraisers 
       and causes you care about on GoFunder.
       `}
      />
      <div className={styles.pageContainer}>
        <h1>My Donations</h1>
        <div>
          {data.data.data.length > 0 ? (
            <div className={styles.cardsGridContainer}>
              {data.data.data.map((donation) => {
                return <DonationCard key={donation.id} donation={donation} />
              })}
            </div>
          ) : (
            <p>You have not made any donations yet.</p>
          )}
        </div>
      </div>
    </>
  )
}
