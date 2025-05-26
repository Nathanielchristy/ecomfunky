import type { NextApiRequest, NextApiResponse } from 'next';
import { products } from '@/data/products';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { categoryId } = req.query;

  if (!categoryId) {
    return res.status(400).json({ message: 'Missing categoryId' });
  }

  const filtered = products.filter(
    (product) => product.categoryId === Number(categoryId)
  );

  res.status(200).json(filtered);
}
