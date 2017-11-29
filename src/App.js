import React, { Component } from 'react';
import { Input, Button, Panel } from 'reactbulma';
import './App.css';
import Header from './components/Header';
import Task from './components/Task';

let currentId = 50;

const genId = () => currentId++;

class App extends Component {

  state = {
    tasks: [
      { id: 1, name: 'Do the washing', date: '29/11/2017, 12:34:12', complete: true },
      { id: 2, name: 'Do the fadsfsd', date: '29/11/2017, 13:45:23', complete: false },
      { id: 3, name: 'Do the washdfggdfd', date: '29/11/2017, 14:58:44', complete: false }
    ],
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
    // Make a copy of the current tasks
    const newTasks = [...this.state.tasks];

    // Add the new task to our copy of tasks
    newTasks.unshift({
      id: genId(),
      name: this.state.searchPhrase,
      date: new Date()
    });

    // Update the state with the new tasks
    // Reset the search phrase to an empty string
    this.setState({
      tasks: newTasks,
      searchPhrase: ''
    });

  }

  onToggleComplete = (id) => {
    const foundToDoIndex = this.state.tasks.findIndex(task => task.id === id)
    this.setState(prevState => {
      const tasks = prevState.tasks
      tasks[foundToDoIndex].complete = !tasks[foundToDoIndex].complete
      console.log(tasks)
      return {tasks}
    })
  }

  render() {
    const { tasks, searchPhrase } = this.state 
    const filteredTasks = tasks.filter(myTask => myTask.name.includes(searchPhrase))

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
          {filteredTasks.map(todo => <Task key={todo.id} name={todo.name} date={todo.date} complete={todo.complete} onClick={() => this.onToggleComplete(todo.id)} /> )}

        </Panel>

      </div>
    );
  }
}

export default App;
