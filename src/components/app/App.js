import AppHeader from "../appHeader/AppHeader";
import TodoList from "../todoList/TodoList";
import SearchPanel from "../searchPanel/SearchPanel";
import ItemFilter from '../itemFilter/ItemFilter';
import AddForm from "../addForm/AddForm";
import './App.scss';
import { Component } from "react";

export default class App extends Component {
  maxId = 100;
  state = {
    todoData: [
      this.createTodoItem('Drink coffee'),
      this.createTodoItem('Make app'),
      this.createTodoItem('Learn React')
    ],
    term: '',
    filter: 'all'
  };

  createTodoItem(label) {
    return {
      label: label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex(el => el.id === id);
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      const newArr = [...before, ...after];
      return {
        todoData: newArr
      }
    })
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({todoData}) => {
      return {
        todoData: [...todoData, newItem]
      }
    })
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(el => el.id === id);
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  }

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  onSearchChange = (term) => {
    this.setState({
      term: term
    })
  }

  search(items, term) {
    if (term.length === 0) return items;
    return items.filter(item => item.label.toLowerCase().indexOf(term.toLowerCase()) > -1)
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(item => !item.done);
      case 'done':
        return items.filter(item => item.done);
      default:
        return items;
    }
  }

  onFilterChange = (filter) => {
    this.setState({
      filter: filter
    })
  }

  render() {
    const {todoData, term, filter} = this.state;
    const visibleItem = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearch={this.onSearchChange}/>
          <ItemFilter 
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>
        <TodoList 
          todos={visibleItem} 
          onDeleted={this.deleteItem} 
          onToggleDone={this.onToggleDone}
          onToggleImportant={this.onToggleImportant}
          />
        <AddForm onAddItem={this.addItem}/>
      </div>
    );
  }
}