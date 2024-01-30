export interface ICategoryLink {
  id: string
  image: { alt: string; url: string }
  name: string
}

const categoryLinks: ICategoryLink[] = [
  {
    id: '1',
    image: {
      alt: '',
      url: 'https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    name: 'Animals and pets',
  },
  {
    id: '2',
    image: {
      alt: '',
      url: 'https://images.unsplash.com/photo-1611879531844-24b7ddf40b26?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    name: 'Art and culture',
  },
  {
    id: '3',
    image: {
      alt: '',
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    name: 'Education',
  },
  {
    id: '4',
    image: {
      alt: '',
      url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    name: 'International aid',
  },
  {
    id: '5',
    image: {
      alt: '',
      url: 'https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    name: 'Disability',
  },
  {
    id: '6',
    image: {
      alt: '',
      url: 'https://images.unsplash.com/photo-1461280360983-bd93eaa5051b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    name: 'Local community',
  },
  {
    id: '7',
    image: {
      alt: '',
      url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    name: 'Sports',
  },
  {
    id: '8',
    image: {
      alt: '',
      url: 'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    name: 'Health and medical',
  },
]

export default categoryLinks
