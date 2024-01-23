import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  //onclick 이벤트로 name값을 받아옴
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldToDos) => {
      //1. atom안에 객체배열을 oldToDos로 불러와서 배열 내에 id의 값과
      //현재 toDo항목의 부모컴포넌트로부터 넘겨받은 id값이 같은 것의 인덱스 번호를 출력
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);

      const newToDo = { text: text, id: id, category: name as any }; //카테고리만 클릭이벤트로 받아온 name으로 대체

      return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)];
    });
  };
  return (
    <li>
      <span>{text} </span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO + ""} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING + ""} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE + ""} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
