import React, { Component } from 'react';
import './App.css';
import Table from './components/Table';
import Search from './components/Search';


//API config
const DEFAULT_QUERY = 'all';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

  
class App extends Component {
  constructor(){
    super();
    //here searchText is set to DEFAULT_QUERY which will return the result for keyword "redux"
    //refer line 8 to change
    this.state={
      searchText:'',
      result:'',
      isLoading:true
    }
    this.onDismiss=this.onDismiss.bind(this);
    this.onSearchChange=this.onSearchChange.bind(this);
    this.searchStories=this.searchStories.bind(this);

    //this.isSearched=this.isSearched.bind(this);
  }

  //to add a delete button
  onDismiss=(id)=>{
    //filter out item array and return results with no matched id
    //const isNot=item=>item.objectID!==id;
    const deleteList=this.state.result.hits.filter(item=>item.objectID!==id);
    //setting state of list to lastest deleteList
    this.setState({
      result:{...this.state.result,hits:deleteList}
    })  
  }
  
  //to add a search bar
  onSearchChange=(e)=>{
    //set state to value in search bar
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  
  searchStories=(result)=>{
    this.setState({
      result,
      isLoading:false
    });
  }
  //after mounting will fetch the api data
  componentDidMount(){
    fetch(url)
    .then(response => response.json())
    .then(result => this.searchStories(result));
  }
  
  render() {
    const {result,searchText}=this.state;
    //conditional rendering in Table
    //if result fetched then display table else only search
    return(
      <div className="page">
          <div className="interactions">

        <Search
       searchText={searchText}
       onSearchChange={this.onSearchChange}
       >
        Search
        </Search>
        </div>
    {this.state.isLoading?<Loading/>:
    result?<Table
       list={result.hits}
       onDismiss={this.onDismiss}
       searchText={searchText}/> 
        :null
       }
       
      </div>
      
    )
  
  }
}

const Loading=(props)=>{
  return(
    <div>
      loading...............
    </div>
  );
}

export default App;
