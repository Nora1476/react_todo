import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

//recoilPersist 아무것도 설정 안 하고 쓰는 경우
//localStorage에 저장되며, key 이름은 'recoil-persist'로 저장됨
const { persistAtom } = recoilPersist({
  key: "localSaveToDos",
  storage: sessionStorage,
});

//enum을 지정해줌으로써 카테고리 설정시 생기는 오류로부터 보호받을 수 있음
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

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
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
