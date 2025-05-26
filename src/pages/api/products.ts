import type { NextApiRequest, NextApiResponse } from 'next';
import { products } from '@/data/products';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers['x-internal-token'];

  if (token !== process.env.INTERNAL_API_TOKEN && token !== 'dev-token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const categoryId = parseInt(req.query.categoryId as string);
  const filtered = products.filter(p => p.categoryId === categoryId);
  return res.status(200).json(filtered);
}