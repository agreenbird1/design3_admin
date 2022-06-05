export interface ICategoryEdit {
  id?: string;
  value: string;
  name: string;
}

export interface ICategory extends ICategoryEdit {
  id: string;
  total: number;
}
