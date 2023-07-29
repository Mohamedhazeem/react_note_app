import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "./App.tsx";
import { useMemo, useState } from "react";
import style from "./NoteListStyle.module.css";

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
};
type SimplifiedNote = {
  id: string;
  title: string;
  tags: Tag[];
};
type EditTagModalProps = {
  availableTags: Tag[];
  show: boolean;
  handleClose: () => void;
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
};
export const NoteList = ({ availableTags, notes, updateTag, deleteTag}: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [editTagModelIsOpen, setEditTagModelIsOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tags) =>
            note.tags.some((someNote) => someNote.id === tags.id)
          ))
      );
    });
  }, [notes, selectedTags, title]);
  return (
    <>
      <Row className="align-items-center justify-content-center mb-4">
        <Col>
          <h2>Notes</h2>
        </Col>
        <Col xs="auto" sm="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={"/new"}>
              <Button variant="primary">Create </Button>
            </Link>
            <Link to={"/"}>
              <Button
                onClick={() => setEditTagModelIsOpen(true)}
                variant="outline-secondary"
              >
                Edit Tags
              </Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <Stack gap={4} className="mb-4">
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label> Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label> Tags</Form.Label>
              <ReactSelect
                className="fs-6"
               
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  return setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Stack>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
      <EditTagModal
        availableTags={availableTags}
        show={editTagModelIsOpen}
        handleClose={() => setEditTagModelIsOpen(false)}
        deleteTag={deleteTag}
        updateTag={updateTag}
      />
    </>
  );
};

const NoteCard = ({ id, title, tags }: SimplifiedNote) => {
  return (
    <>
      <Card
        as={Link}
        to={`/${id}`}
        className={`h-100 text-reset text-decoration-none ${style.card}`}
      >
        <Card.Body>
          <Stack className="d-flex align-items-center justify-content-center h-100">
            <span className="fs-5">{title}</span>
            {tags.length > 0 && (
              <Stack
                gap={1}
                direction="horizontal"
                className="justify-content-center flex-wrap"
              >
                {tags.map((tag) => {
                  return (
                    <Badge key={tag.id} className="text-truncate">
                      {tag.label}
                    </Badge>
                  );
                })}
              </Stack>
            )}
          </Stack>
        </Card.Body>
      </Card>
    </>
  );
};

const EditTagModal = ({
  availableTags,
  show,
  handleClose,
  deleteTag,
  updateTag
}: EditTagModalProps) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => {
              return (
                <Row key={tag.id}>
                  <Col>
                    <Form.Control type="text" value={tag.label} onChange={e => updateTag(tag.id,e.target.value)}></Form.Control>
                  </Col>
                  <Col xs="auto">
                    <Button onClick = {()=> deleteTag(tag.id)}variant="outline-danger">&times;</Button>
                  </Col>
                </Row>
              );
            })}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
