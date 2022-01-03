import { Component } from "react";
import { AddToItem } from "./AddToDoItem/AddToDoItem";
import "./styles.css";
//import { ToDoItem } from "./ToDoItem/ToDoItem";
import { ToDoList } from "./ToDoList/ToDoList";


export class ToDo extends Component {
    state = {
        items: [],
        inputValue: "",
        loading: true,
    };

    componentDidMount() {
        fetch('https://contact-agenda-rest-api.herokuapp.com/todo')
            .then((response) => response.json())
            .then(data => {
                this.setState({
                    //items: data,
                    items: data.list,
                    loading: false,
                });
            });
    }

    onInputChange = (event) => {
        this.setState({
            inputValue: event.target.value,
        });
    };

    onAddToItem = () => {
        const text = prompt('TODO text please!');
        text && this.setState({
            items: [this.state.inputValue, ...this.state.items],
            //inputValue: "",
        }, () => {
            fetch('https://contact-agenda-rest-api.herokuapp.com/todo', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                //body: JSON.stringify(this.state.items),
                body: JSON.stringify({list: this.state.items}),
            });
        });
    };

    toggleTodo(id) {
        this.setState({
          items: this.state.items.map((todo) => {
            if (todo.id !== id) return todo;
            return {
              id: todo.id,
              text: todo.text,
              checked: !todo.checked,
            };
          }),
        });
      }


    onRemoveItem = (itemIndex) => {
        this.setState({
            items: this.state.items.filter((_, index) => index !== itemIndex),
        },
        () => {
            fetch('https://contact-agenda-rest-api.herokuapp.com/todo', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                //body: JSON.stringify(this.state.items),
                body: JSON.stringify({list: this.state.items}),
            });
        });
    }

    render() {

      return (
        <div className="to-do">
            <h3 className="to-do__title">React To Do</h3>
            { this.state.loading ? (
            <p>Loading...</p> 
            ) : (
            <ToDoList items={this.state.items} onItemClick={this.onRemoveItem} /> 
            
            )} 
            
            <AddToItem 
            value={this.state.inputValue} 
            onChange={this.onInputChange}
            onClick={this.onAddToItem}
            onChecked={this.toggleTodo} />
        </div>
        );
        
    }
}