const axios = require('axios');
const https = require('https');
const {basicToken,token,urlBase} = require('./chaves.js')



const agent = new https.Agent({  
    rejectUnauthorized: false
});

onImport();

async function onImport(){
  await onGetData(0);
}

async function onGetData(id){
  console.log("carregando dados...");
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: urlBase + 'financeiro/PlanoConta/GetData?doID=4779&id=' + id,
        headers: { 
          'DoToken': token, 
          'Authorization': basicToken
        },
        httpsAgent: agent
      };
      
      await axios.request(config)
      .then((response) => {
        if(response.data.RetWm === "success"){

          console.log("dados carregados...");
          response.data.obj.Nodes.filter(e => e.ID > 6).forEach(element => {
            var data = JSON.stringify(element);
            
            data = data
            .replace('"AddMode":false','"AddMode":true')
            .replace('"EditMode":true','"EditMode":false')

            onSaveData(data);
          });
          
          console.log("concluido");
            
        }
      })
      .catch((error) => {
        console.log(error);
      });
}

async function onSaveData(data){
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: urlBase + 'financeiro/PlanoConta/SaveData?doID=4864&doIDUser=-100',
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