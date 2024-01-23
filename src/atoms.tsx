import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const categoryState = atom({
  key: "category",
  default: "TO_DO",
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
