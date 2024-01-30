import { ReactElement } from 'react';
import Seo from '../../../common/Seo';
import { useQuery } from '@tanstack/react-query';
import { getFundraiserOwnersByAuthenticatedUser } from '../../service/fundraiserOwner.service';
import styles from './styles.module.scss';
import OwnedFundraiserCard from '../../components/OwnedFundraiserCard';

export default function OwnedFundraisersPage(): ReactElement {
  const { isPending, error, data } = useQuery({
    queryKey: ['getFundraisersData'],
    queryFn: getFundraiserOwnersByAuthenticatedUser
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: + {error.message}</p>;

  return (
    <>
      <Seo
        title="Owned Fundraisers"
        description={`
      The fundraisers you own and have set up will be 
      displayed on this page. The page links you to the 
      fundraiser administrative pages allowing 
      you to manage and update data.
      `}
      />
      <div className={styles.pageContainer}>
        <h2>Owned Fundraisers</h2>
        <div className={styles.ownedFundraiserCardsContainer}>
          {data.data.data.map((ownedFundraiser) => {
            return (
              <OwnedFundraiserCard
                key={ownedFundraiser.id}
                fundraiser={ownedFundraiser.fundraiser}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
