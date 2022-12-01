import { NextApiRequest, NextApiResponse } from "next";
import { getJobs, GetJobsOptions } from "../../lib/jobs_server";

const jobs = [
  {
    id: 1,
    title: 'Senior Software Developer',
    company: 'Versel'
  }
]

export default async function handleJobs(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }
  const getJobOptions: GetJobsOptions = {}
  if (req.query.page) {
    const page = Number(req.query.page)
    if (isNaN(page) || page < 1) {
      res.status(422).send('Invalid page number')
      return
    }
    getJobOptions.page = page
  }
  if (req.query.jobTitle) {
    if (typeof req.query.jobTitle !== 'string') {
      res.status(422).send('Invalid jobTitle filter')
      return
    }
    getJobOptions.jobTitle = req.query.jobTitle
  }

  if (req.query.company) {
    if (typeof req.query.company !== 'string') {
      res.status(422).send('Invalid company filter')
      return
    }
    getJobOptions.company = req.query.company
  }
  const jobs = await getJobs(getJobOptions);
  return res.send(jobs);
}