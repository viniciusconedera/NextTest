import { GetStaticPaths, GetStaticProps } from "next";
import { Layout } from "../../components/layout";
import { formatDate } from "../../lib/dates";
import { deserializedJob, serializejob } from "../../lib/jobs";
import { getJob } from "../../lib/jobs_server";

export default function JobPage({job: serializedJob}: any) {
  const job = deserializedJob(serializedJob);
  return (
    <Layout title={`${job.jobTitle} at ${job.company}`}>
      <h2>{job.jobTitle}</h2>
      <p>
        <strong>{job.company}</strong>
      </p>
      <p>
        <strong>Posted on {formatDate(job.date)}</strong>
      </p>
      {job.description.split('\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <p>
        <a href={job.applyUrl} target="_blank" rel="noreferrer">
          apply
        </a>
      </p>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps
  = async (context) => {
  const job = await getJob(context.params!.id as string);
  if (!job) {
    return {notFound: true}
  }
  return {
    props: {job: serializejob(job)}
  }
}

