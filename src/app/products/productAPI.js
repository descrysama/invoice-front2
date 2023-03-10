export async function fetchProductsByPageAPI(payload) {

    const response = await fetch(process.env.REACT_APP_API_URL + '/product/page/' + payload.page, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Credentials': 'true'
      },
      credentials: 'include',
      body: JSON.stringify({filter: payload.filter, query: payload.query})
    });
    const data = await response.json();
    return data;
}

export async function createProductAPI(formContent) {
  const response = await fetch(process.env.REACT_APP_API_URL + "/product/", {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Credentials': 'true'
    },
    body: JSON.stringify(formContent),
    credentials: 'include',
  });

  const data = await response.json();
  return data;
}

export async function deleteProductAPI(product_id) {
  const response = await fetch(process.env.REACT_APP_API_URL + "/product/" + product_id, {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Credentials': 'true'
    },
    credentials: 'include',
  });

  const data = await response.json();
  return data;
}

export async function updateProductAPI(formContent) {
  const response = await fetch(process.env.REACT_APP_API_URL + "/product/" + formContent.id, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Credentials': 'true'
    },
    body: JSON.stringify(formContent),
    credentials: 'include',
  });

  const data = await response.json();
  return data;
}