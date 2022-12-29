import { Entry } from '@/types';
import { getTagData, getTileData } from '@/api/entries';
import Page from '@/components/organisms/Page';

export function getStaticProps() {
  return {
    props: { data: getTagData() },
  };
}

export default function TagsHome({ data }: { data: Entry[] }) {
  return <Page data={data} />;
}
