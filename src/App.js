import "./App.css";
import { TodoContextProvider } from "./components/TodoContextProvider";
import Header from "./components/Header";
import ListRenderer from "./components/ListRenderer";

//TODO ----------------------------------- TODO -----------------------------------
//? Dark / Light Mode
//? Custom cursor w/ matching palette color
//? Undo component : single localStorage entry / state allowing 1 undo action
//? EditableText version for list items (1 extra array of objects in localStorage / 1 add entry in todos array)
//? Click-and-drag to re-order list items
//* Content that fades to transparent: "<- Double click here to edit title"
//* Categories / Colors / Etc
//* BG Animations

export default function App() {
  return (
    <>
      <TodoContextProvider>
        <Header />
        <ListRenderer />
      </TodoContextProvider>
    </>
  );
}
