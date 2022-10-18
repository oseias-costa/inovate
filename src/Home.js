import { db } from "./firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useState, useEffect, useContext } from "react";
import { Head } from "./Components/Head";
import { auth } from "./firebase";
import { signOut } from "@firebase/auth";
import { useNavigate } from "react-router";
import { AuthContext } from "./context/UserAuthContext";

export const Home = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState();
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  //read

  useEffect(() => {
    onValue(ref(db, "teste"), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos((oldArray) => [...oldArray, todo]);
        });
      }
    });
  }, []);

  // delete

  const handleDelete = (todo) => {
    remove(ref(db, `/teste/${todo.uuid}`));
  };

  // update

  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTempUuid(todo.uuid);
    setTodo(todo.todo);
  };

  const handleSubmitChange = () => {
    update(ref(db, `/teste/${tempUuid}`), {
      todo,
      uuid: tempUuid
    });

    setTodo("");
    setIsEdit(false);
  };

  // write

  const writeToDatabase = () => {
    const uuid = uid();
    set(ref(db, `/teste/${uuid}`), {
      todo,
      uuid
    });
    setTodo("");
  };

  const logoutSessao = () => {
    signOut(auth).catch((error) => {
      console.log(error);
    });
    return navigate("/Login");
  };

  const response = JSON.stringify(currentUser);
  const transformResponse = {
    ...JSON.parse(response)
  };

  console.log(transformResponse.email);

  return (
    <div className="App">
      <Head title="Home" />

      <header className="App-header">
        <button type="button" onClick={logoutSessao}>
          Logout
        </button>
        <br />
        <br />
        <input type="text" value={todo} onChange={handleTodoChange} />
        {isEdit ? (
          <>
            {" "}
            <button onClick={handleSubmitChange}>Update</button>
            <button
              onClick={() => {
                setIsEdit(false);
                setTodo("");
              }}
            >
              x
            </button>
          </>
        ) : (
          <button onClick={writeToDatabase}>submit</button>
        )}
        {todos.map((todo) => (
          <>
            <li>
              {todo.todo}
              <button onClick={() => handleUpdate(todo)}>Update</button>
              <button onClick={() => handleDelete(todo)}>delete</button>
            </li>
          </>
        ))}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};
