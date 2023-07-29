import { NoteData, Tag } from "./App.tsx";
import { NoteForm } from "./NoteForm.tsx";
import { useNote } from "./NoteLayout.tsx";
export type EditNoteProps = {
  onSubmit: (id:string,data: NoteData) => void;
  addTag: (data: Tag) => void;
  availableTags: Tag[];
};
export const EditNote = ({
  onSubmit,
  addTag,   
  availableTags,
}: EditNoteProps) => {

  const note = useNote();
  return (
    <>
      <h2 className="mb-4"> Edit Note</h2>
      <NoteForm
        title={note.title}
        markDown= {note.markDown}
        tags={note.tags}
        onSubmit={data =>onSubmit(note.id,data)}
        addTag={addTag}
        availableTags={availableTags}
      />
    </>
  );
};
