import { NextApiRequest, NextApiResponse } from "next";

const jobs = [
  {
    id: 1,
    title: 'Senior Software Developer',
    company: 'Versel'
  }
]

export default function handleJobs(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).end();
  }
  return res.send(jobs);
}