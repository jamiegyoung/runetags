import { Entry } from '@/types';
import { NextSeo } from 'next-seo';
import NavBar from '@/components/molecules/NavBar';
import styles from '@/pages/[entity].module.css';
import ListContainer from '@/components/atoms/ListContainer';
import EntityCard from '@/components/molecules/EntityCard';
import YoutubeEmbed from '@/components/atoms/YouTubeEmbed';
import CodeBlock from '@/components/atoms/CodeBlock';
import ContributionFooter from '@/components/atoms/ContributionFooter';
import { getTileData } from '@/api/entries';
import { defaultImages } from '@/api/seoOptions';
import ListContainerSection from '@/components/molecules/ListContainerSection';
import Source from '@/components/molecules/Source';
import Link from '@/components/atoms/Link';

export async function getStaticPaths() {
  return {
    paths: getTileData().map((e) => {
      return {
        params: { entity: e.safeURI },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { entity: string };
}) {
  return {
    props: getTileData().find(
      (e) => e.safeURI.toLowerCase() === params.entity.toLowerCase(),
    ),
  };
}

export default function Entity(entry: Entry) {
  return (
    <>
      <NextSeo
        title={`${entry.name}${
          entry.subcategory ? ` (${entry.subcategory}) ` : ` `
        }Tile Markers`}
        description={`${entry.name}${
          entry.altName ? ` / ${entry.altName}` : ``
        } tile markers for RuneLite. Find and import tile markers for different Old School RuneScape activities.`}
        openGraph={{
          images: [
            {
              url: entry.thumbnail,
              alt: `${entry.name} tile markers`,
            },
            ...defaultImages,
          ],
        }}
      />
      <NavBar />
      <div className={styles.container}>
        <ListContainer>
          <EntityCard entity={entry} hideInfoButton />
          <div className={styles.linkContainer}>
            <Link
              href={`https://runelite.net/tile/show/#${Buffer.from(
                JSON.stringify(entry.items),
              )
                .toString(`base64`)
                .replaceAll(`=`, ``)}`}
              className={styles.entityLink}
              newTab
            >
              View Map on RuneLite
            </Link>
            <Link href={entry.wiki} className={styles.entityLink} newTab>
              Wiki Page
            </Link>
          </div>
          {entry.recommendedGuideVideoId ? (
            <ListContainerSection title="Recommended Guide">
              <YoutubeEmbed
                videoId={entry.recommendedGuideVideoId}
                title={`${entry.name} guide`}
              />
            </ListContainerSection>
          ) : null}
          <ListContainerSection title="Tile Data">
            <CodeBlock items={entry.items} />
          </ListContainerSection>

          {entry.source ? (
            <ListContainerSection title="Source">
              <Source source={entry.source} />
            </ListContainerSection>
          ) : null}
        </ListContainer>
      </div>
      <ContributionFooter />
    </>
  );
}
