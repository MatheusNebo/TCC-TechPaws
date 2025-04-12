const url = 'http://localhost:3333/';
export async function get(endponit) {

    const response = await fetch(url + endponit);
    const data = await response.json();
    return data;
}

export async function teste(method, endponit, data, params) {
  if(params != ''){
    endponit= endponit+params
  }
  console.log(endponit)
  
    const response = await fetch(url + endponit, {

        method: method,
        headers: {
            'Content-Type': 'application/json',
          },
        body: data ? JSON.stringify(data) : null,
      });
  
};