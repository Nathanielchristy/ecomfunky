export interface Category {
  id: number;
  name: string;
  children?: Category[];
}

export const categories: Category[] = [
  {
    id: 1,
    name: 'Clothing',
    children: [
      {
        id: 2,
        name: 'Men',
        children: [
          { id: 3, name: 'Shirts' },
          { id: 4, name: 'Pants' }
        ]
      },
      {
        id: 5,
        name: 'Women',
        children: [
          { id: 6, name: 'Dresses' },
          { id: 7, name: 'Skirts' }
        ]
      }
    ]
  },
  
];
