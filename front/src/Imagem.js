
const CLIENT_ID = 'd340f9835359bb8';


const doUpload = (url, options) => {
  const promiseCallback = (resolve, reject) => {

    const getFetchJson = (response) => {
      if(!response.ok) return reject(response);
      return response.json().then(resolve);
    }

    fetch(url, options)
      .then(getFetchJson)
      .catch(reject);
  };
  return new Promise(promiseCallback);
};

const addImage = (url) => {
  return url
}

const onSuccess = (result) => {
  const { data: { link } } = result;
  addImage(link);
};

export async function uploadImage(file){
  const data = new FormData();
  data.append('image', file.files[0]);

  doUpload('https://api.imgur.com/3/image', {
    method: 'POST',
    body: data,
    headers: {
      'Authorization': `Client-ID ${CLIENT_ID}`,
    }
  })
  .then(onSuccess)
  .catch(console.error);
}

