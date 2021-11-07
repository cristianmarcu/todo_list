import React from "react";
import { Checkbox } from 'pretty-checkbox-react';
import { Draggable } from 'react-beautiful-dnd';

function ToDoItem(props) {
  const { todoItem, onChecked, toggleTodoState, index } = props;

  return (
    <Draggable key={`sub_${todoItem.id}`} draggableId={`dnd_${todoItem.id}`} index={index}>
      {(provided) => (
        <li className='todo-list-item' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Checkbox shape="round" variant="fill" animation="smooth" icon={
            <img
              src="images/checkbox.png"
              alt="check mark"
            />
          } checked={todoItem.isCompleted}
                    onChange={() => toggleTodoState(todoItem.id, !todoItem.isCompleted)}>
          </Checkbox>
          <div
            onClick={() => {
              onChecked(todoItem.id);
            }}>
            {todoItem.body}
          </div>
        </li>
      )}
    </Draggable>
  );
}

export default ToDoItem;
