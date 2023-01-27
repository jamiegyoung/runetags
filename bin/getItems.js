import fs from 'fs';
import ora from 'ora';
import fetch from 'node-fetch';
import sharp from 'sharp';
import { getItemsFromItemString } from './items.js';

const ITEMS_URL = `https://chisel.weirdgloop.org/moid/data_files/itemsmin.js`;
const ITEMS_IMAGE_URL = `https://chisel.weirdgloop.org/static/img/osrs-dii/`;

const getTagDataAsSet = () =>
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
    .reduce(
      (prev, tag) =>
        new Set([...prev, ...new Set(getItemsFromItemString(tag.items))]),
      new Set(),
    );

const getItemsData = async () => {
  // Items returns a js file that is not valid JSON, so we need to parse it
  const items = await fetch(ITEMS_URL);
  const itemsText = await items.text();
  // Remove the "items=" at the start
  const itemsJSON = itemsText.slice(6);
  // Parse the JSON
  const itemsData = JSON.parse(itemsJSON);
  // Return the items
  return itemsData;
};

const getItems = (loader) => {
  try {
    return JSON.parse(
      fs.readFileSync(`./src/items/items.json`, { encoding: `utf-8` }),
    );
  } catch (err) {
    loader.warn(`Failed to read items file, assuming empty`);
    return {};
  }
};

export default async function main() {
  const loader = ora(`Fetching items db...`).start();
  const itemsData = await getItemsData().catch((err) => {
    loader.fail(`Failed to fetch items db`);
    console.error(err);
    process.exit(1);
  });
  loader.succeed(`Fetched items db`);
  loader.start(`Fetching local items...`);
  const items = getItems(loader);
  loader.succeed(`Fetched local items`);
  const getMissingItemInfo = (id) =>
    new Promise((resolve, reject) => {
      // Delay the request to avoid spamming the API
      const numberId = Number(id);
      setTimeout(async () => {
        // Sometimes the id provided can be a placeholder id, so we need to check if the item exists
        const found =
          itemsData.find(
            (item) => item.id === numberId && item.name !== `null`,
          ) ||
          itemsData.find(
            (item) => item.placeholderId === numberId && item.name !== `null`,
          );

        const imageBase64 = await fetchAndProcessImage(found, reject, id);

        if (found !== undefined) {
          return resolve({
            id: found.id,
            placeholderId: found.placeholderId,
            name: found.name,
            image: imageBase64,
            alternatives: [],
          });
        }
        return reject(`Missing item: ${id}`);
      }, 1000);
    });

  const tagDataSet = getTagDataAsSet();
  loader.start(`Verifying local items against db data... 0/${tagDataSet.size}`);
  let count = 0;
  for (const id of tagDataSet) {
    if (!items[id]) {
      // loader.warn(`Missing item: ${id}, fetching...`);
      const { id: foundId, ...res } = await getMissingItemInfo(id).catch(
        (err) => {
          console.error(err);
        },
      );
      items[foundId] = res;
      loader.info(`Fetched item: ${foundId}`);
    }
    // show how far we are through the process
    count++;
    loader.start(
      `Verifying local items against db data... ${count}/${tagDataSet.size}`,
    );
  }
  loader.succeed(`Verified local items against db data`);
  loader.start(`Writing items to file...`);
  // write the items to the file
  fs.writeFileSync(`./src/items/items.json`, JSON.stringify(items, null, 2), {
    encoding: `utf-8`,
  });
  loader.succeed(`Wrote items to file`);
  loader.succeed(`Done`);
}

const fetchAndProcessImage = async (found, reject, id) => {
  return await fetch(`${ITEMS_IMAGE_URL}${found.id}.png`)
    .then((res) => (res.status === 200 && res) || reject(res))
    .then((res) => res.arrayBuffer())
    .then((buffer) =>
      sharp(Buffer.from(buffer))
        .resize(32, 32, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .toBuffer(),
    )
    .then((buffer) => buffer.toString(`base64`))
    .catch((err) => {
      console.error(err);
      return reject(`Item does not exist: ${id}`);
    });
};
