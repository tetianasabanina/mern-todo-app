import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    
    delete() {
        axios.get('http://localhost:4000/todos/delete/'+this.props.todo._id)
            .then(console.log('Deleted'))
            .catch(err => console.log('Not deleted',err))
    }

    render() {
        return (
            <tr>
                <td className={this.props.todo.todo_completed ? 'completed' : ''}>{this.props.todo.todo_description}</td>
                <td className={this.props.todo.todo_completed ? 'completed' : ''}>{this.props.todo.todo_responsible}</td>
                <td className={this.props.todo.todo_completed ? 'completed' : ''}>{this.props.todo.todo_priority}</td>
                <td>
                    <Link to={"/edit/"+this.props.todo._id} className="btn btn-outline-primary">Edit</Link>
                </td>
                <td>
                <button onClick={this.delete} className="btn btn-outline-danger">Delete</button>
                </td>
            </tr>
        )}
}
export default class TodosList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {todos: []};
        
    }

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                if (this._isMounted) {
                this.setState({ todos: response.data });
                }
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                if (this._isMounted) {
                this.setState({ todos: response.data });
                }
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    todoList() {
        return this.state.todos.map(function(currentTodo, i) {
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}