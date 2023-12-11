import { useEffect } from "react";
import EditableText from "./EditableText";
import {
  UseTodo,
  UpdateArray,
  UseTitle,
  UpdateTitle,
  UseDescription,
  UpdateDescription,
} from "./TodoContextProvider";

export default function Header() {
  //* ---------------------------------- CONTEXT ----------------------------------
  const ARRAY_KEY = "array_key";
  const array = UseTodo();
  const updateArray = UpdateArray();
  const title = UseTitle();
  const setTitle = UpdateTitle();
  const description = UseDescription();
  const setDescription = UpdateDescription();

  //* ----------------------------------- HOOKS -----------------------------------
  useEffect(() => {
    // update localStorage when changes are made to todos array
    localStorage.setItem(ARRAY_KEY, JSON.stringify(array));
  }, [array]);

  //* ---------------------------------- COMPONENT ----------------------------------
  return (
    <>
      <div className="title--text">
        <EditableText localStorageKey="pagetitle" placeholder="My To Do List" />
      </div>
      <div className="input--wrapper">
        <p className="input--label">Title: </p>
        <input
          className="input--field"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        ></input>
        <p className="input--label">Description: </p>
        <input
          className="input--field"
          type="text"
          placeholder="Enter description (optional)"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        ></input>
        <button className="button--primary" onClick={updateArray}>
          Add
        </button>
      </div>
    </>
  );
}
