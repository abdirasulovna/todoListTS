import React, { ChangeEvent, useState } from "react";
import { styled } from "styled-components";

interface TodoList {
  id: number;
  text: string;
  completed: boolean;
}
const AddTodo: React.FC = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState<TodoList[]>([]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const addTodo = () => {
    if (value.trim() !== "") {
      const todo: TodoList = {
        id: Date.now(),
        text: value,
        completed: false,
      };
      setTodos([...todos, todo]);
      setValue("");
    }
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const completeTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <StyledContainer>
      <h2>Todo List with TypeScript</h2>
      <form onSubmit={submitHandler}>
        <StyledInput type="text" onChange={onChangeHandler} value={value} />
        <StyledButton onClick={addTodo}>add todo</StyledButton>
        <StyledListContainer>
          {todos.map((item) => (
            <StyledList key={item.id}>
              <span
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
              >
                {item.text}
              </span>
              <StyledButton onClick={() => completeTodo(item.id)}>
                {item.completed ? "UnComplete" : "Complete"}
              </StyledButton>
              <StyledButton onClick={() => deleteTodo(item.id)}>
                delete
              </StyledButton>
            </StyledList>
          ))}
        </StyledListContainer>
      </form>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  text-align: center;
  margin-top: 50px;
  text-decoration: none;
`;

const StyledInput = styled.input`
  height: 25px;
  width: 220px;
  border-radius: 6px;
`;
const StyledButton = styled.button`
  padding: 5px 20px 5px 30px;
  border-radius: 0.7rem;
  margin-left: 10px;
  border: none;
  background-color: #febb3e;
  cursor: pointer;
`;
const StyledListContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;
const StyledList = styled.li`
  list-style: none;
  font-size: 30px;
  width: 60%;
  height: 10%;
`;
export default AddTodo;
