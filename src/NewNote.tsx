import { NoteForm } from "./NoteForm.tsx";
import { NoteDataProps } from "./NoteForm.tsx";

export const NewNote = ({ onSubmit, addTag, availableTags }: NoteDataProps) => {
  return (
    <>
      <h2 className="mb-4"> New Note</h2>
      <NoteForm
        onSubmit={onSubmit}
        addTag={addTag}
        availableTags={availableTags}
      />
    </>
  );
};
