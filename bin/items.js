import getItems from './getItems.js';
import placeholderReplacer from './placeholderReplacer.js';

export const getItemsFromItemString = (itemString) =>
  itemString.split(`,`).map((item) => item.split(`:`)[0]);

export const parseItemString = (itemString) =>
  itemString.split(`,`).map((item) => item.split(`:`));

const main = async () => {
  await getItems();
  await placeholderReplacer();
};

main();
