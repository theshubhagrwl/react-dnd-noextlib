import { Button, Title } from "@mantine/core";
import React, { useState, useRef } from "react";

const Dnd = () => {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);
  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log("Current", dragItem.current);
    console.log("drag start: ", e.target.innerText);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log("drag enter: ", e.target.innerText);
    //to make items reshuffle while dragging:
    //call drop() here
    //change dragItem.current = dragOverItem.current
    drop();
  };

  const drop = (e) => {
    const listCopy = [...items];
    const dragItemContent = listCopy[dragItem.current];
    listCopy.splice(dragItem.current, 1);
    listCopy.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = dragOverItem.current;
    dragOverItem.current = null;
    setItems(listCopy);
  };

  return (
    <>
      <Title order={1}>Drag and Drop without any external library</Title>
      <br />
      {items.map((item, index) => (
        <div key={index} style={{ marginBottom: "1vh", width: "30vw" }}>
          <Button
            fullWidth
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            // onDragEnd={drop}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            draggable
          >
            {item}
          </Button>
        </div>
      ))}
    </>
  );
};

export default Dnd;
