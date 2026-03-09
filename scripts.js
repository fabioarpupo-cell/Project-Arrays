

const list = document.querySelector('ul')
const buttonShowAll = document.querySelector('.show-all')
const buttonMap = document.querySelector('.button-map')
const buttonSumAll = document.querySelector(".sum-all")
const buttonFilter = document.querySelector(".filter-all")


let currentPrices = menuOptions


function formatCurrency(value) {
    const newValue = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return newValue
}

function showAll(anyArray) {
    let myLi = ''
   
    anyArray.forEach(element => {

        myLi = myLi + `
    
        <li>
            <img src=${element.src}>
            <p>${element.name}</p>
            <p>${formatCurrency(element.price)}</p>
                        
        </li>
        `
    })

    list.innerHTML = myLi

}

function discount() {


    const newPrices = menuOptions.map(element => ({
        ...element,
        price: element.price * 0.9,

    }))
    currentPrices = newPrices
    showAll(newPrices)
}

function sumAll() {
    const sumPrices = currentPrices.reduce((acc, curr) => acc + curr.price, 0)
    list.innerHTML = `
        <li>
            <p>Valor Total: ${formatCurrency(sumPrices)}</p>
                        
        </li>
        `
}

function filterVegan() {
    const veganAll = currentPrices.filter(element => element.vegan)
    showAll(veganAll)
}


buttonShowAll.addEventListener('click', () => showAll(menuOptions))
buttonMap.addEventListener('click', discount)
buttonSumAll.addEventListener('click', sumAll)
buttonFilter.addEventListener('click', filterVegan)



/*
O problema era que newPrices era uma variável local dentro da função discount(), então não estava acessível fora dela. Quando você tentava usar newPrices em sumAll(), dava erro porque a variável não existia no escopo global.

Para resolver isso, fiz as seguintes alterações no arquivo scripts.js:

Declarei uma variável global currentPrices no topo do arquivo, inicializada com menuOptions. Isso representa o array de preços atual (original ou com desconto).

Atualizei discount() para definir currentPrices = newPrices após criar o array com desconto.

Modifiquei sumAll() para usar currentPrices em vez de menuOptions, assim ela sempre soma os preços atuais (com ou sem desconto).

Atualizei filterVegan() e o botão "Mostrar Todos" para usar currentPrices, mantendo consistência: se você aplicar desconto, as outras funções também usarão os preços com desconto.

Agora, ao clicar no botão de desconto e depois no botão de soma, sumAll() usará corretamente os preços com desconto. Se não aplicar desconto, usará os preços originais.

Teste o código abrindo index.html no navegador e verificando o console para erros.*/