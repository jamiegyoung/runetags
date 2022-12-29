import Fuse from 'fuse.js';
import { Entry } from '@/types';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import Entities from '@/components/organisms/Entities';
import NavBar from '@/components/molecules/NavBar';
import styles from '@/styles/Home.module.css';
import ContributionFooter from '@/components/atoms/ContributionFooter';
import { NextSeo } from 'next-seo';
import { defaultImages } from '@/api/seoOptions';

const fuseOptions = {
  // the keys of the objects to search
  keys: [
    { name: `fullName`, weight: 0.7 },
    { name: `fullAltName`, weight: 0.5 },
    { name: `tags`, weight: 0.3 },
  ],
  threshold: 0.4,
};

export const SearchContext = createContext<
  [string | undefined, Dispatch<SetStateAction<string>> | undefined]
>([undefined, undefined]);

export default function Page({ data }: { data: Entry[] }) {
  const [searchVal, setSearchVal] = useState(``);
  const [searchRes, setSearchRes] = useState<Entry[]>(data);

  useEffect(() => {
    const fuse = new Fuse(data, fuseOptions);
    if (searchVal.length > 0) {
      setSearchRes(fuse.search(searchVal).map((res) => res.item));
      return;
    }
    setSearchRes(data);
  }, [searchVal, data]);
  console.log(
    `
P########B5?:      ?BBB5              .PBBB~
&@@@#BBB#&@@@&!    5&&&&B.           :&&&&&7
&@@@:     ^&@@@^   5&&&&&#.         ^&&&&&&7
&@@@:      5@@@7   5&&#5&&&^       !&&&Y&&&7
&@@@:     !@@@#    5&&& 7&&&~     7&&&^.&&&7
&@@@#BBB#&@@#?     5&&&  !&&&7   J&&&^ .&&&7
&@@@#GB@@@@J       5&&&   ^&&&J 5&&#.  .&&&7
&@@@:  .G@@@P      5&&&    :&&&B&&#.   .&&&7
&@@@:    ?@@@&^    5&&&     .#&&&B     .&&&7
&@@@^     :&@@@Y   5&&&       7J7      .&&&7
G&#&:       5##&5  ?##G                .BB#~

Made with \u2764 by jamgyo`,
  );
  return (
    <>
      <NextSeo
        openGraph={{
          images: defaultImages,
        }}
      />
      <div>
        <main className={styles.main}>
          <SearchContext.Provider value={[searchVal, setSearchVal]}>
            <NavBar />
            <Entities list={searchRes} />
            <ContributionFooter />
          </SearchContext.Provider>
        </main>
      </div>
    </>
  );
}
