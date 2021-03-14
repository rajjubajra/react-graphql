import React from 'react'

function SearchBox({totalCount, pageCount, queryString, onTotalChanage, onQueryChange}) {
  return (
    <form>
        <div className="row">
          <div className="col">
            <input 
            type="text" 
            className="form-control" 
            placeholder="Search" 
            value={queryString}
            onChange={(event)=>{onQueryChange(event.target.value)}}
            />
          </div>
          <div className="col">
            <input 
            type="text" 
            className="form-control" 
            placeholder="Page count" 
            value={pageCount}
            onChange={(event=> {onTotalChanage(event.target.value)})}
            />
          </div>
          <div className="col">
            Total: {totalCount}
          </div>
        </div>
    </form>
  )
}

export default SearchBox
