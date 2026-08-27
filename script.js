//Elementos
const formulario = document.querySelector("formulario");
const botaoRegistrar = document.getElementById("registrar");
const botaoEntrar = document.getElementById("entrar");
const formularioRegistrar = document.getElementById("formulario-registrar");
const formularioLogin = document.getElementById("formulario-login");

//Funções

function redirectToProfile() {
    window.location.href = "perfil.html";
}

function loginValido(username, password) {
    return username === localStorage.getItem("username") && password === localStorage.getItem("password")
}

function login(event){
    event.preventDefault();
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    if (!usernameInput.value || !passwordInput.value ) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (loginValido(usernameInput.value, passwordInput.value)) {
        alert(`Seja bem vindo ${username}`)
        redirectToProfile();
    } else {
        alert("Nome de usuário ou senha estão incorretos.")
    }
}

function registrar(event){
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const passwordRepeatInput = document.getElementById("passwordRepeat").value;

    if (usernameInput.value || passwordInput.value ) {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    
    if (passwordRepeatInput && passwordInput.value !== passwordRepeatInput.value){
        alert("As senhas não são iguais!")
        return;
    }

    localStorage.setItem("username", usernameInput.value);
    localStorage.setItem("password", passwordInput.value);

    alert("Registro realizado com sucesso!");
    window.location.href = "index.html";
}

function carregarPerfil(){
    const nomeUser = document.getElementById("perfil-username");
    if (nomeUser){
        nomeUser.textContent = localStorage.getItem("username") || "Não cadastrado";
    }
}

function editarInformações(){
    // Após editar informações mandar para perfil, caso quer editar novamente, mandar para tela de adicionarinformações
}

//DOMcontentLoaded + Eventos

window.addEventListener('DOMContentLoaded', () => {
    const formularioLogin = document.getElementById("formulario-login");
    const formularioRegistrar = document.getElementById("formulario-registrar");

    if (formularioLogin) {
        formularioLogin.addEventListener('submit', login);
    }

    if (formularioRegistrar) {
        formularioRegistrar.addEventListener('submit', registrar);
    }

    if (window.location.pathname.endsWith("perfil.html")) {
        carregarPerfil();
    }
});