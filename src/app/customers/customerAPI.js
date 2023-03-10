export async function fetchCustomersByPageAPI(payload) {
    //page : number
    // query: {firstname, lastname, address, email}
    const response = await fetch(process.env.REACT_APP_API_URL + '/customer/page/' + payload.page, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Credentials': 'true'
      },
      credentials: 'include',
      body: payload.query ? JSON.stringify({query: payload.query}) : null
    });
    const data = await response.json();
    return data;
}

export async function createCustomerAPI(formContent) {
    // firstname, lastname, tel, email, address
  const response = await fetch(process.env.REACT_APP_API_URL + "/customer/", {
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

export async function deleteCustomerAPI(customer_id) {
  const response = await fetch(process.env.REACT_APP_API_URL + "/customer/" + customer_id, {
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

export async function updateCustomerAPI(formContent) {
  const response = await fetch(process.env.REACT_APP_API_URL + "/customer/" + formContent.id, {
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