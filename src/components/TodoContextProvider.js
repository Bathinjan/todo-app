import { useContext, createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

//* ----------------------------------- CREATE CONTEXTS -----------------------------------
const TodoContext = createContext();
const SetTodoContext = createContext();
const UpdateArrayContext = createContext();
const CompletedContext = createContext();
const SetCompletedContext = createContext();
const TitleContext = createContext();
const SetTitleContext = createContext();
const DescriptionContext = createContext();
const SetDescriptionContext = createContext();

//* ------------------------------------ CUSTOM HOOKS -------------------------------------
export function UseTodo() {
  return useContext(TodoContext);
}

export function UpdateTodo() {
  return useContext(SetTodoContext);
}

export function UpdateArray() {
  return useContext(UpdateArrayContext);
}

export function UseCompleted() {
  return useContext(CompletedContext);
}

export function UpdateCompleted() {
  return useContext(SetCompletedContext);
}

export function UseTitle() {
  return useContext(TitleContext);
}

export function UpdateTitle() {
  return useContext(SetTitleContext);
}

export function UseDescription() {
  return useContext(DescriptionContext);
}

export function UpdateDescription() {
  return useContext(SetDescriptionContext);
}

//* ------------------------------------ PROVIDER -------------------------------------
export function TodoContextProvider({ children }) {
  const ARRAY_KEY = "array_key";
  const COMPLETED_KEY = "completed_key";

  //? ------------------------------------ STATES -------------------------------------

  // Todos Array
  const [todos, setTodos] = useState(() => {
    const result = JSON.parse(localStorage.getItem(ARRAY_KEY));
    if (result === null || result === undefined) {
      localStorage.setItem(ARRAY_KEY, JSON.stringify([]));
    } else {
      return result;
    }
  });

  // Completed Array
  const [completed, setCompleted] = useState(() => {
    const result = JSON.parse(localStorage.getItem(COMPLETED_KEY));
    if (result === null || result === undefined) {
      localStorage.setItem(COMPLETED_KEY, JSON.stringify([]));
    } else {
      return result;
    }
  });

  // Title / Description Strings
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //? ------------------------------- HELPER FUNCTIONS -------------------------------

  function updateArray() {
    // use title / desc states to add item to todos array
    const newItem = {
      title: title,
      description: description,
      id: uuidv4(),
    };

    if (title === "") {
      // require a title
      alert("Please enter a title");
      return;
    }

    setTodos((oldArray) => {
      // set array with new item appended
      return [...oldArray, newItem];
    });

    // Reset strings
    setTitle("");
    setDescription("");
  }

  return (
    <>
      {/* 'todos' is used whenever 'useTodo()' is called */}
      <TodoContext.Provider value={todos}>
        {/* 'setTodos' is used whenever 'updateTodo()' is called, etc */}
        <SetTodoContext.Provider value={setTodos}>
          <UpdateArrayContext.Provider value={updateArray}>
            <CompletedContext.Provider value={completed}>
              <SetCompletedContext.Provider value={setCompleted}>
                <TitleContext.Provider value={title}>
                  <SetTitleContext.Provider value={setTitle}>
                    <DescriptionContext.Provider value={description}>
                      <SetDescriptionContext.Provider value={setDescription}>
                        {children}
                      </SetDescriptionContext.Provider>
                    </DescriptionContext.Provider>
                  </SetTitleContext.Provider>
                </TitleContext.Provider>
              </SetCompletedContext.Provider>
            </CompletedContext.Provider>
          </UpdateArrayContext.Provider>
        </SetTodoContext.Provider>
      </TodoContext.Provider>
    </>
  );
}
