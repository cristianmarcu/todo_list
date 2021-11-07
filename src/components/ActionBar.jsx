import React from "react";

function ActionBar({ numberOfItems, activeState, onStateChanged, onClearCompleted}) {
  const availableStates = ['All', 'Active', 'Completed'];
  return (
    <div className="footer_menu">
      <div className="items_no">{numberOfItems} items</div>
      <div className="filter_items">
        {
          availableStates.map((state) => <span key={state} onClick={() => onStateChanged(state)} className={ activeState === state ? 'active' : ''}>{state}</span>)
        }
      </div>
      <div className="clear_completed" onClick={onClearCompleted}>Clear Completed</div>
    </div>
  );
}

export default ActionBar;
