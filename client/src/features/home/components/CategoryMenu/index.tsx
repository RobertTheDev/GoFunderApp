import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

interface ICategoryLink {
  id: string;
  image: { alt: string; url: string };
  name: string;
}

const categoryLinks: ICategoryLink[] = [
  {
    id: "1",
    image: { alt: "", url: "" },
    name: "Animals and pets",
  },
  {
    id: "2",
    image: { alt: "", url: "" },
    name: "Art and culture",
  },
  {
    id: "3",
    image: { alt: "", url: "" },
    name: "Education",
  },
  {
    id: "4",
    image: { alt: "", url: "" },
    name: "International aid",
  },
  {
    id: "5",
    image: { alt: "", url: "" },
    name: "Disability",
  },
  {
    id: "6",
    image: { alt: "", url: "" },
    name: "Local community",
  },
  { id: "7", image: { alt: "", url: "" }, name: "Sports" },
  {
    id: "8",
    image: { alt: "", url: "" },
    name: "Health and medical",
  },
];

function CategoryLink(categoryLink: ICategoryLink): ReactElement {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/fundraisers?category=${categoryLink.name}`);
      }}
      key={categoryLink.id}
    >
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
