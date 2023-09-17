import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [newTodo, setNewTodo] = useState({ name: "", isDone: false }); // State for the new todo item

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/todos/");
      setData(res.data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const del = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/todos/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      const orig = [...data];
      setErrorMessage(error.message);
      setData(orig);
    }
  };

  const addTodo = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/todos/", newTodo);
      setData((prevData) => [...prevData, res.data]); // Add the new todo to the list
      setNewTodo({ name: "", isDone: false }); // Clear the input fields
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Todo Name"
          value={newTodo.name}
          onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      {data.map((i) => {
        return (
          <div key={i.id}>
            {i.name}
            {i.isDone}
            <button onClick={() => del(i.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
