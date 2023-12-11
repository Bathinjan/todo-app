import { useEffect, useState } from "react";
import {
  UseTodo,
  UpdateTodo,
  UseCompleted,
  UpdateCompleted,
} from "./TodoContextProvider";

export default function ListRenderer() {
  //* --------------------------------- VARIABLES ---------------------------------
  const COMPLETED_KEY = "completed_key";

  //* ----------------------------------- STATE -----------------------------------
  const [showCompleted, setShowCompleted] = useState(false);
  const [showMessage, setShowMessage] = useState("");

  const heightAnim = {
    height: !showMessage ? "0" : "2rem",
    marginBottom: !showMessage ? "0" : "1rem",
    // transition: "height 1.5s ease-in-out",
    opacity: !showMessage ? "0" : "1",
    transition: "all .5s ease-in-out",
  };
  //* ---------------------------------- CONTEXT ----------------------------------
  const array = UseTodo();
  const setArray = UpdateTodo();
  const completed = UseCompleted();
  const setCompleted = UpdateCompleted();

  //* ----------------------------------- HOOKS -----------------------------------
  useEffect(() => {
    // update localStorage when changes are made to completed array
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(completed));
  }, [completed]);

  //* ----------------------------------- FUNCTIONS -----------------------------------
  function handleDelete(id) {
    // delete from todos array
    const newArray = array.filter((item) => item.id !== id);
    setArray(newArray);
    handleShowMessage("Task Deleted");
  }

  function handleComplete(item) {
    // delete from completed array
    setCompleted((oldArray) => {
      return [...oldArray, item];
    });
    // also delete item from todos array
    handleDelete(item.id);

    handleShowMessage("Task Marked Completed");
  }

  function handleRestore(item) {
    // delete item from completed array
    const newArray = completed.filter((it) => it !== item);
    setCompleted(newArray);

    // add item back to todos array
    setArray((oldArray) => {
      return [...oldArray, item];
    });

    handleShowMessage("Task Restored");
  }

  function handleErase(item) {
    // delete item from completed array
    const newArray = completed.filter((it) => it !== item);
    setCompleted(newArray);
    handleShowMessage("Item Erased");
  }

  function handleShowMessage(itemID, message) {
    setShowMessage(message);
  }

  function handleShowMessage(messageString) {
    setShowMessage(messageString);
    setTimeout(() => {
      setShowMessage("");
    }, 2700);
  }

  //* ---------------------------------- COMPONENT ----------------------------------
  return (
    <>
      <div className="toggle--buttons">
        <button
          className="category--button"
          id={!showCompleted ? "selected" : ""}
          onClick={() => setShowCompleted(false)}
        >
          My Tasks
        </button>
        <button
          className="category--button"
          id={showCompleted ? "selected" : ""}
          onClick={() => setShowCompleted(true)}
        >
          Completed
        </button>
      </div>
      <p className="info--banner" style={heightAnim}>
        {showMessage}
      </p>
      {showCompleted ? (
        <div className="list--renderer">
          {completed.map((item) => {
            return (
              <div className="item" key={item.id}>
                <p className="item--title" id="strikethrough">
                  {item.title}
                </p>
                {item.description && (
                  <p className="item--description">{item.description}</p>
                )}
                <div className="item--button--container">
                  <p
                    className="item--button"
                    onClick={() => {
                      handleRestore(item);
                    }}
                  >
                    ↺
                  </p>
                  <p
                    className="item--button"
                    onClick={() => {
                      handleErase(item);
                    }}
                  >
                    🗑
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="list--renderer">
          {array.map((item) => {
            return (
              <div className="item" key={item.id}>
                <p className="item--title">{item.title}</p>
                {item.description && (
                  <p className="item--description">{item.description}</p>
                )}
                <div className="item--button--container">
                  <p
                    className="item--button"
                    onClick={() => {
                      handleComplete(item);
                    }}
                  >
                    ✔
                  </p>
                  <p
                    className="item--button"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    ✖
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
