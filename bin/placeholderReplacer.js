import fs from 'fs';
import ora from 'ora';
import { parseItemString } from './items.js';

// This file will be used to replace the placeholder ids in the items.json file with the actual ids
// This is necessary as the layout plugin sometimes uses placeholder ids, and we need to replace them with the actual ids
// to understand what the item is

const processItemString = (itemString, i, len, loader) => {
  loader.start(`Processing item string ${i + 1}/${len}`);
  const items = JSON.parse(
    fs.readFileSync(`./src/items/items.json`, {
      encoding: `utf-8`,
    }),
  );
  // loader.text = `Processing item string ${i + 1}/${len}`;
  const itemStringItems = parseItemString(itemString);
  // Not a very efficient search, but it's only runs once per tag on build, so it's fine
  const fixedItems = [...itemStringItems].map((item) => {
    loader.start(`Processing item string ${i + 1}/${len}`);
    const foundPlaceHolder = Object.keys(items).find(
      (key) => items[key].placeholderId === Number(item[0]),
    );
    if (foundPlaceHolder !== undefined) {
      // replace with key
      loader.warn(
        `Found placeholder id ${item[0]} in tag ${
          i + 1
        }/${len} - replacing with actual id ${foundPlaceHolder}`,
      );
      return [foundPlaceHolder, item[1]];
    }
    return item;
  });
  loader.succeed(`Processed item string ${i + 1}/${len}`);
  return fixedItems.map((item) => item.join(`:`)).join(`,`);
};

export default function readTags() {
  const loader = ora(`Reading tags...`).start();
  fs.readdirSync(`./src/tags`, {
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
    .map((tag, i, arr) => {
      const { safeURI, ...fixedItems } = {
        ...tag,
        items: processItemString(tag.items, i, arr.length, loader),
      };
      loader.info(`Writing tag ${i + 1}/${arr.length}`);
      fs.writeFileSync(
        `./src/tags/${tag.safeURI}.json`,
        JSON.stringify(fixedItems, null, 2),
        { encoding: `utf-8` },
      );
    });
  loader.succeed(`Finished reading tags`);
}
