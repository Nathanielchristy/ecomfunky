import type { NextApiRequest, NextApiResponse } from 'next';
import { categories } from '@/data/categories';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers['x-internal-token'];

  if (token !== process.env.INTERNAL_API_TOKEN && token !== 'dev-token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  return res.status(200).json(categories);
}