import { ReactElement } from 'react'
import CreateFundraiserForm from '../../components/CreateFundraiserForm'
import Seo from '../../../common/Seo'
import styles from './styles.module.scss'
import FundraiserPreview from '../../components/FundraiserPreview'

export default function CreateFundraiserPage(): ReactElement {
  return (
    <div className={styles.pageContainer}>
      <Seo
        title='Create Fundraiser'
        description={`
         This page allows you to create and set up a fundraiser
         on GoFunder using the create 
         fundraiser form. You can add data 
         including name, target, and image.
      `}
      />
      <p>Create Fundraiser</p>
      <CreateFundraiserForm />
      <FundraiserPreview />
    </div>
  )
}
