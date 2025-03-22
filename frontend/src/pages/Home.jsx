import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Notes"
import "../styles/Home.css"

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/note/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete.");
        getNotes();
      })
      .catch((error) => alert(error));
    
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to make Note.");
        getNotes();
      })
      .catch((err) => alert(err));
    
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
      </div>
      <div>
        <h2>Create a Note</h2>
        {notes.map((note) =>(
            <Note note={note} onDelete={deleteNote} key={note.id}/>
        ))}
        <form onSubmit={createNote}>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="content">Content:</label>
          <br />
          <textarea
            name="content"
            id="content"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <br />
          <input type="submit" value="submit" />
        </form>
      </div>
    </div>
  );
}

export default Home;
