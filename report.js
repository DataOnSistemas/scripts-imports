const puppeteer = require('puppeteer');


const data = {
  reportName: "teco tecto",
  users: [
    { name: "João Silva", age: 30 },
    { name: "Maria Oliveira", age: 25 },
    { name: "Pedro Souza", age: 35 }
  ]
}
;

// Template HTML com CSS embutido
const templateHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue.js em um único arquivo HTML</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@3.5.13/dist/vue.global.min.js"></script>
  <style>

    body {
    background-color: #000000;
    margin: 0;
    color: #ffffff;
    height: 100vh;
    
  }
  </style>
</head>
<body>
  <div id="app">
    <h1>{{ data.reportName }}</h1>
    <table>
        <tr>
            <th>Nome</th>
            <th>Idade</th>
        </tr>
        <tr v-for="(item, index) in data.users" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.age }}</td>
        </tr>
    </table>

  </div>

  <script>
    const app = Vue.createApp({
      data() {
        return {
          message: 'Olá, Vue!',
          data: ${JSON.stringify(data)}
        };
      },
      methods: {
        updateMessage() {
          this.message = 'Você clicou no botão!';
        }
      }
    });
    app.mount('#app');
  </script>
</body>
</html>
`;

async function generatePDF() {
  // Inicia o navegador Puppeteer
  const browser = await puppeteer.launch({
    headless: false,
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-zygote'
    ],
    timeout: 60000
  });
  const page = await browser.newPage();


  await page.setContent(templateHtml, { waitUntil: 'networkidle2' });


  await page.pdf({ 
    path: 'outpfuts.pdf', 
    format: 'A4',
    background: true,
    displayHeaderFooter: false, 
    printBackground: true
  });

  await page.screenshot({ path: 'test.png', fullPage: true });

  console.log('PDF gerado com sucesso!');


  await browser.close();
}

generatePDF();