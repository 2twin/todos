import React from "react";
import styles from './styles.module.css';

export type Todo = {
  id: string,
  task: string,
  isCompleted: boolean
}

type TodoProps = {
  todo: Todo,
  handleCheckTodo: (id: string) => void
}

export const Row = ({ todo: { task, isCompleted, id }, handleCheckTodo }: TodoProps) => (
    <label className={isCompleted ? styles.completed : styles.active}>
      <input
      className={styles.input}
        type="checkbox"
        checked={isCompleted}
        onChange={() => handleCheckTodo(id)}
        />
      <p>{task}</p>
    </label>
)