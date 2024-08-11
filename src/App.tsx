import { BrowserRouter, Route, Routes, useAsyncValue } from "react-router-dom";
import Main from "./pages/Main";
import Create from "./pages/Create";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import { v4 } from "uuid";

import { useLocalStorage } from "@uidotdev/usehooks";
import { Tag, NoteData, Note } from "./types";
import Layout from "./components/Layout/index";

const App = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);

  const createTag = (tag: Tag): void => {
    setTags([...tags, tag]);
  };

  const createNote = (noteData: NoteData): void => {
    const newNote: Note = { id: v4(), ...noteData };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id: string): void => {
    setNotes(notes.filter((i) => i.id !== id));
  };

  const updateNote = (id: string, updatedData: NoteData): void => {
    const updatedArr = notes.map((note) =>
      note.id === id ? { id, ...updatedData } : note
    );
    setNotes(updatedArr);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main notes={notes} availableTags={tags} />} />
        <Route
          path="/new"
          element={
            <Create
              handleSubmit={createNote}
              createTag={createTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/note/:id" element={<Layout notes={notes} />}>
          <Route index element={<Detail deleteNote={deleteNote} />} />
          <Route
            path="edit"
            element={
              <Edit
                handleSubmit={updateNote}
                createTag={createTag}
                availableTags={tags}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
