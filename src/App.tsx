import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { NewNote } from "./NewNote.tsx";
import { NoteList } from "./NoteList.tsx";
import { Note } from "./Note.tsx";
import { useLocalStorage } from "./UseLocalStorage.ts";
import { useMemo } from "react";
import uuid4 from "uuid4";
import { NoteLayout } from "./NoteLayout.tsx";
import { EditNote } from "./EditNote.tsx";

export type Note = {
  id: string;
} & NoteData;
export type NoteData = {
  title: string;
  markDown: string;
  tags: Tag[];
};
export type RawNote = {
  id: string;
} & RawNoteData;
export type RawNoteData = {
  title: string;
  markDown: string;
  tagIds: string[];
};

export type Tag = {
  id: string;
  label: string;
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const navigate = useNavigate();

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((previousNotes) => {
      return [
        ...previousNotes,

        { ...data, id: uuid4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
    navigate("..");
  };
  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((previousNotes) => {
      return previousNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
      return [
        ...previousNotes,

        { ...data, id: uuid4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
    navigate("..");
  };
  const onDeleteNote = (id: string) => {
    setNotes((previousNote) => {
      return previousNote.filter((note) => note.id !== id);
    });
    navigate("..");
  };
  const addTag = (tag: Tag) => {
    setTags((tags) => [...tags, tag]);
  };
  const onUpdateTag = (id: string, label: string) => {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  };
  const onDeleteTag = (id: string) => {
    setTags((previousTag) => {
      return previousTag.filter((tag) => tag.id !== id);
    });
  };
  return (
    <Container className="m-4">
      <Routes>
        <Route
          path="/"
          element={<NoteList availableTags={tags} notes={notesWithTags} updateTag={onUpdateTag} deleteTag={onDeleteTag}/>}
        ></Route>
        <Route
          path="/new"
          element={
            <h2>
              <NewNote
                onSubmit={onCreateNote}
                addTag={addTag}
                availableTags={tags}
              />
            </h2>
          }
        >
          <Route path="edit" element={<h2>Edit Tag</h2>}></Route>
        </Route>
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />}></Route>
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                addTag={addTag}
                availableTags={tags}
              />
            }
          ></Route>
        </Route>
        <Route path="*" element={<Navigate to={"/"} />}></Route>
      </Routes>
    </Container>
  );
}
export default App;
