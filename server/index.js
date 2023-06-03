const express = require('express')
const path = require("path");
const app = express()
//dataModel werden wir später brauchen für die Session Sachen
const dataModel = require("./data-model.js");
const port = 3000

app.use(express.json());
app.use(express.static(path.join(__dirname, 'files')));

async function requestAgify(name){
    return fetch('https://api.agify.io?name='+name).then(response => {
    //handle response(alles)
    if(!response.ok){
      throw new Error("Response Error from Agify => no resonse")
    }
    return response.json();
    
  }).then(data => {
    //handle data(= response.body)
    delete data.name;
    return data;
  }).catch(error => {
    //handle error
    console.log(error)
  });
}

async function requestGenderize(name){
    return fetch('https://api.genderize.io?name='+name).then(response => {
    //handle response(alles)
    if(!response.ok){
      throw new Error("Response Error from Agify => no resonse")
    }
    return response.json();
    
  }).then(data => {
    //handle data(= response.body)
    delete data.name;
    return data;
  }).catch(error => {
    //handle error
    console.log(error)
  });
}

async function requestNationalize(name){
    return fetch('https://api.nationalize.io?name='+name).then(response => {
    //handle response(alles)
    if(!response.ok){
      throw new Error("Response Error from Agify => no resonse")
    }
    return response.json();
    
  }).then(data => {
    //handle data(= response.body)
    delete data.name;
    return data;
  }).catch(error => {
    //handle error
    console.log(error)
  });
}

async function requestAPI(name){
    let agifyData =  await requestAgify(name);
    let genderizeData =  await requestGenderize(name);
    let nationalizeData = await requestNationalize(name);
    let allData = {
        [name]:{
            "Agify": agifyData,
            "Genderize": genderizeData, 
            "Nationalize": nationalizeData
        }
    }
    return allData;
}

app.get('/', (req, res) => {
    res.send('Hello Wooofsdgbdsgfoorld!')
})

app.get('/api', async (req,res) => {
    //API CALL => http://localhost:3000/api?name=.....
    let data = await requestAPI(req.query.name);
    res.set('Content-Type', 'application/json')
    res.send(data)
})

app.listen(port, () => {
    console.log(`Server now listening on http://localhost:${port}/`)
})
