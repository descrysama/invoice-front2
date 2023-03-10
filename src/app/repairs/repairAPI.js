export async function fetchRepairAPI() {

    const response = await fetch(process.env.REACT_APP_API_URL + '/repair/', {
      method: 'GET',
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

export async function createRepairAPI(formContent) {
  const response = await fetch(process.env.REACT_APP_API_URL + "/repair/", {
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

export async function searchRepairAPI(query) {
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

export async function updateRepairAPI(formContent) {
  const response = await fetch(process.env.REACT_APP_API_URL + "/repair/" + formContent.id, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Credentials': 'true'
    },
    body: JSON.stringify({libelle: formContent.libelle, price: formContent.price, category: formContent.category}),
    credentials: 'include',
  });

  const data = await response.json();
  return data;
}

export async function deleteRepairAPI(repair_id) {

  const response = await fetch(process.env.REACT_APP_API_URL + '/repair/' + repair_id, {
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