import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

export default async function getStays(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const dataDirectory = path.join(process.cwd(), 'data');
    const stays = await fs.readFile(`${dataDirectory}/stays.json`, 'utf-8');

    res.status(200).json(stays);
  } catch (error) {
    res.status(500).json(error);
  }
}
