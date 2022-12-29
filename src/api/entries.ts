import { Entry } from '@/types';
import fs from 'fs';
import LocatedItem from '@/api/locatedItem';

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

export const getTagData: () => LocatedItem[] = () =>
  fs
    .readdirSync(`./src/tags`, {
      encoding: `utf-8`,
      withFileTypes: true,
    })
    .filter((file) => file.isFile() && file.name.endsWith(`.json`))
    .map((file) => ({
      safeURI: file.name.replace(`.json`, ``),
      ...JSON.parse(
        fs.readFileSync(`./src/tags/${file.name}`, { encoding: `utf-8` }),
      ),
    }))
    .map(
      (tag) =>
        new LocatedItem({
          ...tag,
          fullName: `${tag.name} ${tag.subcategory}`,
          fullAltName: `${tag.altName} ${tag.subcategory}`,
        }),
    );
