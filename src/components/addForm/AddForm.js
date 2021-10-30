import { Component } from 'react';
import './AddForm.scss';

class AddForm extends Component {
  state = {
    label: ''
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAddItem(this.state.label);
    this.setState({
      label: ''
    })
  }

  render() {
    return (
      <form 
        className="add-form d-flex"
        onSubmit={this.onSubmit}
      >
        <input type="text" 
          className="form-control"
          onChange={this.onLabelChange}
          placeholder={'What you need'}
          value={this.state.label}/>
        <button className="btn btn-warning add-new-item">
          Add item
        </button>
      </form>
    )
  }
}

export default AddForm;