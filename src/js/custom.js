function combineUrl (url, query) {
  let paramStr = ''
  for (let i in query) {
    if (query[i]) paramStr += '&' + i + '=' + encodeURIComponent(query[i])
  }
  paramStr = '/?' + paramStr.substr(1)
  return url + paramStr
}