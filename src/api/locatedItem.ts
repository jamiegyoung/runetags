import { Item, LocatedItemInterface } from '@/types';

export default class LocatedItem implements LocatedItemInterface {
  location: number;
  id: number;
  name: string;
  variants: Item[];
  iconURI: string;

  constructor(locatedItem: LocatedItemInterface) {
    this.id = locatedItem.id;
    this.name = locatedItem.name;
    this.variants = locatedItem.variants;
    this.iconURI = locatedItem.iconURI;
    this.location = locatedItem.location;
  }

  toString() {
    return `${this.id}:${this.location}`;
  }

  // if (this.layout) {
  //   return `banktaglayoutsplugin:${this.name},${this.items.reduce(
  //     (prev: string, curr) => {
  //       return `${prev},${curr.id}:${curr.location}`;
  //     },
  //     ``,
  //   )},banktag:${this.name},${this.iconItem.id},${this.items.reduce(
  //     (prev: string, curr) => {
  //       return `${prev},${curr.id}`;
  //     },
  //     ``,
  //   )}`;
  // }
  // return `${this.name},${this.iconItem.id},${this.items.reduce(
  //   (prev: string, curr) => {
  //     return `${prev},${curr.id}`;
  //   },
  //   ``,
  // )}`;
}
