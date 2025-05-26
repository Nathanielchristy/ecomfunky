export interface Product {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 101,
    name: "Classic Oxford Shirt",
    categoryId: 3,
    price: 29.99,
    image: '/images/oxford-shirt.jpg',
    description: 'A timeless Oxford shirt made from breathable cotton. Perfect for both formal and casual wear.'
  },
  {
    id: 102,
    name: "Slim Fit Chinos",
    categoryId: 4,
    price: 49.99,
    image: '/images/slim-fit-chinos.jpg',
    description: 'Modern slim-fit chinos designed for all-day comfort with a sharp silhouette.'
  },
  {
    id: 103,
    name: "Elegant Maxi Dress",
    categoryId: 6,
    price: 59.99,
    image: '/images/maxi-dress.jpg',
    description: 'A flowy, full-length dress with flattering lines and subtle floral accents. Ideal for special occasions.'
  },
  {
    id: 104,
    name: "High-Waist Pleated Skirt",
    categoryId: 7,
    price: 39.99,
    image: '/images/pleated-skirt.jpg',
    description: 'Chic and trendy high-waist skirt with soft pleats. Comfortable and stylish for daily wear.'
  },
  {
    id: 105,
    name: "Linen Casual Shirt",
    categoryId: 3,
    price: 32.5,
    image: '/images/linen-shirt.jpg',
    description: 'Lightweight linen shirt with a relaxed fit. Ideal for hot days and coastal getaways.'
  },
  {
    id: 106,
    name: "Floral A-Line Dress",
    categoryId: 6,
    price: 72.0,
    image: '/images/floral-dress.jpg',
    description: 'Graceful A-line dress featuring a vibrant floral pattern and soft-touch fabric.'
  }
];
