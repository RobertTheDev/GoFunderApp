import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

interface ICategoryLink {
  id: string;
  image: { alt: string; url: string };
  name: string;
}

const categoryLinks: ICategoryLink[] = [
  {
    id: '1',
    image: {
      alt: '',
      url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    name: 'Animals and pets'
  },
  {
    id: '2',
    image: {
      alt: '',
      url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    name: 'Art and culture'
  },
  {
    id: '3',
    image: {
      alt: '',
      url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    name: 'Education'
  },
  {
    id: '4',
    image: {
      alt: '',
      url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    name: 'International aid'
  },
  {
    id: '5',
    image: {
      alt: '',
      url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    name: 'Disability'
  },
  {
    id: '6',
    image: {
      alt: '',
      url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    name: 'Local community'
  },
  {
    id: '7',
    image: {
      alt: '',
      url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    name: 'Sports'
  },
  {
    id: '8',
    image: {
      alt: '',
      url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    name: 'Health and medical'
  }
];

function CategoryLink(categoryLink: ICategoryLink): ReactElement {
  const navigate = useNavigate();
  return (
    <div
      className={styles.categoryLinkContainer}
      onClick={() => {
        navigate(`/fundraisers?category=${categoryLink.name}`);
      }}
      key={categoryLink.id}
    >
      <div className={styles.categoryLinkImageContainer}>
        <img
          className={styles.categoryLinkImage}
          src={categoryLink.image.url}
          alt={categoryLink.image.alt}
        />
      </div>
      <p>{categoryLink.name}</p>
    </div>
  );
}

export default function CategoryMenu(): ReactElement {
  return (
    <div className={styles.menuContainer}>
      <p>Category Menu</p>
      <div className={styles.menuLinksContainer}>
        {categoryLinks.map((categoryLink: ICategoryLink) => {
          return <CategoryLink {...categoryLink} />;
        })}
      </div>
    </div>
  );
}
