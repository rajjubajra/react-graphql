

function NavButton({start, end, previous, next, onPage}) {
  return (
    <div className="d-flex justify-content-center my-2">
      Page Button
      {
        previous && <button className="btn bi bi-arrow-left mx-1" 
        onClick={()=>onPage('last', 'before: "' +  start + ' " ' )}>Prev</button>
      }
      {
        next && <button className="btn bi bi-arrow-right mx-1" 
        onClick={()=>onPage('first', 'after: "' +  end + ' " ' )}>Next</button>
      }
        
    </div>  
  )
}

export default NavButton
