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
  componentDidMount(){
    this.getGithubRepos();
  }

  getGithubRepos(){
    $.get('/repos',(repos)=>{
      console.log(repos)
      this.setState({repos:repos});
    })

  }
  search (term) {
    console.log(`${term} was searched`);
    console.log(typeof term);
    // TODO

    $.ajax({
      url:'/repos',
      type:'POST',
      data:term,

      success:function(data){
        console.log('made a post request ');
        console.log(data)

      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <button onClick={this.getGithubRepos.bind(this)}>retreive all the repos</button>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));