import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ items, removeItem, editItem }) => {
  //iterate over and map each item in the items list
  return (
    <div className="grocery-list">
      {items.map((item) => {
        //each item has 2 properties: id and title
        const { id, title } = item;
        return (
          //each article for grocery item, with title, edit and del buttons
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                className="edit-button"
                type="button"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-button"
                onClick={removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
