export interface CategoryType {
  name: Name;
  _id: string;
  subCategories?: SubCategory[];
  createdAt: string;
  updatedAt: string;
}

export interface Name {
  en: string;
  ar: string;
}

export interface SubCategory {
  name?: Name2;
  items?: Item[];
  _id?: string;
}

export interface Name2 {
  en: string;
  ar: string;
}

export interface Item {
  en: string;
  ar: string;
  _id: string;
}
