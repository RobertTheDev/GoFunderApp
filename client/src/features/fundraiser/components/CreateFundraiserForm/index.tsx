import { ReactElement } from 'react';
import useCreateFundraiser from './useCreateFundraiser';
import styles from './styles.module.scss';
import categoryOptions from '../../../../utils/categoryOptions';

export default function CreateFundraiserForm(): ReactElement {
  const { errors, handleCreateFundraiser, message, register } = useCreateFundraiser();

  return (
    <form className={styles.formContainer} onSubmit={handleCreateFundraiser}>
      <div className={styles.formInputContainer}>
        <input
          className={styles.formInput}
          {...register('name')}
          type="text"
          name="name"
          placeholder="Name"
        />
        {errors.name?.message && <p>{errors.name?.message}</p>}
      </div>
      <div className={styles.formInputContainer}>
        <select className={styles.formInput} {...register('category')} name="category">
          {categoryOptions.map((categoryOption) => {
            return (
              <option key={categoryOption.path} value={categoryOption.path}>
                {categoryOption.name}
              </option>
            );
          })}
        </select>
        {errors.category?.message && <p>{errors.category?.message}</p>}
      </div>
      <div className={styles.formInputContainer}>
        <input
          className={styles.formInput}
          {...register('deadlineDate', { valueAsDate: true })}
          type="datetime-local"
          name="deadlineDate"
          placeholder="Deadline Date"
        />
        {errors.deadlineDate?.message && <p>{errors.deadlineDate?.message}</p>}
      </div>
      <div className={styles.formInputContainer}>
        <textarea
          className={styles.formInput}
          {...register('description')}
          name="description"
          placeholder="Description"
        />
        {errors.description?.message && <p>{errors.description?.message}</p>}
      </div>
      <div className={styles.formInputContainer}>
        <input
          className={styles.formInput}
          {...register('headline')}
          type="text"
          name="headline"
          placeholder="Headline"
        />
        {errors.headline?.message && <p>{errors.headline?.message}</p>}
      </div>
      <div className={styles.formInputContainer}>
        <input
          className={styles.formInput}
          {...register('imageUrl')}
          type="url"
          name="imageUrl"
          placeholder="Image"
        />
        {errors.imageUrl?.message && <p>{errors.imageUrl?.message}</p>}
      </div>
      <div className={styles.formInputContainer}>
        <input
          className={styles.formInput}
          {...register('target', { valueAsNumber: true })}
          type="number"
          name="target"
          placeholder="Target"
        />
        {errors.target?.message && <p>{errors.target?.message}</p>}
      </div>
      {message && <p>{message.content}</p>}
      <div className={styles.formSubmitButtonContainer}>
        <button className={styles.formSubmitButton} type="submit">
          Create Fundraiser
        </button>
      </div>
    </form>
  );
}
