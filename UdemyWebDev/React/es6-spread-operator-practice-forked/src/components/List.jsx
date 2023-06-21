import React from "react";
import ToDoItem from "./ToDoItem";

function List(props) {
  function deleteItem(id) {
    props.setToDoItems((previous) => {
      return previous.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <ul>
        {props.items.map((item, index) => (
          <ToDoItem
            key={index}
            id={index}
            onClick={deleteItem}
            item={item}
            name={item}
          />
        ))}
      </ul>
    </div>
  );
}

export default List;
