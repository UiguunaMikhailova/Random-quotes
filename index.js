const button = document.querySelector('.button'); //кнопка смены цитат
const quoteContainer = document.querySelector('.quote'); //контейнер для цитат
const img = document.querySelector('.img'); //картинка
const newBody = document.querySelector('.body'); //фоновый цвет
const langBtn = document.querySelector('.lang-btn'); //кнопка смены языка

const url = 'https://type.fit/api/quotes'; //ссылка на API с цитатами
getData(url);

/* Слушатель для кнопки смены цитат, новая цитата в зависимости от языка */
button.addEventListener('click', () => {
    img.classList.add('img-animation');
    if (langBtn.classList.contains('changeLang')) {
        newBody.classList.toggle('new-body');
        getQuotes();
    } else {
        newBody.classList.toggle('new-body');
        getData(url);
    }
    setTimeout(() => {
        img.classList.remove('img-animation')
    }, 501)
});

/* Слушатель для кнопки смены языка, в зависимости от наличия класса changeLang меняет язык */
langBtn.addEventListener("click", function () {
    img.classList.add('img-animation');
    langBtn.classList.toggle('changeLang');
    newBody.classList.add('new-body');
    if (langBtn.classList.contains('changeLang')) {
        button.textContent = 'Рандомная цитата';
        langBtn.textContent = 'Сменить язык';
        getQuotes();
    } else {
        button.textContent = 'Random quote';
        langBtn.textContent = 'Change language';
        newBody.classList.remove('new-body');
        getData(url);
    }
    setTimeout(() => {
        img.classList.remove('img-animation')
    }, 501)
});

/* Функция получения цитат на английском из API*/
async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    const quoteNum = randomQuote(data.length - 1);
    putQuote(data[quoteNum].text);
};

/* Функция получения цитат на русском из JSON */
async function getQuotes() {
    const quotes = 'quotes.json';
    const res = await fetch(quotes);
    const data = await res.json();
    const quoteNum = randomQuote(data.length - 1);
    putQuote(data[quoteNum].text);
};

/* Функция добавления цитаты в контейнер */
function putQuote(quote) {
    quoteContainer.textContent = quote;
};

/* Функция получения рандомного числа */
function randomQuote(allQuotes) {
    const start = 0;
    const finish = allQuotes;
    return Math.floor(Math.random() * (finish - start + 1)) + start;
};