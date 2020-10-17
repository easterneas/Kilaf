export function createItem(payload) {
  return dispatch => {
    fetch('http://localhost:3001/item/create', {
      method: 'POST',
      headers: {
        access_token: localStorage.getItem('access_token')
      },
      body: payload
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: 'CREATE_ITEM',
          payload: data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
}