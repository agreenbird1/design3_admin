export interface IGoodsProperty {
  name: string;
  values: string[];
}

export interface ICategoryCascader {
  label?: string;
  value?: string | number;
  children?: ICategoryCascader[];
}

export interface IGoods {
  name: string;
  price: string;
  description: string;
  put: "1" | "0";
  category_id: string;
  property: string;
  inventory: number;
}

export interface IGoodsPic {
  filename: string;
  mimetype: string;
}
