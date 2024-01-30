import { ReactElement } from 'react';
import IFundraiser from '../../../../interfaces/Fundraiser';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export default function OwnedFundraiserCard({
  fundraiser
}: {
  fundraiser: IFundraiser;
}): ReactElement {
  return (
    <Link className={styles.cardContainer} to={`/fundraisers/${fundraiser.slug}/admin`}>
      <div className={styles.cardImageContainer}>
        <img className={styles.cardImage} src={fundraiser.imageUrl} alt="ddd" />
      </div>
      <div className={styles.cardContentContainer}>
        <p className={styles.cardTitleText}>{fundraiser.name}</p>

        <p>
          £{fundraiser.totalRaised.toLocaleString()} raised of £{fundraiser.target.toLocaleString()}{' '}
          target
        </p>

        <div className={styles.cardProgressBarContainer}>
          <svg
            className={styles.cardProgressBar}
            height={'100%'}
            width={`${(fundraiser.totalRaised / fundraiser.target) * 100}%`}
          />
        </div>

        <p>
          {fundraiser.totalDonations} {fundraiser.totalDonations === 1 ? 'donation' : 'donations'}
        </p>
      </div>
    </Link>
  );
}
