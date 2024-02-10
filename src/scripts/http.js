async function adminSignIn(pass) {
    return fetch('/api/auth/adminSignIn', {
        method: 'POST',
        headers: {
          'content-type':'application/json',
        },
        body: JSON.stringify({pass})
      })
    .then(res => res.json())
}
async function orderHistory(email) {
  return fetch('/api/orderHistory', {
      method: 'POST',
      headers: {
        'content-type':'application/json',
      },
      body: JSON.stringify({email})
    })
  .then(res => res.json())
}
async function getImages(sku) {
  return fetch(`/api/images/${sku}`, {
    method: 'POST',
    headers: {
      'content-type':'application/json',
    }
  }).then(res => res.json())
}

const http = {
    adminSignIn,
    orderHistory,
}
export default http;