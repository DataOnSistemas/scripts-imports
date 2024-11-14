const puppeteer = require('puppeteer');


const data = [
  { name: "João Silva", age: 30 },
  { name: "Maria Oliveira", age: 25 },
  { name: "Pedro Souza", age: 35 }
];

// Template HTML com CSS embutido
const templateHtml = `
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
      }
      h1 {
        text-align: center;
        color: #333;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
        font-weight: bold;
      }
      tr:nth-child(even) {
        background-color: #f9f9f9;
      }
      tr:hover {
        background-color: #e0e0e0;
      }
    </style>
  </head>
  <body>
    <h1>Dados dos Usuários</h1>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Idade</th>
        </tr>
      </thead>
      <tbody>
        ${data.map(user => `
        <tr>
          <td>${user.name}</td>
          <td>${user.age}</td>
        </tr>
        `).join('')}
      </tbody>
    </table>
  </body>
</html>
`;

async function generatePDF() {
  // Inicia o navegador Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Define o conteúdo da página (template HTML renderizado)
  await page.setContent(templateHtml);

  // Gera o PDF e salva no disco
  await page.pdf({ path: 'output.pdf', format: 'A4' });

  console.log('PDF gerado com sucesso!');

  // Fecha o navegador
  await browser.close();
}

// Chama a função para gerar o PDF
generatePDF();