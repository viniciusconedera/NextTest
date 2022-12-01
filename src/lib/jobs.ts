export interface Job {
  id: string;
  jobTitle: string;
  company: string;
  description: string;
  applyUrl: string;
  date: Date;
};

export type JobSummary = Omit<Job, 'applyUrl'|'description'>;

export const toJob = (obj: Job) => ({...obj, date: new Date(obj.date)});

function DateFormat(obj: Job) {
  return {...obj, date: new Date(obj.date)}
}

export const toJobSummary = (job: Job): JobSummary => {
  const { description, applyUrl, ...jobSummary } = job
  return jobSummary
}

export type SerializedJob = ReturnType<typeof serializejob>

export const serializejob = (job: Job) => ({
  ...job, date: job.date.toISOString()
})

export const deserializedJob = (serializejob: SerializedJob): Job => ({
  ...serializejob,
  date: new Date(serializejob.date)
})

export type SerializedJobSummary = ReturnType<typeof serializedJobSummary>;

export const serializedJobSummary = (jobSummary: JobSummary) => ({
  ...jobSummary, date: jobSummary.date.toISOString()
});

export const deserializedJobSummary = (
  serializedJobSummary: SerializedJobSummary
) => ({
  ...serializedJobSummary, date: new Date(serializedJobSummary.date)
})
