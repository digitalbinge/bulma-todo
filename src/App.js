import React, { Component } from 'react';
import { Input, Button, Panel } from 'reactbulma';
import './App.css';
import Header from './components/Header';
import Task from './components/Task';
import axios from 'axios';


class App extends Component {

  state = {
    tasks: [],
    searchPhrase: ''
  }

  onChangeQuery = (event) => {
    // Update the state with our search query
    this.setState({
      searchPhrase: event.target.value
    });
  }

  addTask = (event) => {
    // Stop the browser from submitting the form!
    event.preventDefault();

    const { tasks, searchPhrase } = this.state
    const existingItem = tasks.find((todo) => todo.name === searchPhrase)

    if (existingItem) {
      alert('Task already exists');
      return;
    }

    if (searchPhrase.trim() === '') {
      alert('Task must not be blank');
      return;
    }


    axios.post('/api/tasks', {
      name: this.state.searchPhrase
    })
      .then((response) => {
        console.log(response);
        this.setState(prevState => ({
          tasks: [...prevState.tasks, response.data],
          searchPhrase: ''
        }));
      })
      .catch((error) => {
        console.log(error);
      });

  }

  deleteTask = (id) => {
    axios.delete(`/api/tasks/${id}`)
      .then((response) => {
        console.log('response')
        const foundIndex = this.state.tasks.findIndex(task => task._id === id)
        console.log(foundIndex)
        this.setState(prevState => {
          const newTasks = [...prevState.tasks]
          newTasks.splice(foundIndex, 1)
          return { tasks: newTasks }
        });
      });
  }

  onToggleComplete = (id) => {
    const foundToDoIndex = this.state.tasks.findIndex(task => task._id === id)
    this.setState(prevState => {
      const tasks = prevState.tasks
      tasks[foundToDoIndex].complete = !tasks[foundToDoIndex].complete
      console.log(tasks)
      return {tasks}
    })
  }

  render() {
    const { tasks, searchPhrase } = this.state 
    const filteredTasks = tasks.filter(myTask => myTask.name.includes(searchPhrase)).reverse()

    return (
      <div className="App">

        <Header totalIncomplete={tasks.filter(task => !task.complete).length}
                totalComplete={tasks.filter(task => task.complete).length} 
                title="INCOMPLETE" />

        <form onSubmit={this.addTask} >
          <Input primary large 
            placeholder="Add task"
            value={searchPhrase}
            onChange={this.onChangeQuery} /> <br /><br />
          <Button primary >Submit</Button>
        </form>

        <Panel>
          <Panel.Heading>
            ToDo
          </Panel.Heading>
          {filteredTasks.map(todo => <Task key={todo._id} name={todo.name} time={todo.time} complete={todo.complete} onDeleteClick={stopPropagation(() => this.deleteTask(todo._id))} onClick={() => this.onToggleComplete(todo._id)} /> )}

        </Panel>

      </div>
    );
  }

  componentDidMount() {
    axios.get('/api/tasks')
      .then((response) => {

        console.log(response.data);
        this.setState({
          tasks: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

const stopPropagation = (fn) => (event) => {
  event.stopPropagation();
  if (fn) {
    fn(event);
  }
};

export default App;
