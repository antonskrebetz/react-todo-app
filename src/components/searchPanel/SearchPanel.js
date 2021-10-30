import { Component } from 'react';
import './SearchPanel.scss';

class SearchPanel extends Component {
  state = {
    term: ''
  }

  onChangeSearch = (e) => {
    const term = e.target.value;
    this.setState({
      term: term
    })
    this.props.onSearch(term);
  }

  render() {
    return (
      <input type="text"
        className="form-control search-input"
        placeholder="type to search"
        value={this.state.term} 
        onChange={this.onChangeSearch}  
      />
    )
  }
}

export default SearchPanel;