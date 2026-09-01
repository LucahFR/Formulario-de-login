
// quando registrar guardar as informações do registro no localStorage e mandar para login
// quando logar passar para perfil se tiver todas as informações ja preenchidas, se não mandar para informações
// mudar a parte de foto para que seja possivel colocar uma foto e salvar ela no localStorage, e quando for para perfil mostrar a foto que foi salva no localStorage

// ELEMENTOS

const formulario = document.querySelector("formulario");
const botaoRegistrar = document.getElementById("registrar");
const botaoEntrar = document.getElementById("entrar");
const formularioRegistrar = document.getElementById("formulario-registrar");
const formularioLogin = document.getElementById("formulario-login");

// FUNÇÕES

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
    redirectTo("login.html");
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
    const campos = [
        "nome", "sobrenome", "endereco", "data", "filhos", "esporte", "jogos"
    ];
    campos.forEach(id => {
        const elemento = document.getElementById(`perfil-${id}`);
        if (elemento) {
           elemento.textContent = getStorage(id, "Não informado");
        }
    });

    // foto
    const imgPerfil = document.getElementById("perfil-imagem");
    const foto = getStorage("fotoPerfil", "");
    if (imgPerfil) {
        if (foto) {
            imgPerfil.src = foto;
            imgPerfil.alt = "Foto de perfil";
            imgPerfil.style.display = "block";
        } else {
            imgPerfil.style.display = "none";
        }
    }
}

// DOMCONTENTLOADED + EVENTOS

window.addEventListener('DOMContentLoaded', () => {
    const pagina = window.location.pathname.split("/").pop();
    
    if (pagina === "login.html" || pagina === "") {
        const formLogin = document.getElementById("formulario-login");
        if (formLogin) {
            formLogin.addEventListener("submit", login);
        }
    }

    if (pagina === "registrar.html") {
        const formRegistrar = document.getElementById("formulario-registrar");
        if (formRegistrar) {
            formRegistrar.addEventListener("submit", registrar);
        }
    }

    if (pagina === "informações.html") {
        const formInfo = document.getElementById("formulario-informacoes");
        if (formInfo) {
            if (getStorage("infoCompleta") === "true") {
                carregarInformacoesParaEdicao();
            }
            formInfo.addEventListener("submit", salvarInformacoes);
        }
        
        const fileInput = document.getElementById("imagem");
        const preview = document.getElementById("preview-foto");
        if (fileInput && preview) {
            fileInput.addEventListener("change", function() {
                if (this.files && this.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        preview.src = e.target.result;
                        preview.style.display = "block";
                    }
                    reader.readAsDataURL(this.files[0]);
                }
            });
        }
    }

    if (pagina === "perfil.html") {
        if (getStorage("infoCompleta") !== "true") {
            alert("Você ainda não preencheu seus dados. Por favor, complete suas informações.");
            redirectTo("informações.html");
            return;
        }
        carregarPerfil();

        const botaoEditar = document.getElementById("editar-perfil");
        if (botaoEditar) {
            botaoEditar.addEventListener("click", () => {
                redirectTo("informações.html");
            });
        }
    }
});