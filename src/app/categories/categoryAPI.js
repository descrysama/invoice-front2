export async function fetchCategoriesAPI() {

    const response = await fetch(process.env.REACT_APP_API_URL + '/category/', {
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

export async function searchCategoriesAPI(query) {
  const response = await fetch(process.env.REACT_APP_API_URL + "/query/", {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Credentials': 'true'
    },
    body: JSON.stringify({model: "category", field: "libelle", content: query }),
    credentials: 'include',
  });

  const data = await response.json();
  return data;
}

export async function addCategoryAPI(libelle) {
  const response = await fetch(process.env.REACT_APP_API_URL + "/category/", {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Credentials': 'true'
    },
    body: JSON.stringify({libelle: libelle}),
    credentials: 'include',
  });

  const data = await response.json();
  return data;
}

export async function updateCategoryAPI(formContent) {
    const response = await fetch(process.env.REACT_APP_API_URL + "/category/" + formContent.id, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify({libelle: formContent.libelle}),
      credentials: 'include',
    });
  
    const data = await response.json();
    return data;
}

export async function deleteCategoryAPI(category_id) {

    const response = await fetch(process.env.REACT_APP_API_URL + '/category/' + category_id, {
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