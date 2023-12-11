import { useState, useEffect } from "react";

export default function EditableText(props) {
  //* ----------------------------------- STATES -----------------------------------
  const [isEditing, setIsEditing] = useState(false);

  const [text, setText] = useState(() => {
    // Retrieve text from localStorage using storage key from props
    const saved = localStorage.getItem(`${props.localStorageKey}`);
    const initialValue = JSON.parse(saved);
    return initialValue || props.placeholder;
  });

  //* ----------------------------------- HOOKS -----------------------------------
  useEffect(() => {
    // any time text OR storage key changes, update localStorage item
    localStorage.setItem(`${props.localStorageKey}`, JSON.stringify(text));
  }, [text, props.localStorageKey]);

  //* ---------------------------------- FUNCTIONS ----------------------------------
  function handleDoubleClick() {
    return setIsEditing(true);
  }

  function handleChange(event) {
    return setText(event.target.value);
  }

  function handleBlur() {
    return setIsEditing(false);
  }

  //* ---------------------------------- COMPONENT ----------------------------------
  return (
    <div onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <input
          className="title--input"
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          // style={{ width: "max-content" }}
        />
      ) : (
        <>{text}</>
      )}
    </div>
  );
}
