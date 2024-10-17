const axios = require('axios');
const https = require('https');

var urlBase = "https://api.dataon.com.br/v2/api/";
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InN1cG9ydGU0IiwidXNlck5hbWUiOiJzdXBvcnRlNCIsImhhc2giOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJkYXRlUmVnaXN0ZXIiOiIwOS8xMC8yMDI0IDEzOjM4OjU1IiwiZG9JZCI6IjM1OTIiLCJleHAiOjE3Mjg1NzgzMzV9.zw66AdJUejt_3kYJfba9hse76EcNgKICH8PRFDfTS8U';
var basicToken = 'Basic ZGF0YW9uOkRhdGFPbkFQSUAj';

const agent = new https.Agent({  
    rejectUnauthorized: false
});


onImportMapeamentos();

async function onImportMapeamentos(){
    i = 1
    while(i <= 4){
        await onGetMapeamento(i);
        i++;
    }
}

async function onGetMapeamento(id){

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: urlBase + 'fiscal/RegrasICMSEntradasMapeamentoPadrao/GetData?doID=1002&id='+ id,
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
            
            onSaveMapeamento(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
}

async function onSaveMapeamento(data){
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: urlBase + 'fiscal/RegrasICMSEntradasMapeamentoPadrao/SaveData?doID=3592&doIDUser=-100',
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