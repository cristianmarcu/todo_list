import React, { useState } from "react";
import ActionBar from "./components/ActionBar";
import InputArea from "./components/InputArea";
import ToDoItem from "./components/ToDoItem";
import { getEnv } from './modules/EnvService';
import LocalStorageDB from './modules/LocalStorageDB';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function App() {
  const [toDoList, setToDoList] = useState(LocalStorageDB.getRecords('todo'));
  const [activeState, setActiveState] = useState('All');

  const addItem = (inputText) => {
    const newTodo = { body: inputText, isCompleted: false };
    const newRecord = LocalStorageDB.addRecord('todo', newTodo);
    setToDoList((prevState) => prevState.concat(newRecord))
  }
  const deleteItem = (id) => {
    LocalStorageDB.removeRecord('todo', 'id', id);
    setToDoList((prevState) => prevState?.filter((row) => row.id !== id));
  }

  const toggleTodoState = (id, isCompleted) => {
    LocalStorageDB.updateRecord('todo', 'id', id, { isCompleted });
    setToDoList((prevState) => prevState?.map((row) => (row.id !== id ? row : { ...row, isCompleted })));
  }

  const onClearCompleted = () => {
    const completedIds = toDoList.filter((row) => row.isCompleted)?.map((completed) => completed.id);
    LocalStorageDB.removeMultiple('todo', completedIds);
    setToDoList((prevState) => prevState?.filter((row) => completedIds.indexOf(row.id) === -1));
  }
  const onActiveStateChanged = (newActiveState) => {
    setActiveState(newActiveState);
    const allTodoList = LocalStorageDB.getRecords('todo');
    if(newActiveState === 'All') {
      setToDoList(allTodoList);
      return;
    }
    if(newActiveState ==='Active') {
      setToDoList(allTodoList.filter((row) => !row.isCompleted));
      return;
    }
    if(newActiveState === 'Completed'){
      setToDoList(allTodoList.filter((row) => row.isCompleted));
    }
  }
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const {source: {index: sourceIndex}, destination: {index: destinationIndex}} = result;
    const [reorderedItem] = toDoList.splice(sourceIndex, 1);
    toDoList.splice(destinationIndex, 0, reorderedItem);
  }
  return (
    <div className='container'>
      <div className='heading'>
        <h1 className="brand">{getEnv('HEADER_TITLE')}</h1>
        <div className="contents">
        <InputArea onAdd={addItem} />
        </div>
      </div>
      <div className="contents">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId={`dnd_`}>
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
          {toDoList.map((todoItem, index) => (
              <ToDoItem
                key={`index_of_${todoItem.id}`}
                index={index}
                todoItem={todoItem}
                onChecked={deleteItem}
                toggleTodoState={toggleTodoState}
              />
          ))}
          <li>
            <ActionBar
              numberOfItems={toDoList.length}
              activeState={activeState}
              onClearCompleted={onClearCompleted}
              onStateChanged={onActiveStateChanged}/>
          </li>
                {provided.placeholder}
        </ul>

            )}
              </Droppable>
              </DragDropContext>
      </div>
      <div className="drag_drop">Drag and drop to reorder list</div>
    </div>
  );
}

export default App;
