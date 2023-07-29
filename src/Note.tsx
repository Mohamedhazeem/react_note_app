import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "./NoteLayout.tsx";
import { Link } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown.js";

type NoteProps = {
    onDelete: (id: string) => void
}
export const Note = ({onDelete}: NoteProps) => {
  const note = useNote();

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack className="d-flex align-items-center justify-content-center h-100">
              {note.tags.length > 0 && (
                <Stack gap={1} direction="horizontal" className=" flex-wrap">
                  {note.tags.map((tag) => {
                    return (
                      <Badge key={tag.id} className="text-truncate">
                        {tag.label}
                      </Badge>
                    );
                  })}
                </Stack>
              )}
            </Stack>
          )}
        </Col>
        <Col xs="auto" sm="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button onClick={()=> onDelete(note.id)} variant="outline-danger ">Delete </Button>
            <Link to={"/"}>
              <Button variant="outline-secondary ">Back </Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markDown}</ReactMarkdown>
    </>
  );
};
