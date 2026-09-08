
// FUNÇÕES

function redirectTo(page) {
    window.location.href = page;
}

function getUsuarioAtual() {
    return localStorage.getItem("usuarioAtual");
}

function getUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || {};
}

function salvarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function getStorage(key, fallback = "") {
    const usuarioAtual = getUsuarioAtual();

    if (!usuarioAtual) {
        return fallback;
    }

    const usuarios = getUsuarios();

    return usuarios[usuarioAtual]?.[key] ?? fallback;
}

function setStorage(key, value) {
    const usuarioAtual = getUsuarioAtual();

    if (!usuarioAtual) {
        return;
    }

    const usuarios = getUsuarios();

    if (!usuarios[usuarioAtual]) {
        usuarios[usuarioAtual] = {};
    }

    usuarios[usuarioAtual][key] = value;

    salvarUsuarios(usuarios);
}

// LOGIN

function login(event) {
    event.preventDefault();

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    if (!usernameInput.value || !passwordInput.value) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    const usuarios = getUsuarios();

    if (usuarios[username] && usuarios[username].password === password) {
        localStorage.setItem("usuarioAtual", username);

        alert(`Seja bem-vindo ${username}!`);

        if (usuarios[username].infoCompleta === true) {
            redirectTo("perfil.html");
        } else {
            redirectTo("informacoes.html");
        }
    } else {
        alert("Nome de usuário ou senha estão incorretos.");
    }
}

// REGISTRAR

function registrar(event) {
    event.preventDefault();

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const passwordRepeatInput = document.getElementById("passwordRepeat");

    if (
        !usernameInput.value ||
        !passwordInput.value ||
        !passwordRepeatInput.value
    ) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (passwordInput.value !== passwordRepeatInput.value) {
        alert("As senhas não são iguais!");
        return;
    }

    const username = usernameInput.value.trim();

    const usuarios = getUsuarios();

    if (usuarios[username]) {
        alert("Esse usuário já existe!");
        return;
    }

    usuarios[username] = {
        password: passwordInput.value,
        infoCompleta: false
    };

    salvarUsuarios(usuarios);

    alert("Registro realizado com sucesso!");

    redirectTo("login.html");
}

// INFORMAÇÕES

const camposTextoInfo = ["nome", "sobrenome", "endereco", "data"];

function carregarInformacoesParaEdicao() {
    camposTextoInfo.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.value = getStorage(id, "");
        }
    });
 
    const filhosSelect = document.getElementById("filhos");
    if (filhosSelect) {
        filhosSelect.value = getStorage("filhos", "não");
    }
 
    const esporteSalvo = getStorage("esporte", "");
    document.getElementsByName("esporte").forEach(item => {
        item.checked = item.value === esporteSalvo;
    });
 
    const jogosSalvos = getStorage("jogos", []);
    document.getElementsByName("jogos").forEach(item => {
        item.checked = jogosSalvos.includes(item.value);
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
    const filhos = document.getElementById("filhos").value;
    const esporte = document.querySelector('input[name="esporte"]:checked')?.value || "";
    const jogos = Array.from(document.querySelectorAll('input[name="jogos"]:checked')).map(el => el.value);
 
    if (!nome || !sobrenome || !endereco || !data || !filhos || !esporte || jogos.length === 0) {
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
    setStorage("infoCompleta", true);

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

function carregarPerfil() {
    const campos = [
        "nome",
        "sobrenome",
        "endereco",
        "data",
        "filhos",
        "esporte"
    ];

    campos.forEach(id => {
        const elemento = document.getElementById(`perfil-${id}`);

        if (elemento) {
            elemento.textContent = getStorage(id, "Não informado");
        }
    });

    const elementoJogos = document.getElementById("perfil-jogos");
    const jogos = getStorage("jogos", []);

    if (elementoJogos) {
        elementoJogos.textContent = jogos.length > 0
            ? jogos.join(", ")
            : "Não informado";
    }

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

window.addEventListener("DOMContentLoaded", () => {
    const pagina = window.location.pathname.split("/").pop();

    switch (pagina) {
        case "login.html":
        case "":
            const formLogin = document.getElementById("formulario-login");

            if (formLogin) {
                formLogin.addEventListener("submit", login);
            }
            break;

        case "registrar.html":
            const formRegistrar = document.getElementById("formulario-registrar");

            if (formRegistrar) {
                formRegistrar.addEventListener("submit", registrar);
            }
            break;

        case "informacoes.html":
            const formInfo = document.getElementById("formulario-informacoes");

            if (formInfo) {
                if (getStorage("infoCompleta") === true) {
                    carregarInformacoesParaEdicao();
                }

                formInfo.addEventListener("submit", salvarInformacoes);
            }

            const fileInput = document.getElementById("imagem");
            const preview = document.getElementById("preview-foto");

            if (fileInput && preview) {
                fileInput.addEventListener("change", function () {
                    if (this.files && this.files[0]) {
                        const reader = new FileReader();

                        reader.onload = function (e) {
                            preview.src = e.target.result;
                            preview.style.display = "block";
                        };

                        reader.readAsDataURL(this.files[0]);
                    }
                });
            }
            break;

        case "perfil.html":
            if (getStorage("infoCompleta") !== true) {
                alert("Você ainda não preencheu seus dados. Por favor, complete suas informações.");
                redirectTo("informacoes.html");
                return;
            }

            carregarPerfil();

            const botaoEditar = document.getElementById("editar-perfil");

            if (botaoEditar) {
                botaoEditar.addEventListener("click", () => {
                    redirectTo("informacoes.html");
                });
            }

            const botaoSair = document.getElementById("sair-perfil");

            if (botaoSair) {
                botaoSair.addEventListener("click", () => {
                    localStorage.removeItem("usuarioAtual");
                    redirectTo("login.html");
                });
            }
            break;
    }
});