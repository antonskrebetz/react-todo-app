import { Component } from "react";
import "./ItemFilter.scss";

class ItemFilter extends Component {
  btns = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "done", label: "Done" },
  ];

  render() {
    const {filter, onFilterChange} = this.props;

    const btns = this.btns.map((btn) => {
      const isActive = filter === btn.name;
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
      return (
        <button type="button" 
          className={'btn ' + clazz} 
          key={btn.name}
          onClick={() => onFilterChange(btn.name)}
        >
          {btn.label}
        </button>
      );
    });
    return <div className="btn-group">{btns}</div>;
  }
}

export default ItemFilter;
