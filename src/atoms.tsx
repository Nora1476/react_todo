import { atom, selector } from "recoil";

//enum을 지정해줌으로써 설정시 생기는 오류로부터 보호받을 수 있음
export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

//selector는 key값을 가지며 get이라는 매서드로 다른 atom을 불러와 원본을 훼손하지 않고 가공
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    //카테고리별로  배열 3개로 필터링
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
