import { Entry } from '@/types';
// import { getTagData } from '@/api/entries';
import Page from '@/components/organisms/Page';

export function getStaticProps() {
  // console.log(getTagData());
  return {
    // props: { data: getTagData() },
    props: { data: [] },
  };
}

export default function TagsHome({ data }: { data: Entry[] }) {
  return <Page data={data} />;
}
