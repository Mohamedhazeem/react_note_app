import { Form, Row, Col, Stack, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { FormEvent, useRef, useState } from "react";
import { NoteData, Tag } from "./App.tsx";
import uuid4 from "uuid4";

export type NoteDataProps = {
  onSubmit: (data: NoteData) => void;
  addTag: (data: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;
export const NoteForm = ({
  onSubmit,
  addTag,
  availableTags,
  title = "",
  markDown = "",
  tags = [],
}: NoteDataProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markDownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markDown: markDownRef.current!.value,
      tags: selectedTags,
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label> Title</Form.Label>
              <FormControl ref={titleRef} required defaultValue={title}></FormControl>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label> Tags</Form.Label>
              <CreatableSelect
                className="fs-5"
                onCreateOption={(label) => {
                  const newTag = { id: uuid4(), label };
                  addTag(newTag);
                  setSelectedTags((previousTags) => [...previousTags, newTag]);
                }}
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
        <Form.Group controlId="body">
          <Form.Label> Body</Form.Label>
          <FormControl
            ref={markDownRef}
            required
            defaultValue={markDown}
            as="textarea"
            rows={15}
          ></FormControl>
        </Form.Group>

        <Stack direction="horizontal" gap={2} className="justify-content-end ">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
};
