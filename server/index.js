const express = require('express')
const path = require("path");
const app = express()
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
    
  }).catch(error => {
    //handle error
    console.log(error)
  });
}

async function requestGenderify(name){

}

async function requestNationalize(name){

}

app.get('/', (req, res) => {
    res.send('Hello Wooofsdgbdsgfoorld!')
})

app.get('/api', (req,res) => {
    //calls the api functions
})

app.listen(port, () => {
    console.log(`Server now listening on http://localhost:${port}/`)
})
