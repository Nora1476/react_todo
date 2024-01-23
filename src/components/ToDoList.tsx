import { useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { toDoSelector, toDoState } from "../atoms";
import ToDo from "./Todo";

function ToDoList() {
  const toDos = useRecoilValue(toDoState); //atom내 toDoState객체 값을 불러오기만 가능
  const selectorOutput = useRecoilValue(toDoSelector);
  console.log(selectorOutput);
  // console.log(toDos);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          // <ToDo text={toDo.text} category={toDo.category} id={toDo.id} />
          <ToDo key={toDo.id} {...toDo} /> //위 코드와 같은 코드이며 atom파일 내 객제와 ToDo타입이 완전히 일치해서 ...사용가능
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
