import TodoListItem from "../todoListItem/TodoListItem";
import './TodoList.scss';

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {
  const elements = todos.map((el) => {
    return (
      <li className="list-group-item" key={el.id}>
        <TodoListItem 
          label={el.label} 
          important={el.important}
          done={el.done}
          onDeleted={() => onDeleted(el.id)} 
          onToggleImportant={() => onToggleImportant(el.id)}
          onToggleDone={() => onToggleDone(el.id)}
          />
      </li>
    );
  });

  return <ul className="list-group todo-list">{elements}</ul>;
};

export default TodoList;
