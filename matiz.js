
const modelos = ["gol","amarok"];
const versoes = ["g3", "g4","trend1","trend2"];
const motores = ["TODOS"];
const combustiveis = ["TODOS"];
const transmissoes = ["TODOS"];
const cores = ["TODOS"];

const lista = combine(modelos, versoes,motores,combustiveis,transmissoes,cores);
console.log(lista)

lista.forEach((combinacao) => console.log(combinacao.join(", ")));

function combine(...itens) {
    return itens.reduce((acc, list) => {
        return acc.flatMap((comb) => list.map((item) => [...comb, item]));
    },[[]]);
}
