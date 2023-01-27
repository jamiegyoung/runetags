import { Entry } from '@/types';
import fs from 'fs';
// import LocatedItem from '@/api/locatedItem';

export const getTileData: () => Entry[] = () =>
  fs
    .readdirSync(`./src/tiles`, {
      encoding: `utf-8`,
      withFileTypes: true,
    })
    .filter((file) => file.isFile() && file.name.endsWith(`.json`))
    .map((file) => ({
      safeURI: file.name.replace(`.json`, ``),
      ...JSON.parse(
        fs.readFileSync(`./src/tiles/${file.name}`, { encoding: `utf-8` }),
      ),
    }))
    .map((tile) => ({
      ...tile,
      fullName: `${tile.name} ${tile.subcategory}`,
      fullAltName: `${tile.altName} ${tile.subcategory}`,
    }));

// const parseItemString = (itemString: string): LocatedItem[] =>
//   itemString.split(`,`).map((item) => {
//     const [id, location] = item.split(`:`);
//     return new LocatedItem({
//       id: Number(id),
//       location: Number(location),
//     });
//   });

// export const getTagData: () => Entry[] = () =>
//   fs
//     .readdirSync(`./src/tags`, {
//       encoding: `utf-8`,
//       withFileTypes: true,
//     })
//     .filter((file) => file.isFile() && file.name.endsWith(`.json`))
//     .map((file) => ({
//       safeURI: file.name.replace(`.json`, ``),
//       ...JSON.parse(
//         fs.readFileSync(`./src/tags/${file.name}`, { encoding: `utf-8` }),
//       ),
//     }))
//     .map((tag) => ({
//       ...tag,
//       items: parseItemString(tag.items) as LocatedItem[],
//       fullName: `${tag.name} ${tag.subcategory}`,
//       fullAltName: `${tag.altName} ${tag.subcategory}`,
//     }));
