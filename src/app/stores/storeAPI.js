
export async function Login(credentials) {

    const response = await fetch(process.env.REACT_APP_API_URL + "/auth/login", {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify(credentials),
      credentials: 'include',
    });

    const data = await response.json();
    return data;
}

export async function CheckAuth() {

  const response = await fetch(process.env.REACT_APP_API_URL + "/auth/checkauth", {
    method: 'POST',
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

export async function Logout() {

  const response = await fetch(process.env.REACT_APP_API_URL + '/auth/logout', {
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

export async function UpdateStore(store){
  const formData = new FormData();
  formData.append('store', JSON.stringify(store));
  formData.append('image', store.image);
  const response = await fetch(process.env.REACT_APP_API_URL + '/store/' + store.id, {
    method: 'PUT',
    headers: { 
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Credentials': 'true'
    },
    body: formData,
    credentials: 'include',
  });
  const data = await response.json();
  return data;
}

export async function GetProductMostSold(){
  const response = await fetch(process.env.REACT_APP_API_URL + '/product/stats/most-sold', {
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
export async function GetRepairMostSold(){
  const response = await fetch(process.env.REACT_APP_API_URL + '/repair/stats/most-sold', {
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

export async function GetInvoicesByMonth(){
  const response = await fetch(process.env.REACT_APP_API_URL + '/invoice/stats/get-invoices-by-month', {
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

export async function GetInvoicesByWeek(){
  const response = await fetch(process.env.REACT_APP_API_URL + '/invoice/stats/get-invoices-by-week', {
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
export async function GetInvoicesByHour(){
  const response = await fetch(process.env.REACT_APP_API_URL + '/invoice/stats/get-invoices-by-hour', {
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
export async function GetInvoicesByPages(datas){
  const response = await fetch(process.env.REACT_APP_API_URL + '/invoice/page/' + datas.page, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Credentials': 'true'
    },
    body: JSON.stringify(datas),
    credentials: 'include',
  });
  const data = await response.json();
  return data;
}

export async function fetchSingleQuoteAPI(quote_id) {
  const response = await fetch(process.env.REACT_APP_API_URL + '/quote/' + quote_id, {
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

export async function createInvoiceAPI(datas){
  const response = await fetch(process.env.REACT_APP_API_URL + '/invoice/', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Credentials': 'true'
    },
    body: JSON.stringify(datas),
    credentials: 'include',
  });
  const data = await response.json();
  return data;
}

export async function RemoveInvoiceAPI(invoice_id){
  const response = await fetch(process.env.REACT_APP_API_URL + '/invoice/' + invoice_id, {
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