import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    //post request to server
    $.ajax({
      url: '/repos',
      type: 'POST',
      data: {username: term},
      success: () => {
        console.log('Succesful POST Request')
      } ,
      error: (err) => {
        console.log('Err completing POST request!')
      }
    })
  }

  componentDidMount(){
    //send get request to the db
    $.ajax({
      url: '/repos',
      type: 'GET',
      success: (data) => {
        this.setState({repos: data });
      } ,
      error: (err) => {
        console.log('Err completing GET request!')
      }
    })
  }

  render () {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <div className="repoContainer">
          <RepoList repos={this.state.repos}/>
        </div>
        <div className="formContainer">
          <Search onSearch={this.search.bind(this)}/>
        </div>
      </div>

    )}
}

ReactDOM.render(<App />, document.getElementById('app'));