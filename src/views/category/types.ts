export interface ICategoryEdit {
  value: string;
  name: string;
}

export interface ICategory extends ICategoryEdit {
  id: string;
  total: number;
}
