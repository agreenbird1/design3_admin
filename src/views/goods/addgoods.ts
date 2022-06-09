import type { ICategoryCascader } from "./types";

export const categoryCascader = (categories: any): ICategoryCascader[] => {
  const cascader: ICategoryCascader[] = [];
  console.log(categories);
  categories.forEach((category: any) => {
    const detail = category.name.split(" ");
    const cas = cascader.find((c) => c.label === detail[0]);
    if (cas) {
      cas.children?.push({
        label: detail[1],
        value: category.id,
      });
    } else {
      cascader.push({
        label: detail[0],
        children: [
          {
            label: detail[1],
            value: category.id,
          },
        ],
      });
    }
  });
  return cascader;
};
