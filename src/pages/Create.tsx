import Form from "../components/Form";
import { NoteData, Tag } from "../types";

export type CreateProps = {
  createTag: (tag: Tag) => void;
  handleSubmit: (noteData: NoteData) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

const Create = ({ createTag, handleSubmit, availableTags }: CreateProps) => {
  return (
    <div className="container py-5">
      <h2>Yeni Not Oluştur</h2>

      <Form
        createTag={createTag}
        handleSubmit={handleSubmit}
        availableTags={availableTags}
      />
    </div>
  );
};

export default Create;
