const categories = [
  {
    id: 'plants',
    name: 'Plants',
    tags: ['products', 'inspirations'],
    count: 147,
    image: require('../data/images/10.jpg'),
  },
  {
    id: 'seeds',
    name: 'Seeds',
    tags: ['products', 'shop'],
    count: 16,
    image: require('../data/images/10.jpg'),
  },
  {
    id: 'flowers',
    name: 'Flowers',
    tags: ['products', 'inspirations'],
    count: 68,
    image: require('../data/images/10.jpg'),
  },
  {
    id: 'sprayers',
    name: 'Sprayers',
    tags: ['products', 'shop'],
    count: 17,
    image: require('../data/images/10.jpg'),
  },
  {
    id: 'pots',
    name: 'Pots',
    tags: ['products', 'shop'],
    count: 47,
    image: require('../data/images/10.jpg'),
  },
  {
    id: 'fertilizers',
    name: 'fertilizers',
    tags: ['products', 'shop'],
    count: 47,
    image: require('../data/images/10.jpg'),
  },
];

const products = [
  {
    id: 1, 
    name: '16 Best Plants That Thrive In Your Bedroom',
    description: 'Bedrooms deserve to be decorated with lush greenery just like every other room in the house – but it can be tricky to find a plant that thrives here. Low light, high humidity and warm temperatures mean only certain houseplants will flourish.',
    tags: ['Interior', '27 m²', 'Ideas'],
    images: [
      require('../data/images/10.jpg'),
      require('../data/images/10.jpg'),
      require('../data/images/10.jpg'),
      require('../data/images/10.jpg'),
      require('../data/images/10.jpg'),
      require('../data/images/10.jpg'),
      require('../data/images/10.jpg'),
      require('../data/images/10.jpg'),
      require('../data/images/10.jpg'),
    ]
  }
];

const explore = [
  // images
  require('../data/images/10.jpg'),
  require('../data/images/10.jpg'),
  require('../data/images/10.jpg'),
  require('../data/images/10.jpg'),
  require('../data/images/10.jpg'),
  require('../data/images/10.jpg'),
];

const profile = {
  username: 'react-ui-kit',
  location: 'Europe',
  email: 'contact@react-ui-kit.com',
  avatar: require('../data/images/07.jpg'),
  budget: 1000,
  monthly_cap: 5000,
  notifications: true,
  newsletter: false,
};

export {
  categories,
  explore,
  products,
  profile,
}