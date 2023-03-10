import { Entry } from '@/types';
import { getTileData } from '@/api/entries';
import Page from '@/components/organisms/Page';

export function getStaticProps() {
  return {
    props: { data: getTileData() },
  };
}

export default function Home({ data }: { data: Entry[] }) {
  return <Page data={data} />;
}
