import { ReactElement } from 'react'
import Seo from '../../../common/Seo'
import Banner from '../../components/Banner'
import CategoryFundraiserSection from '../../components/CategoryFundraiserSection'
import CategoryMenu from '../../components/CategoryMenu'

export default function HomePage(): ReactElement {
  return (
    <>
      <Seo
        title='Online Fundraising Platform'
        description={`
        GoFunder is an online fundraising platform allowing 
        users to raise funds for the causes they care about. 
        Users can also donate and support fundraisers on GoFunder.
      `}
      />
      <div>
        <Banner />
        <CategoryFundraiserSection category='animals-and-pets' />
        <CategoryFundraiserSection category='art-and-culture' />
        <CategoryFundraiserSection category='disability' />
        <CategoryFundraiserSection category='education' />
        <CategoryMenu />
        <CategoryFundraiserSection category={'health-and-medical'} />
        <CategoryFundraiserSection category={'international-aid'} />
        <CategoryFundraiserSection category={'local-community'} />
        <CategoryFundraiserSection category='sports' />
      </div>
    </>
  )
}
