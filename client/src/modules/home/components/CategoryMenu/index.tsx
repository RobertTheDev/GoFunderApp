import { ReactElement } from "react";
import { Link } from "react-router-dom";

interface ICategoryLink {
  id: string;
  image: { alt: string; url: string };
  name: string;
  slug: string;
}

const categoryLinks: ICategoryLink[] = [
  {
    id: "1",
    image: { alt: "", url: "" },
    name: "Animals and pets",
    slug: "animals-and-pets",
  },
  {
    id: "2",
    image: { alt: "", url: "" },
    name: "Art and culture",
    slug: "art-and-culture",
  },
  {
    id: "3",
    image: { alt: "", url: "" },
    name: "Education",
    slug: "education",
  },
  {
    id: "4",
    image: { alt: "", url: "" },
    name: "International aid",
    slug: "international-aid",
  },
  {
    id: "5",
    image: { alt: "", url: "" },
    name: "Disability",
    slug: "disability",
  },
  {
    id: "6",
    image: { alt: "", url: "" },
    name: "Local community",
    slug: "local-community",
  },
  { id: "7", image: { alt: "", url: "" }, name: "Sports", slug: "sports" },
  {
    id: "8",
    image: { alt: "", url: "" },
    name: "Health and medical",
    slug: "health-and-medical",
  },
];

function CategoryLink(categoryLink: ICategoryLink): ReactElement {
  return (
    <Link to={`/categories/${categoryLink.slug}`} key={categoryLink.id}>
      <p>{categoryLink.name}</p>
    </Link>
  );
}

export default function CategoryMenu(): ReactElement {
  return (
    <div>
      <p>Category Menu</p>
      {categoryLinks.map((categoryLink: ICategoryLink) => {
        return <CategoryLink {...categoryLink} />;
      })}
    </div>
  );
}
