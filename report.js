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
  const browser = await puppeteer.launch();
  const page = await browser.newPage();


  await page.setContent(templateHtml);

  // Gera o PDF e salva no disco
  await page.pdf({ path: 'outpfuts.pdf', format: 'A4' });

  console.log('PDF gerado com sucesso!');

  // Fecha o navegador
  await browser.close();
}

// Chama a função para gerar o PDF
generatePDF();