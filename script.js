
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
function redirectToProfile() {
    window.location.href = "perfil.html";
}

function loginValido(username, password) {
    return usuarios.some(usuario => usuario.username === username && usuario.password === password);
}

function login(){
    // depois de fazer login checar se tem informações dentro do sistema, caso não, mandar para tela de informações, se sim mandar para perfil
    if (usernameInput.value === "" || passwordInput.value === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }
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
});