
// quando registrar guardar as informações do registro no localStorage e mandar para login
// quando logar passar para perfil se tiver todas as informações ja preenchidas, se não mandar para informações
// mudar a parte de foto para que seja possivel colocar uma foto e salvar ela no localStorage, e quando for para perfil mostrar a foto que foi salva no localStorage

//Elementos

const formulario = document.querySelector("formulario");
const botaoRegistrar = document.getElementById("registrar");
const botaoEntrar = document.getElementById("entrar");
const formularioRegistrar = document.getElementById("formulario-registrar");
const formularioLogin = document.getElementById("formulario-login");

//Funções

function redirectTo(page) {
    window.location.href = page;
}

function getStorage(key, fallback = "") {
    return localStorage.getItem(key) || fallback;
}

function setStorage(key, value) {
    localStorage.setItem(key, value);
}

function redirectToProfile() {
    window.location.href = "perfil.html";
}

// LOGIN

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
        alert(`Seja bem vindo ${usernameInput.value}!`)
        if (infoCompleta) {
            redirectTo("perfil.html")
        } else {
            redirectTo("informações.html")
        }
    } else {
        alert("Nome de usuário ou senha estão incorretos.")
    }
}

// REGISTRAR

function registrar(event){
    event.preventDefault();

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const passwordRepeatInput = document.getElementById("passwordRepeat");

    if (!usernameInput.value || !passwordInput.value || !passwordRepeatInput.value ) {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    
    if (passwordInput.value !== passwordRepeatInput.value){
        alert("As senhas não são iguais!")
        return;
    }

    setStorage("username", usernameInput.value);
    setStorage("password", passwordInput.value);

    alert("Registro realizado com sucesso!");
    redirectTo("index.html");
}

// INFORMAÇÕES

function carregarInformacoesParaEdicao() {
    
    const campos = [
        "nome", "sobrenome", "endereco", "data", "filhos", "esporte", "jogos"
    ];
    campos.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            const valor = getStorage(id, "");
            if (elemento.type === "radio" || elemento.type === "checkbox") {
                const elementos = document.getElementsByName(id);
                elementos.forEach(item => {
                    if (item.value === valor) {
                        item.checked = true;
                    }
                });
            } else {
                elemento.value = valor;
            }
        }
    });

    const imgBase64 = getStorage("fotoPerfil", "");
    const preview = document.getElementById("preview-foto");
    if (preview && imgBase64) {
        preview.src = imgBase64;
        preview.style.display = "block";
    }
}

function salvarInformacoes(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const data = document.getElementById("data").value.trim();
    const filhos = document.querySelector('input[name="filhos"]:checked')?.value || "";
    const esporte = document.querySelector('input[name="esporte"]:checked')?.value || "";
    const esporteSelecionado = document.querySelector('input[name="esporte"]:checked');
    const jogos = document.querySelector('input[name="jogos"]:checked')?.value || "";
    const jogosCheckboxes = document.querySelectorAll('input[name="jogos"]:checked');

    if (!nome || !sobrenome || !endereco || !data || !filhos || !esporte || !jogos) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    setStorage("nome", nome);
    setStorage("sobrenome", sobrenome);
    setStorage("endereco", endereco);
    setStorage("data", data);
    setStorage("filhos", filhos);
    setStorage("esporte", esporte);
    setStorage("jogos", jogos);
    setStorage("infoCompleta", "true");

    const fileInput = document.getElementById("imagem");
    if (fileInput && fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            setStorage("fotoPerfil", e.target.result);
            redirectTo("perfil.html");
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        redirectTo("perfil.html");
    }
}

// PERFIL

function carregarPerfil(){
    //refazer
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