import type { ICategoryCascader } from "./types";

export const categoryCascader = (categories: any): ICategoryCascader[] => {
  const cascader: ICategoryCascader[] = [];
  categories.forEach((category: any) => {
    const detail = category.name.split(" ");
    cascader.push({
      label: detail[0] as string,
      children: [
        {
          value: category.id + "",
          label: detail[1] as string,
        },
      ],
    });
  });
  for (let i = 0; i < cascader.length; i++) {
    for (let j = i + 1; j < cascader.length; j++) {
      if (cascader[j].children) {
        cascader[i].children?.push(cascader[j].children[0]);
      }
      cascader.splice(j, 1);
    }
  }
  return cascader;
};
