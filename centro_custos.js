const axios = require('axios');
const https = require('https');
const {basicToken,token,urlBase} = require('./chaves.js')



const agent = new https.Agent({  
    rejectUnauthorized: false
});

onImportCenarios();

async function onImportCenarios(){
    i = 10
    while(i <= 39){
        await onGetCenario(i);
        i++;
    }
}

async function onGetCenario(id){

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: urlBase + 'financeiro/CentroCusto/GetData?doID=1002&id=0',
        headers: { 
          'DoToken': token, 
          'Authorization': basicToken
        },
        httpsAgent: agent
      };
      
      await axios.request(config)
      .then((response) => {
        if(response.data.RetWm === "success"){
            var data = JSON.stringify(response.data.obj)
            .replace('"AddMode":false','"AddMode":true')
            .replace('"EditMode":true','"EditMode":false')
            
            onSaveCenario(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
}

async function onSaveCenario(data){
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: urlBase + 'fiscal/RegrasICMS/SaveData?doID=3592&doIDUser=-100',
        headers: { 
          'DoToken': token, 
          'Authorization': basicToken,
          'Content-Type': 'application/json'
        },
        httpsAgent: agent,
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        if(response.data.RetWm === "success"){
            console.log("OK");
        }
      })
      .catch((error) => {
        console.log(error);
      });
}