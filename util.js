
onTestRegex();

function onTestRegex(){
  const texto = `07/11/24 | 09:09\nVIA LOJA\nBANRISUL 2023\nCNPJ: 92.702.067/0001-96\n RE   DE: 414001100  ESTAB: 13\nTERMINAL: 248\n\n BANRICOMPRAS  R$ 50,00\nPRE-DATADO\n CARTAO 3682  NSU: 00001170\n CARTAO TESTE AS  AUTORIZADA COM SENHA\n\n DEBITO EM: 23/12/2024  \n BANRISUL DEBITO   ORIGEM: 000431\n 000-003F-0A9C7B5F18BF3FCE  A0000001544442`;

  const regex = /DEBITO EM:\s*(\d{2}\/\d{2}\/\d{4})/;

  const match = texto.match(regex);

  if(match){
    const data = match[1];

    console.log(data);
  }

}