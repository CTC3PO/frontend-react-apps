import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

//function to get items from local storage
//for when refresh, still remembers the items in the list
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  //if the list exists, return the parse of the jason of get item
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

export default function App() {
  //manage states
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  //state for edit's id (reflect which item editing)
  const [editId, setEditID] = useState(null);
  //alert state (it's an object, display some text when make change)
  //the option comes from Alert.jsx
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  //create handleSubmit function, check if value is empty, display alert, then
  //then if there's valid item name and isEditing, then deal with edit
  // else then add item to the list
  const handleSubmit = (e) => {
    e.preventDefault();
    //display alert if user input empty string (name is false)
    if (!name) {
      //display alert
      showAlert(true, "danger", "please enter value");
    }
    //else, if still editing and name is valid
    else if (name && isEditing) {
      //deal with edit, don't allow empty item
      setList(
        //iterate over the list, if item id matches, then return all properties,
        //and just change the title to the state value of name
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          //else, just return item
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
      //else, call showAlert and add item
    } else {
      showAlert(true, "success", "item added to the list");
      //add item and show alert
      const newItem = { id: new Date().getTime().toString(), title: name };
      //set the newitem into the list, spreading previous items from list first
      setList([...list, newItem]);
      setName("");
    }
  };

  //function to show alert, looking for 3 things: show, type, msg
  //default show:false, type is empty, msg is empty
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  //function to remove individual item from list
  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    //if item's id matches, don't add it, if match, add to list
    setList(list.filter((item) => item.id !== id));
  };

  //function for edit item:
  const editItem = (id) => {
    //get item whose id matches
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  //useEffect to control everytime list changes, call local storage to set items,
  //using key,value pair, key is "list", value is the stringify of the list
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      //adding a form that has alert message, input text and submit button
      <form className="grocery-form" onSubmit={handleSubmit}>
        //add alert message if alert is shown
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          //add input field
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target)}
          />
          //add button for edit/submit
          <button type="submit" className="submit-btn">
            //if still editng then show "edit" otherwise show "submit"
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      //display items in list if not empty
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}
