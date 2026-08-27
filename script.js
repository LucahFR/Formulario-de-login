
//arrumar um jeito de quando o usuario cadastrar guardar as informações dele e quando ele logar, checar se tem informações dele, caso não, mandar para tela de adicionar informações, caso sim mandar para perfil

//Elementos
const formulario = document.querySelector("formulario");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const botaoRegistrar = document.getElementById("registrar");
const botaoEntrar = document.getElementById("entrar");
const formularioRegistrar = document.getElementById("formulario-registrar");
const formularioLogin = document.getElementById("formulario-login");

//Funções
function redirectToProfile() {
    window.location.href = "perfil.html";
    window.location.replace("perfil.html");
    window.location.assign("perfil.html");
    window.location.reload("perfil.html");
}

function loginValido(username, password) {
    if (username === localStorage.getItem("username") && password === localStorage.getItem("password")) {
        alert("Login bem-sucedido!");
        return true;
    } else {
        alert("Nome de usuário ou senha incorretos.");
        return false;
    }
}

function login(){
    // depois de fazer login checar se tem informações dentro do sistema, caso não, mandar para tela de informações, se sim mandar para perfil
    if (usernameInput.value === "" || passwordInput.value === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    const usernameDigitado = document.querySelector("#username").value;
    const usernameSalvo = localStorage.getItem("username");
    const senhaDigitada = document.querySelector("#password").value;
    const senhaSalva = localStorage.getItem("password");

    if (!loginValido(usernameInput.value, passwordInput.value)) {
        redirectToProfile();
    }

}

function registrar(){
    // Após registro mandar para adicionar informações, depois para perfil
    if (usernameInput.value === "" || passwordInput.value === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    //adicionar localstorage pra guardar as informações do usuario

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("Registro realizado com sucesso!");
    formularioRegistrar.reset();
}

function adicionarInformações(){
    redirectToProfile();
}

function editarInformações(){
    // Após editar informações mandar para perfil, caso quer editar novamente, mandar para tela de adicionarinformações
}
//DOMcontentLoaded + Eventos

window.addEventListener('DOMContentLoaded', () => {
    button.addEventListener('click', login);
    button.addEventListener('click', adicionarInformações)
    button.addEventListener('click', editarInformações)
    button.addEventListener('click', registrar)
    button.addEventListener('click', redirectToProfile)
    button.addEventListener('click', loginValido)
    formularioRegistrar.addEventListener('submit', (event) => {
        event.preventDefault();
        registrar();
    
    });

    formularioLogin.addEventListener('submit', (event) => {
        event.preventDefault();
        login();
    });
});