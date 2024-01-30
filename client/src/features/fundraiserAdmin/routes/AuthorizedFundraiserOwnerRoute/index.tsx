import { Navigate, useParams } from 'react-router-dom';
import { ReactElement, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { checkFundraiserOwnerByFundraiserSlug } from '../../../fundraiserOwner/service/fundraiserOwner.service';

function AuthorizedFundraiserOwnerRoute({ children }: { children: ReactNode }): ReactElement {
  const { fundraiserId } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ['checkFundraiserOwnerData'],
    queryFn: () => checkFundraiserOwnerByFundraiserSlug(String(fundraiserId))
  });

  if (isPending) return <p>Loading...</p>;

  if (data === null || data?.data.data === null || error) {
    return <Navigate to={'/unauthorized'} />;
  }

  return <>{children}</>;
}

export default AuthorizedFundraiserOwnerRoute;
