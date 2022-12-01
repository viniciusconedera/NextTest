
import type { GetServerSideProps, NextPage } from 'next';
import { JobList } from '../components/JobList';
import { Layout } from '../components/layout';
import { deserializedJobSummary, serializedJobSummary, SerializedJobSummary } from '../lib/jobs';
import { getJobs } from '../lib/jobs_server';

export interface HomeSSProps {
  initialJobs: Array<SerializedJobSummary>
}

const Home: NextPage<HomeSSProps> = ({initialJobs}) => {
  const jobs = initialJobs.map(deserializedJobSummary);
  return (
    <Layout>
      <JobList jobs={jobs}/>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<HomeSSProps> =
async () => {
  const initialJob = await getJobs({});
  return {
    props: {
      initialJobs: initialJob.map(serializedJobSummary)
    }
  }

}

export default Home;