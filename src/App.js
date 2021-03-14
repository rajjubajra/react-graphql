import github from './db';
import {useEffect, useState, useCallback} from 'react';
import query from './Query';
import RepoInfo from './RepoInfo';
import SearchBox from './SearchBox';
import NavButton from './NavButton';

function App() {

  const [userName, setUserName] = useState("");
  const [repoList, setRepoList] = useState(null);
  const [pageCount, setPageCount] = useState(5);
  const [queryString, setQueryString] = useState('');
  const [totalCount, setTotalCount] = useState(null)

  const [startCursor, setStartCursor] = useState(null);
  const [endCursor, setEndCursor] = useState(null);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [paginationKeyword, setPaginationKeyword] = useState('first');
  const [paginationString, setPaginationString] = useState("");

  

  const fetchData = useCallback(()=>{

    const queryText = JSON.stringify(query(pageCount, queryString, paginationKeyword, paginationString));

    fetch(github.baseURL,{
      method: "POST",
      headers: github.headers,
      body: queryText
    })
    .then(response=>response.json())
    .then(data=>{
      console.log(data);
      const viewer = data.data.viewer;
      const repo = data.data.search.edges;
      const total = data.data.search.repositoryCount;
      const start = data.data.search.pageInfo?.startCursor;
      const end = data.data.search.pageInfo?.endCursor;
      const next = data.data.search.pageInfo?.hasNextPage;
      const prev = data.data.search.pageInfo?.hasPrevPage;
      setUserName(viewer.name);
      setRepoList(repo);
      setTotalCount(total);
      setStartCursor(start);
      setEndCursor(end);
      setHasNextPage(next);
      setHasPrevPage(prev);
    })
    .catch(err => console.log(err))
  },[pageCount, paginationKeyword, paginationString, queryString])

  useEffect(()=>{
    fetchData()
  },[fetchData])


  return (
    <div className="App container mt-5">
      <h1><i className="bi bi-diagram-2-fill"></i>
      React Graphql </h1>
      <h1>{userName}</h1>
      <SearchBox 
      totalCount={totalCount}
      pageCount={pageCount}
      onQueryChange={(myString)=>setQueryString(myString)}
      onTotalChanage={(myNumber)=>setTotalCount(myNumber)}
      />

      <div>
        <p><b>Search For:</b> {queryString} | 
        <b>Item Per Page:</b> {pageCount} | 
        <b>Total Result:</b> {totalCount}</p>
      </div>
      <ul className="list-group list-group-flush">
        {
          repoList &&
          repoList.map(repo=>(<RepoInfo key={repo.node.id} repo={repo.node} />))
        }
      </ul>
      <NavButton 
      start={startCursor} 
      end={endCursor} 
      next={hasNextPage} 
      previous={hasPrevPage} 
      onPage={(mykeyword,myString)=>{
        setPaginationKeyword(mykeyword);
        setPaginationString(myString)
      }}
      />
    </div>
  );
}

export default App;
