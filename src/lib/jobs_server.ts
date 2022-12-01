import { readFile } from 'fs/promises';
import { join } from 'path';
import { toJob } from './jobs';
import prisma from './prisma_server';

export interface GetJobsOptions {
  page?: number;
  jobTitle?: string;
  company?: string;
}

async function readJobsFromJson() {
  const json = await readFile(join(process.cwd(), 'jobs.json'), 'utf-8');
  return (JSON.parse(json)).map(toJob)
}

export async function getJobs({page=1, jobTitle, company}: GetJobsOptions) {
  return prisma.job.findMany({
    select: {id: true, jobTitle: true, company: true, date: true},
    where: {
      jobTitle: {contains: jobTitle, mode: 'insensitive'},
      company: {contains: company, mode: 'insensitive'}
    },
    orderBy: {date: 'desc'},
    skip: (page -1) * 10,
    take: 10
  });
}

export async function getJob(id: string) {
  const job = await prisma.job.findUnique({where: {id}});
  return job ?? undefined;
}