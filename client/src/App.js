import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

function App() {

  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [errors, setErrors] = useState({});
  const [edit, setEdit] = useState(0);

  useEffect( () => {
    getNotes();
  }, []);

  const getNotes = () => {
    axios.get("http://localhost:8000/api/notes")
      .then(res => {
        console.log(res);
        setNotes(res.data);
      })
      .catch(err => console.log(err));
  }

  const addNote = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/notes", {text})
      .then(res => {
        console.log(res);
        if(res.data.errors) {
          setErrors(res.data.errors);
        } else {
          setText("");
          getNotes();
        }
      })
      .catch(err => console.log(err));
  }

  const remove = (e, _id) => {
    e.preventDefault();
    console.log(_id);
    axios.delete(`http://localhost:8000/api/notes/${_id}`)
      .then(res => {
        console.log(res);
        getNotes();
      })
      .catch(err => console.log(err));
  }

  const thing = (e, _id) => {
    console.log(_id);
    setEdit(_id);
  }

  const update = (e, _id) => {
    setEdit(0);
    axios.put(`http://localhost:8000/api/notes/${_id}`, {text: e.target.value})
      .then(res => {
        console.log(res);
        getNotes();
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <h1>Notes</h1>
      <hr />
      <ul>
        {notes.map( note =>
          <li key={ note._id } >
            {
              edit === note._id ?
              <textarea 
                autoFocus
                onBlur={ e => update(e, note._id) }
              >
                { note.text }
              </textarea> : 
              <span onClick={e => thing(e, note._id)}>
                { note.text }
              </span>
            }
            <a href="#" onClick={(e) => remove(e, note._id)}>&times;</a>
          </li>
        )}
      </ul>
      <form onSubmit={ addNote }>
        <div>
          <textarea 
            placeholder="Your note here..."
            rows="5"
            cols="50"
            onChange={ e => setText(e.target.value) }
            value={ text }
          >
          </textarea>
          { errors.text ? <p>{ errors.text.message }</p> : "" }
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
