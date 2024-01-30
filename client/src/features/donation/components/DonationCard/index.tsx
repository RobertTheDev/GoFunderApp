import { ReactElement } from 'react'
import IDonation from '../../../../interfaces/Donation'
import { format } from 'date-fns'
import styles from './styles.module.scss'

export default function DonationCard({
  donation,
}: {
  donation: IDonation
}): ReactElement {
  return (
    <div className={styles.cardContainer}>
      <div>
        <img
          src={donation.fundraiser?.imageUrl}
          alt={donation.fundraiser?.name}
        />
      </div>
      <div>
        <p>{donation.fundraiser?.name}</p>
        <p>£{donation.amount.toLocaleString()}</p>
        <p>&quot;{donation.message}&quot;</p>
        <p>{format(donation.createdAt, 'dd MMMM yyyy')}</p>
      </div>
    </div>
  )
}
