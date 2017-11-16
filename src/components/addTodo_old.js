import React from "react";

const style = {
    border: 'solid 1px black'
};


class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleVal: '',
      bodyVal: ''
    };
    this.titleChange = this.titleChange.bind(this);
    this.bodyChange = this.bodyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  titleChange(event) {
    this.setState({titleVal: event.target.value});
  }

  bodyChange(event) {
    this.setState({bodyVal: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {addTodo}= this.props;
    const {titleVal, bodyVal}= this.state;
    const data = {
      title: titleVal,
      description: bodyVal,
      id: Math.floor( Math.random() * 10000000 + Math.random() * 1000 ),
      created_at: Date.now()
    };
    addTodo(data);
  }
    
  render() { 
    const {titleVal, bodyVal}= this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input type="text"  size="100" value={titleVal} onChange={this.titleChange} />
        </label>
        <label>
          Body:
          <textarea type="text"  size="100" value={bodyVal} onChange={this.bodyChange} />
        </label>
        <input type="submit" value="ADD" />
      </form>
    );
  }
}







export default AddTodo;