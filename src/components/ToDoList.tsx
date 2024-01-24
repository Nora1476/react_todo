import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { Categories, categoryState, toDoSelector } from "../atoms";
import ToDo from "./Todo";
import styled from "styled-components";
const Main = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 40px;
    font-weight: bold;
    color: ${(props) => props.theme.accentColor};
    margin-top: 20px;
  }
  button {
    height: 40px;
    padding: 5px;
    border: 1px solid ${(props) => props.theme.textBoderColor};
    border-radius: 5px;
    font-weight: 500;
    color: ${(props) => props.theme.textBoderColor};
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    &:hover {
      background-color: ${(props) => props.theme.textBoderColor};
    }
    &:first-child:hover {
      background: #34ace0;
    }
    &:nth-child(2):hover {
      background: #218c74;
    }
    &:nth-child(3):hover {
      background: #cd6133;
    }
  }
`;
const SelectWrap = styled.div`
  select {
    width: 200px;
    border: 1px solid #c4c4c4;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 10px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    margin: 20px auto;
    &:focus {
      border: 1px solid #9b51e0;
      box-sizing: border-box;
      border-radius: 10px;
      outline: 2px solid #f8e4ff;
      border-radius: 10px;
    }
  }
`;
const ToDoWrap = styled.div`
  width: 100%;
  max-width: 540px;
  margin: 20px auto;
  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 5px;
      padding: 10px 0 5px 10px;
      border-bottom: 1px solid ${(props) => props.theme.textBoderColor};
      div {
        display: flex;
        gap: 4px;
      }
    }
  }
`;

function ToDoList() {
  // const toDos = useRecoilValue(toDoState); //atom내 toDoState객체 값을 불러오기만 가능
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);

    //atom.tsx파일 내 enum 사용시 값을 따로 설정해주지 않을경우 각요소를 숫자로 받기 때문에 타입 변활 필요
    // setCategory(+event.currentTarget.value as number);
  };

  console.log(toDos);
  return (
    <Main>
      <h1>To Dos</h1>
      <SelectWrap>
        <select value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </select>
      </SelectWrap>

      <CreateToDo />

      <ToDoWrap>
        <ul>
          {toDos?.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ul>
      </ToDoWrap>
    </Main>
  );
}

export default ToDoList;
