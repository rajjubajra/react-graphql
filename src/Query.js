const GithubQuery = (pageCount, queryString, paginationKeyword, paginationString) => {

  return{
  query:`
  {
    viewer {
      name
    }
    search(query: "${queryString} user:rajjubajra sort:updated-date", type: REPOSITORY, ${paginationKeyword}: ${pageCount}, ${paginationString}) {
      repositoryCount
      edges {
        cursor
        node {
          ... on Repository {
            name
            description
            id
            url
            viewerSubscription
            licenseInfo {
              spdxId
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
  `,
}
};

export default GithubQuery;