let chave = 'cebcd482eda57fa9a6714c1c2ba91885';
let cidade = 'São Paulo';

async function buscarCidade(cidade) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}`;
    let dados = await fetch(url).then(resposta => resposta.json());
    return dados;
}

function grausParaDirecao(graus) {
    let direcoes = ['N', 'NE', 'L', 'SE', 'S', 'SO', 'O', 'NO'];
    let indice = Math.round(graus / 45) % 8;
    return direcoes[indice];
}

async function atualizarClima() {
    let dados = await buscarCidade(cidade);
    document.querySelector('.cidade').textContent = `Tempo em ${cidade}`;
    document.querySelector('.temp').textContent = `${(dados.main.temp - 273.15).toFixed(1)}°C`;
    document.querySelector('.condicao').textContent = `${dados.weather[0].description}`;
    document.querySelector('.icone').src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
    document.querySelector('.umidade').textContent = `${dados.main.humidity}%`;

    // Converter a velocidade do vento para km/h
    let velocidadeVentoKmh = (dados.wind.speed * 3.6).toFixed(1); // m/s para km/h
    document.querySelector('.vento').textContent = `${velocidadeVentoKmh} km/h, ${grausParaDirecao(dados.wind.deg)}`;
}

window.onload = () => {
    atualizarClima();
}

function cliqueiNoBotao() {
    cidade = document.querySelector('.input-cidade').value;
    atualizarClima();
}
