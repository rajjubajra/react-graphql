
function RepoInfo({repo}) {

  let licence;

  switch(repo.licenseInfo){
     case null:
       licence = 'No Licence';
       break;
      case 'NOASSERTION':
        licence = repo.licenseInfo?.spdxId; /** '?' rectifies error */
        break;
      default:
        licence = repo.licenseInfo?.spdxId;/** '?' rectifies error */
  }



  return (
    <li className='list-group-item'>
    <a className="h5 mb-0 text-decoration-none" href={repo.url}>{repo.name}</a>
    <ul className="small">
      <li>Description: {repo.description}</li>
      <li>Licence Info: {licence}</li>
      <li>Subscription: <p className={`py-0 px-2 ms-1 small d-inline-block ${repo.viewerSubscription === "SUBSCRIBED" 
    ? 'btn-success' 
    : 'btn-primary'}`}>{repo.viewerSubscription}</p></li> 
    </ul>
    </li>
  ) 
}

export default RepoInfo
