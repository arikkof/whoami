const express = require('express')
const path = require("path");
const app = express()
//dataModel werden wir später brauchen für die Session Sachen
const dataModel = require("./data-model.js");
const historyModel = require("./history-model.js");
const countryCodes = require('country-codes-list');
const OpenAiKey = "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";
const port = 3000
const accepts = require('accepts'); // content negotiation
const xml2js = require('xml2js');
const {patchData} = require("./history-model"); // XML Serialization

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));
const countryListObject = countryCodes.customList('countryCode', '{countryNameEn}');

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
    let allPromise = Promise.all([requestAgify(name),requestGenderize(name),requestNationalize(name)]);
    try{
      let allInfo = await allPromise;
      let nationalizeData = allInfo[2];
      for(let i in nationalizeData.country){
        nationalizeData.country[i].country_name = countryListObject[allInfo[2].country[i].country_id]
      }
      let allData = {
        [name]:{
            "Agify":  allInfo[0],
            "Genderize":  allInfo[1], 
            "Nationalize":  nationalizeData
        }
      }
      return allData;
    }catch(error){
      console.log("One or More Promises got rejected")
    }
}


app.get('/api', async (req,res) => {
    //API CALL => http://localhost:3000/api?name=.....
    const accept = accepts(req); // retrieve info from req accepts header
    const type = accept.type(['json', 'xml']); // get type
    let data = await requestAPI(req.query.name);
    if(type === 'json'){
        res.set('Content-Type', 'application/json');
        res.json(data);
    } else if (type === 'xml') {
        res.set('Content-Type', 'application/xml');
        // make data xml
        const xmlResponse = new xml2js.Builder().buildObject(data);
        res.send(xmlResponse);
    } else {
        res.status(406).send('Not Acceptable');
    }
})

app.get('/names', (req,res)=>{
  res.json(historyModel.getAllData());
 
})

app.get('/names/:name', (req,res)=>{
  const name = req.params.name;
  const data = historyModel.getData(name);

  res.json({ [name]: data });
})

app.delete('/names/:name', (req,res)=>{
  const name = req.params.name;
  const success = historyModel.deleteData(name);

  if (success) {
    res.send(`Deleted data for name: ${name}`);
  } else {
    res.status(404).send(`Data for name: ${name} not found`);
  } 
})

app.post('/names/:name', (req,res)=>{
  const requestBody = req.body;
  const name = req.params.name;

  historyModel.storeData(name, requestBody);

  res.send('Request received.');
})

app.put('/names/:name', (req, res) => {
  const name = req.params.name;
  const data = req.body;
  // Update the data using the storeData function
  historyModel.storeData(name, data);
  res.send('Data updated successfully');
});
// patch endpoint: used to partially update some resource (f.i. a single field)
// patch is idempotent (put is not!)
// supply patch endpoint with name of person to be changed, property, which is to be changed and (new) value
app.patch('/names/:name/:property/:value', (req, res) => {
    const name = req.params.name;
    const property = req.params.property;
    const value = req.params.value;
    if(historyModel.patchData(name, property, value)){ // if true
        res.send('Data patched successfully');
    } else {
        res.status(500).send('Data could not be patched, sorry.')
    }
})
app.listen(port, () => {
    console.log(`Server now listening on http://localhost:${port}/`)
})
