import React, { useState, useEffect } from "react";
import List from "./List-CT";
import Alert from "./Alert-CT";

//function to get from localstorage
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

export default function App() {
  //manage state:name, list, isEditing, editID, alert
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    msg: "",
  });

  //functions:
  //showAlert
  const showAlert = ({ show = false, type = "danger", msg = "nothing" }) => {
    setAlert(show, type, msg);
  };

  //removeItem
  const removeItem = (id) => {
    setList(items.filter((item) => item.id !== id));
    showAlert(true, "success", "item removed");
  };
  //editItem
  const editItem = (id) => {
    const changedItem = items.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(name);
    showAlert(true, "success", "item's changed");
  };

  //clearList
  const clearList = () => {
    showAlert("true", "danger", "list is empty");
    setList([]);
  };

  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter appropriate value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setIsEditing(false);
      setEditID(null);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "item added");
      const newItem = { id: newDate().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  //useEffect
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, []);

  //return
  return (
    <div className="section-center">
      //form-section
      <form className="submit-form" onClick={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target)}
            className="input-box"
          />
          <button className="submit-btn" type="submit">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      //display the list
      {list.length > 0 && (
        <div className="grocery-items">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clearList-btn" onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </div>
  );
}
