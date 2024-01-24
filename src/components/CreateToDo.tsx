import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import styled from "styled-components";

interface IForm {
  toDo: string;
}

const FromWrap = styled.div`
  input {
    min-width: 300px;
    height: 40px;
    padding: 5px 10px;
    border-radius: 5px;
  }
  > form > button {
    padding: 5px 20px;
  }
`;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [{ text: toDo, id: Date.now(), category }, ...oldToDos]);
    setValue("toDo", "");
  };
  return (
    <FromWrap>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", {
            required: "Please write a To do",
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
    </FromWrap>
  );
}

export default CreateToDo;
