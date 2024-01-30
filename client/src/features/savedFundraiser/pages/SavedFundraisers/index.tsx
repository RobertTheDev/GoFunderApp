import { ReactElement } from 'react'
import Seo from '../../../common/Seo'
import { useQuery } from '@tanstack/react-query'
import { getSavedFundraisers } from '../../service/savedFundraiser.service'
import FundraiserCard from '../../../fundraiser/components/FundraiserCard'
import styles from './styles.module.scss'

export default function SavedFundraisersPage(): ReactElement {
  const { isPending, error, data } = useQuery({
    queryKey: ['getSavedFundraisersData'],
    queryFn: getSavedFundraisers,
  })

  if (isPending) return <p>Loading...</p>

  if (error) return <p>An error has occurred: + {error.message}</p>

  return (
    <>
      <Seo
        title='Saved Fundraisers'
        description={`
        This page lists all the fundraisers you have saved on GoFunder. 
        You can manage your saved fundraisers by using the provided 
        save fundraiser button.
      `}
      />
      <div className={styles.pageContainer}>
        <h2>Saved Fundraisers</h2>
        <div className={styles.savedFundraiserCardsContainer}>
          {data.data.data.length > 0 ? (
            data.data.data.map((savedFundraiser) => {
              return (
                <FundraiserCard
                  key={savedFundraiser.id}
                  fundraiser={savedFundraiser.fundraiser}
                />
              )
            })
          ) : (
            <p>You have not saved any fundraisers yet.</p>
          )}
        </div>
      </div>
    </>
  )
}
