import React, { Component } from 'react';
import './App.css';
var uuid = require('uuid');
var firebase = require('firebase');


 var config = {
    apiKey: "AIzaSyBd0KqMG5jUrBmxPG5dG3AnBjzUojXEm14",
    authDomain: "simplesurvey-7048b.firebaseapp.com",
    databaseURL: "https://simplesurvey-7048b.firebaseio.com",
    projectId: "simplesurvey-7048b",
    storageBucket: "simplesurvey-7048b.appspot.com",
    messagingSenderId: "833853806223"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: uuid.v1(),
      name:'',
      answers: {
        q1:'',
        q2:'',
        q3:'',
        q4:''
      },
      submitted: false
    }
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }

  
  handleQuestionSubmit(event) {
    firebase.database().ref('survey/' + this.state.id).set({
      name: this.state.name,
      answers: this.state.answers
    });

    this.setState({ submitted: true }, function(){
      console.log('Question is submited');
    });
    event.preventDefault();

  }

  handleQuestionChange(event){
      
      var answers = this.state.answers;
      if(event.target.name === 'q1'){
          answers.q1 = event.target.value;
      } else if(event.target.name === 'q2') {
          answers.q2 = event.target.value;
      } else if(event.target.name === 'q3') {
          answers.q3 = event.target.value;
      } else if(event.target.name === 'q4') {
          answers.q4 = event.target.value;
     }
      this.setState({ answers: answers },  function(){
        console.log(this.state);
      })
  }

  handleNameSubmit(event){
    var name = this.refs.name.value;
    this.setState({ name: name }, function(){
    console.log(this.state)
  });
    event.preventDefault();
  }

  render() {
    var user;
    var questions;
    if(this.state.name && this.state.submitted === false){
      user = <h2>Welcome { this.state.name}</h2>
      questions = 
        <span>
           <h3>Survey Questions</h3>
        <form onSubmit={ this.handleQuestionSubmit.bind(this) }>
          <div>
            <label>What is your favorite operating system?</label><br />
            <input type="radio" name="q1" value="Windows" onChange={this.handleQuestionChange} />Windows<br />
            <input type="radio" name="q1" value="OSX" onChange={this.handleQuestionChange} />OSX<br />
            <input type="radio" name="q1" value="Linux" onChange={this.handleQuestionChange} />Linux<br />
            <input type="radio" name="q1" value="Solaris" onChange={this.handleQuestionChange} />Solaris<br />
            <input type="radio" name="q1" value="Other" onChange={this.handleQuestionChange} />Other<br />
          </div>
          <div>
          <label>What is your favorite brand of TV?</label><br />
          <input type="radio" name="q2" value="Sony" onChange={this.handleQuestionChange} />Sony<br />
          <input type="radio" name="q2" value="Samsung" onChange={this.handleQuestionChange} />Samsung<br />
          <input type="radio" name="q2" value="Panasonic" onChange={this.handleQuestionChange} />Green<br />
          <input type="radio" name="q2" value="Vizio" onChange={this.handleQuestionChange} />Vizio<br />
          <input type="radio" name="q2" value="Other" onChange={this.handleQuestionChange} />Other<br />
        </div>
        <div>
          <label>What is your favorite Smartphone Brand?</label><br />
          <input type="radio" name="q3" value="Aple" onChange={this.handleQuestionChange} />Apple<br />
          <input type="radio" name="q3" value="Samsung" onChange={this.handleQuestionChange} />Samsung<br />
          <input type="radio" name="q3" value="Nexus" onChange={this.handleQuestionChange} />Nexus<br />
          <input type="radio" name="q3" value="Blackberry" onChange={this.handleQuestionChange} />Blackberry<br />
          <input type="radio" name="q3" value="Other" onChange={this.handleQuestionChange} />Other<br />
        </div>
        <div>
          <label>What is your favorite CPU Brand?</label><br />
          <input type="radio" name="q4" value="Intel" onChange={this.handleQuestionChange} />Intel<br />
          <input type="radio" name="q4" value="AMD" onChange={this.handleQuestionChange} />AMD<br />
          <input type="radio" name="q4" value="Nvidia" onChange={this.handleQuestionChange} />Nvidia<br />
          <input type="radio" name="q4" value="ARM" onChange={this.handleQuestionChange} />ARM<br />
          <input type="radio" name="q4" value="Other" onChange={this.handleQuestionChange} />Other<br />
        </div>
        <input type="submit" value="Submit" />
        </form>
        </span>
    } else if (!this.state.name && this.state.submitted === false) {
      user = 
      <span>
        <h2>Please enter your name to begin your survey</h2>
        <form onSubmit= { this.handleNameSubmit.bind(this) } >
          <input type='text' placeholder="Enter name..." ref='name' />
        </form>
      </span>
      questions=''
    } else if(this.state.submitted === true) {
        user = 
        <h2>Thank you for the survey { this.state.name } </h2>
    }
      
    return (
      <div className="App ">
        <div className="App-header text-center">
          <h2>Simple Survey</h2>
        </div>
        <div className='text-center'>
          { user }
        </div>
         <div className='container'>
            { questions }
         </div>   
        
      </div>
    );
  }
}

export default App;
