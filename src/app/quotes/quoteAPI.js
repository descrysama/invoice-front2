

export async function fetchQuotesByPageAPI(payload) {
  const response = await fetch(process.env.REACT_APP_API_URL + "/quote/page/" + payload.page, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Credentials': 'true'
    },
    body: JSON.stringify({query: payload.query}),
    credentials: 'include',
  });

  const data = await response.json();
  return data;
}

export async function fetchClientsForSearchAPI(payload) {
    const response = await fetch(process.env.REACT_APP_API_URL + '/customer/page/' + 1, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Credentials': 'true'
      },
      credentials: 'include',
      body: payload ? JSON.stringify({query: payload}) : null
    });
    const data = await response.json();
    return data;
}

export async function fetchSingleUserAPI(payload) {
  const response = await fetch(process.env.REACT_APP_API_URL + '/customer/' + payload, {
    method: 'GET',
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

export async function setRepairListAPI(repair_id) {
  const response = await fetch(process.env.REACT_APP_API_URL + '/repair/' + repair_id, {
    method: 'GET',
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

export async function setRepairSearchAPI(query) {
  const response = await fetch(process.env.REACT_APP_API_URL + "/query/", {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Credentials': 'true'
    },
    body: JSON.stringify({model: "repair", field: "libelle", content: query }),
    credentials: 'include',
  });

  const data = await response.json();
  return data;
}

export async function createQuoteAPI(payload) {
  const response = await fetch(process.env.REACT_APP_API_URL + "/quote", {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Credentials': 'true'
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  });

  const data = await response.json();
  return data;
}

export async function deleteQuoteAPI(quote_id) {

  const response = await fetch(process.env.REACT_APP_API_URL + '/quote/' + quote_id, {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Credentials': 'true'
    },
    credentials: 'include'
  });
  const data = await response.json();
  return data;
}
