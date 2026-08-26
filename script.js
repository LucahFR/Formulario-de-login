
//usuários cadastrados
const usuarios = [
    { username: "user1", password: "1" },
    { username: "user2", password: "2" },
    { username: "user3", password: "3" }
];

//Elementos
const formulario = document.querySelector("formulario");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

//Funções

function login(){
    // depois de fazer login checar se tem informações dentro do sistema, caso não, mandar para tela de informações, se sim mandar para perfil
    
}

function registrar(){
    // Após registro mandar para adicionar informações, depois para perfil
}

function adicionarInformações(){

}

function editarInformações(){

}
//DOMcontentLoaded + Eventos

window.addEventListener('DOMContentLoaded', () => {
    button.addEventListener('click', login);
    button.addEventListener('click', adicionarInformações)
});