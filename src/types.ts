export type Tile = {
  regionId: number;
  regionX: number;
  regionY: number;
  z: number;
  color: string;
  label?: string;
};

export type EntrySource = {
  link: string;
  name: string;
  modified?: string;
};

export interface Item {
  id: number;
  name: string;
  variants: Item[];
  iconURI: string;
}

export interface LocatedItemInterface extends Item {
  location: number;
}

export type EntryTypes = Tile | LocatedItemInterface;

export interface Entry {
  safeURI: string;
  name: string;
  altName?: string;
  subcategory?: string;
  tags: string[];
  thumbnail: string;
  items: EntryTypes[];
  wiki: string;
  source?: EntrySource;
  recommendedGuideVideoId?: string;
  fullName: string;
  fullAltName: string;
}

export type HeightScrollTop = {
  height: number;
  scrollTop: number;
};

export interface EntityCardCompactProps {
  entity: Entry;
}

export interface EntityCardProps extends EntityCardCompactProps {
  hideInfoButton?: boolean;
}
