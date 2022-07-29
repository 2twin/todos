import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from './styles.module.css';

import { Row, Todo } from "../Row/Row";
import { AddTodo } from "../AddTodo/AddTodo";

import { data } from "../../data";
import { nanoid } from "nanoid";

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>(data);
  const [task, setTask] = useState("");
  const [filtered, setFiltered] = useState(todos);
  const [isClicked, setIsClicked] = useState(true);

  const handleClick = () => {
    setIsClicked(!isClicked);
  }

  const todosLength = todos.length;
  const hasTodos = todosLength > 0;
  const remainingTodos = todos.filter((todo) => !todo.isCompleted).length;

  useEffect(() => {
    setFiltered(todos);
  }, [todos])

  const handleChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setTask(value);
  }

  const handleAddTodo = (todo: Todo) => {
    const updateTodos = [...todos, todo];
    setTodos(updateTodos);
    setTask('');
  }

  const handleSubmitTodo = (e: FormEvent) => {
    e.preventDefault();
    const todo = {
      id: nanoid(),
      task: task,
      isCompleted: false
    }

    task && handleAddTodo(todo);
  }

  const handleCheckTodo = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted
        }
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  const todoFilter = (status: boolean) => {
    let newTodos = todos.filter((todo) => todo.isCompleted === status);
    setFiltered(newTodos);
  }

  const clearActive = () => {
    const clearedTodos = todos.filter((todo) => todo.isCompleted === false);
    setTodos(clearedTodos);
  }

  return (
    <div className={styles.container}>
      <p className={styles.logo}>todos</p>
      <AddTodo 
        task={task} 
        handleChange={handleChange} 
        handleSubmitTodo={handleSubmitTodo}
        handleClick={handleClick}
        isClicked={isClicked}
      />
      {isClicked && (
        <>
          <div className={styles.rowContainer}>
            {
              filtered.map((todo) => (
                <Row 
                  key={todo.id} 
                  todo={todo} 
                  handleCheckTodo={handleCheckTodo}
                />
              ))
            }
          </div>
        </>
      )}
      <div className={styles.buttonsContainer}>
            {
              hasTodos && (
                <p>{`${remainingTodos} items left`}</p>
              )
            }
            <div className={styles.centerButtons}>
              <button onClick={() => setFiltered(todos)}>All</button>
              <button onClick={() => todoFilter(false)}>Active</button>
              <button onClick={() => todoFilter(true)}>Completed</button>
            </div>
            <button onClick={clearActive}>Clear completed</button>
          </div>
    </div>
  )
}