import React, { FormEvent, ChangeEvent } from "react";
import styles from './styles.module.css';

export type AddTodoProps = {
  task: string,
  handleSubmitTodo: (e: FormEvent) => void,
  handleChange: (e: ChangeEvent) => void,
  handleClick: () => void,
  isClicked: boolean
}

export const AddTodo = ({ task, handleChange, handleSubmitTodo, handleClick, isClicked }: AddTodoProps) => (
    <div className={styles.formContainer}>
      <button className={styles.arrow} onClick={handleClick}>
        <i className={`bx bx-chevron-down bx-sm ${isClicked ? '' : 'bx-rotate-270'}`} style={{opacity: 0.4, cursor: 'pointer'}}></i>
      </button>
      <form onSubmit={handleSubmitTodo} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          name="task" 
          value={task} 
          onChange={handleChange}
          placeholder="What needs to be done?"
        />
      </form>
    </div>
  )