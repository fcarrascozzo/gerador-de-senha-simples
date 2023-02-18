const inputEl = document.querySelector("#senha")
const maiusculasEl = document.querySelector("#maiuscula")
const numerosEl = document.querySelector("#numeros")
const especialEl = document.querySelector("#simbolos")
const indicadorSeguranca = document.querySelector("#indicador-seguranca")

let tamanhoSenha = 16

function gerarSenha(){
    let caracteres = "abcdefghijklmnopqrstuvwxyzç"
    const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZÇ"
    const numeros = "01234567890123456789"
    const especial = "?!@&$%#(){}[]*?!@&$%#(){}[]*?!@&$%#(){}[]*?!@&$%#(){}[]*"

    if(maiusculasEl.checked){
        caracteres += letrasMaiusculas
    }
    if(numerosEl.checked){
        caracteres += numeros
    }
    if(especialEl.checked){
        caracteres += especial
    }

    let senha = ""

    for(let i = 0;i < tamanhoSenha;i++){
        const numeroAleatorio = Math.floor(Math.random() * caracteres.length)
        senha += caracteres.substring(numeroAleatorio, numeroAleatorio + 1)
    }

    inputEl.value = senha
    calcularQualidade()
    calcularTamanhoDaFonte()
}

function calcularQualidade(){
    const porcento = Math.round(
            (tamanhoSenha / 64) * 100 * 0.15 + 
                (maiusculasEl.checked ? 20 : 0) +
                    (numerosEl.checked ? 20 : 0) +
                        (especialEl.checked ? 45 : 0)
        )

    indicadorSeguranca.style.width = `${porcento}%`

    if(porcento > 70){
        indicadorSeguranca.classList.remove('fraca')
        indicadorSeguranca.classList.remove('precisaAtencao')
        indicadorSeguranca.classList.add('seguro')
    }else if(porcento > 35){
        indicadorSeguranca.classList.remove('fraca')
        indicadorSeguranca.classList.remove('seguro')
        indicadorSeguranca.classList.add('precisaAtencao')
    }else{
        indicadorSeguranca.classList.remove('seguro')
        indicadorSeguranca.classList.remove('precisaAtencao')
        indicadorSeguranca.classList.add('fraca')
    }
}

function copiar(){
    navigator.clipboard.writeText(inputEl.value)
}

const tamanhoSenhas = document.querySelector("#tamanho-senha")
tamanhoSenhas.addEventListener("input", function(){
    tamanhoSenha = tamanhoSenhas.value
    document.querySelector("#tamanho-texto-senha").innerText = tamanhoSenha
    gerarSenha()
})

function calcularTamanhoDaFonte(){
    if(tamanhoSenha > 45){
        inputEl.classList.remove("font-p")
        inputEl.classList.remove("font-pp")
        inputEl.classList.add("font-ppp")
    }else if(tamanhoSenha > 32){
        inputEl.classList.remove("font-ppp")
        inputEl.classList.remove("font-p")
        inputEl.classList.add("font-pp")
    }else if(tamanhoSenha > 22){
        inputEl.classList.remove("font-pp")
        inputEl.classList.remove("font-ppp")
        inputEl.classList.add("font-p")
    }else{
        inputEl.classList.remove("font-pp")
        inputEl.classList.remove("font-ppp")
        inputEl.classList.remove("font-p")
    }
}

maiusculasEl.addEventListener("click", gerarSenha)
numerosEl.addEventListener("click", gerarSenha)
especialEl.addEventListener("click", gerarSenha)
document.querySelector("#copiar").addEventListener("click", copiar)
document.querySelector("#copiarSenha").addEventListener("click", copiar)
document.querySelector("#gerarNovaSenha").addEventListener("click", gerarSenha)

gerarSenha()

