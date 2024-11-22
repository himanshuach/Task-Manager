import React from 'react';

const TaskList = ({ tasks, onDeleteTask }) => (
    <ul>
        {tasks.map((task, index) => (
            <li key={index}>
                {task}
                <button onClick={() => onDeleteTask(index)}>Delete</button>
            </li>
        ))}
    </ul>
);

export default TaskList;
