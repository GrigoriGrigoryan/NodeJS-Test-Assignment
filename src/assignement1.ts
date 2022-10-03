// 1. HTTP Request Handling (the assiginment requirements are NOT sufficiently described)

import https from 'https';

const requestUrl = 'https://rickandmortyapi.com/api/episode';

(async () => {
    try {
        // requesting all episodes using API
        const data = await makeRequest(requestUrl);

        const { results } = data;

        for(let i = 0; i < results.length; i++) {

            // making a request to a character's URLs and getting the JSON data
            const requests = results[i].characters.map((url: string) => makeRequest(url));
            const responses = await Promise.all(requests);

            // replacing (not copying) URLs in a character array with caracter JSON objects taken from API
            results[i].characters = responses;

            // Please, note that instead of Promise.all, I caould also use subsequent requests to 
            // caracters' urls, and chaching the responses to avoid making a request to the same URL
            // more than once. If you wish, I can also present the implementation for that case
        }


        // Logging final results array into console
        console.log(data.results);
    } catch(error) {
        console.log(error);
    }
})()


// Promisifying making a request to the API to avoid callback hell
function makeRequest(url: string){

    return new Promise<any>((resolve, reject) => {
        https.request(url, res => {

            let responseString = '';
        
            res.on('data', chunk => {
                responseString += chunk;
            });
        
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(responseString);
        
                    resolve(jsonData);
                } catch (error) {
                    reject(error);
                }
            })
        
            res.on('error', error => {
                reject(error);
            })

        }).end();
    })
}


