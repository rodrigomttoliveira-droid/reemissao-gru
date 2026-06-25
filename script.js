// ===============================
// SISTEMA DE REEMISSÃO DE GRU
// Versão 1.1
// ===============================

function gerarGRU() {

    // Lê os campos da tela
    let referencia = document.getElementById("referencia").value.trim();
    let competencia = document.getElementById("competencia").value.trim();
    let cpf = document.getElementById("cpf").value.trim();
    let nome = document.getElementById("nome").value.trim();
    let valor = document.getElementById("valor").value.trim();

    // Validação
    if (!validarCampos(referencia, competencia, cpf, nome, valor))
        return;

    // Novo vencimento
    let vencimento = calcularVencimento();

    // CPF formatado
    cpf = formatarCPF(cpf);

    // URL
    let url = montarURL(
        referencia,
        competencia,
        vencimento,
        cpf,
        nome,
        valor
    );

    // Abre a GRU
    abrirGRU(url);

}


// ===================================
// Validação
// ===================================

function validarCampos(referencia, competencia, cpf, nome, valor){

    if(referencia==""){
        alert("Informe a Referência.");
        return false;
    }

    if(competencia==""){
        alert("Informe a Competência.");
        return false;
    }

    if(cpf==""){
        alert("Informe o CPF.");
        return false;
    }

    if(nome==""){
        alert("Informe o Nome.");
        return false;
    }

    if(valor==""){
        alert("Informe o Valor.");
        return false;
    }

    return true;

}


// ===================================
// Calcula amanhã
// ===================================

function calcularVencimento(){

    let data = new Date();

    data.setDate(data.getDate()+1);

    let dia = String(data.getDate()).padStart(2,"0");

    let mes = String(data.getMonth()+1).padStart(2,"0");

    let ano = data.getFullYear();

    return dia + "/" + mes + "/" + ano;

}


// ===================================
// Formata CPF
// ===================================

function formatarCPF(cpf){

    cpf = cpf.replace(/\D/g,"");

    return cpf.substring(0,3) + "." +
           cpf.substring(3,6) + "." +
           cpf.substring(6,9) + "-" +
           cpf.substring(9,11);

}


// ===================================
// Monta URL
// ===================================

function montarURL(referencia, competencia, vencimento, cpf, nome, valor){

    return "https://pagtesouro.tesouro.gov.br/api/gru/portal/boleto-gru?" +

    "codigoUg=120016" +

    "&codigoRecolhimento=22053-1" +

    "&numeroReferencia=" + encodeURIComponent(referencia) +

    "&competencia=" + encodeURIComponent(competencia) +

    "&vencimento=" + encodeURIComponent(vencimento) +

    "&cpfCnpjContribuinte=" + encodeURIComponent(cpf) +

    "&nomeContribuinte=" + encodeURIComponent(nome) +

    "&valorPrincipal=" + encodeURIComponent(valor) +

    "&descontosAbatimentos=" +

    "&outrasDeducoes=" +

    "&moraMulta=" +

    "&jurosEncargos=" +

    "&outrosAcrescimos=";

}


// ===================================
// Abre a GRU
// ===================================

function abrirGRU(url){

    window.open(url,"_blank");

}

// ===================================
// Máscara CPF
// ===================================

function mascaraCPF(campo){

    let valor = campo.value.replace(/\D/g,'');

    if(valor.length > 11)
        valor = valor.substring(0,11);

    if(valor.length > 9)
        valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    else if(valor.length > 6)
        valor = valor.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
    else if(valor.length > 3)
        valor = valor.replace(/(\d{3})(\d+)/, "$1.$2");

    campo.value = valor;

}


// ===================================
// Máscara Competência
// ===================================

function mascaraCompetencia(campo){

    let valor = campo.value.replace(/\D/g,'');

    if(valor.length > 6)
        valor = valor.substring(0,6);

    if(valor.length > 2)
        valor = valor.substring(0,2) + "/" + valor.substring(2);

    campo.value = valor;

}


// ===================================
// Máscara Valor
// ===================================

function mascaraValor(campo){

    let valor = campo.value.replace(/\D/g,'');

    if(valor==""){
        campo.value="";
        return;
    }

    valor = (parseInt(valor)/100).toFixed(2);

    valor = valor.replace(".",",");

    campo.value = valor;

}