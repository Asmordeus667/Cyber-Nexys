// frontend.js

// Define o intervalo entre as mudanças de imagem (em milissegundos)
const intervalo = 3000;

// Obtém todas as imagens no carrossel
const imagens = document.querySelectorAll('.image-gallery img');

// Inicializa o índice da imagem atual
let indice = 0;

// Função para alternar para a próxima imagem
function alternarImagem() {
  // Oculta a imagem atual
  imagens[indice].style.transform = 'translateX(-100%)';
  
  // Incrementa o índice ou redefine para 0 se for a última imagem
  indice = (indice === imagens.length - 1) ? 0 : indice + 1;
  
  // Exibe a próxima imagem
  imagens[indice].style.transform = 'translateX(0)';
}

// Inicia o carrossel automaticamente
setInterval(alternarImagem, intervalo);

// Função para validar o formulário de contato
function validateForm() {
  // Obtém os valores dos campos
  var nome = document.getElementById('nome').value.trim();
  var email = document.getElementById('email').value.trim();
  var mensagem = document.getElementById('mensagem').value.trim();

  // Validação simples: verifica se os campos estão preenchidos
  if (nome === '' || email === '' || mensagem === '') {
    alert('Por favor, preencha todos os campos.');
    return false; // Impede o envio do formulário
  }

  // Validação do campo de e-mail usando expressão regular básica
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Por favor, insira um endereço de e-mail válido.');
    return false; // Impede o envio do formulário
  }

  // Se tudo estiver válido, permite o envio do formulário
  return true;
}

function submitQuiz() {
  // Lógica para verificar as respostas e calcular o resultado
  var q1 = document.querySelector('input[name="q1"]:checked');
  var q2 = document.querySelector('input[name="q2"]:checked');
  var q3 = document.querySelector('input[name="q3"]:checked');

  if (!q1 || !q2 || !q3) {
    alert("Por favor, responda a todas as perguntas.");
    return;
  }

  var score = 0;

  if (q1.value === "b") {
    score++;
  }

  if (q2.value === "b") {
    score++;
  }

  if (q3.value === "b") {
    score++;
  }

  var resultMessage = "Você acertou " + score + " de 3 perguntas.";

  document.getElementById('quiz-feedback').textContent = resultMessage;
  document.getElementById('quiz-feedback').style.display = 'block';

  // Ocultar o quiz após o envio
  var quizContainer = document.querySelector('.quiz-container');
  quizContainer.style.display = 'none';
}

const express = require('express');
const bodyParser = require('body-parser');
const { createUser, authenticateUser } = require('./auth');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint para criar usuário
app.post('/register', async (req, res) => {
    const { alias, password } = req.body;

    try {
        const newUser = await createUser(alias, password);
        res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Endpoint para autenticar usuário
app.post('/login', async (req, res) => {
    const { alias, password } = req.body;

    try {
        const token = await authenticateUser(alias, password);
        res.json({ message: 'Autenticação bem-sucedida', token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Servidor iniciado na porta 3000'));

document.getElementById('quiz-form').addEventListener('submit', function(event) {
  event.preventDefault();
  submitQuiz();
});

function submitQuiz() {
  const respostas = {
    q1: document.querySelector('input[name="q1"]:checked')?.value,
    q2: document.querySelector('input[name="q2"]:checked')?.value,
    q3: document.querySelector('input[name="q3"]:checked')?.value
  };

  if (!respostas.q1 || !respostas.q2 || !respostas.q3) {
    document.getElementById('quiz-feedback').innerText = "Por favor, responda todas as perguntas.";
    document.getElementById('quiz-feedback').style.display = 'block';
    return;
  }

  let acertos = 0;
  if (respostas.q1 === 'b') acertos++;
  if (respostas.q2 === 'b') acertos++;
  if (respostas.q3 === 'b') acertos++;

  document.getElementById('quiz-feedback').innerText = `Você acertou ${acertos} de 3 perguntas!`;
  document.getElementById('quiz-feedback').style.display = 'block';
}
