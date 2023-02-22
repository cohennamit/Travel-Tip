export const utilService = {
    setQueryStringParams,
  }
  
  
  
  function setQueryStringParams(lat, lng) {
    const queryStringParams = `?lat=${lat}&lng=${lng}`
    const newUrl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
  }
  