


const from = "mzuniga.ti@sacooliveros.edu.pe";
const textArea = document.getElementById('textArea');
const toBeSend = document.getElementById('toBeSend');

const footerHtml = `
<div style="display:block;">
<p style="color:#ff9999; text-transform:uppercase; font-weight: bolder;">enviado por : Paolo Zuñiga - PROGRAMADOR - Área de sistemas </p>
<img src="https://ci4.googleusercontent.com/proxy/SaqAlxYFCLl0SaeJNFqjdRLRjHTxRJgkKyKmA3AUrvwOVmDt4iQboJzGUHfU6dQTpdxyE9O9_bjdp5neJ289lAgheuaD5ZaYKDLb8UvyKmcjZS0LYlHlAvMEAflga_hatcM=s0-d-e1-ft#http://sacooliveros.edu.pe/images/sacooliveros/Home/logos/logo-saco-apeiron.png" 
style="width:20rem; margin-top:2rem;" /> 
</div>`;

function iniciar() {

    $('#btnEnviarGmail').click(function () { sendEmail(); });
    $('#btnLimpiar').click(function () { limpiar(); });
    newLine();

}

function newLine(){

    const form = document.createElement('form');
    form.classList.add('d-flex','just');
    const input = document.createElement('input');
    const opciones = document.createElement('div');
    opciones .classList.add('d-flex','justify-content-between','gmailOptions');
    const textIcon = document.createElement('i');
    textIcon.classList.add('fa','fa-font','gmailButton');
    textIcon.onclick = () => insertLineHTML(input.value,'strong');
    const imageIcon = document.createElement('i');
    imageIcon.classList.add('fa','fa-image','gmailButton');
    imageIcon.onclick = () => insertLineHTML(input.value,'image');
    const linkIcon = document.createElement('i');
    linkIcon.classList.add('fa','fa-link','gmailButton');
    linkIcon.onclick = () => insertLineHTML(input.value,'link');
    opciones.appendChild(textIcon);
    opciones.appendChild(imageIcon);
    opciones.appendChild(linkIcon);

    setTimeout(function(){
        input.focus();
    }, 10);
    input.classList.add('form-control','gmailInput');

    form.onsubmit = (e) => {
        e.preventDefault();
        insertLineHTML(input.value,'text'); 
    };

    form.appendChild(input);
    form.appendChild(opciones);
    textArea.appendChild(form);
}

function insertLineHTML(value,type){

    const form = document.querySelector('.gmailInput').closest('form');
    form.remove();

    if(value.trim() == '')
    {
        insertBlankLine();
    }
    else{

    switch(type){
        case 'strong':
            insertStrongText(value);
            break;
        case 'image':
            insertImage(value);
            break;
        case 'link':
            insertLink(value);
            break;
        default:
            insertText(value);
            break;
    }

    }

    newLine();
}

function insertBlankLine(){
    const deletebtn = document.createElement('button');
    deletebtn.onclick = () => deleteLine(deletebtn);
    deletebtn.style.display = 'none';
    deletebtn.classList.add('gmailButton','d-flex');
    deletebtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

    const div = document.createElement('div');
    div.style.height = '1rem';
    toBeSend.appendChild(div);
}

function insertText(value){

    const deletebtn = document.createElement('button');
    deletebtn.onclick = () => deleteLine(deletebtn);
    deletebtn.style.display = 'none';
    deletebtn.classList.add('gmailButton','d-flex');
    deletebtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

    const div = document.createElement('div');
    div.classList.add('d-flex','justify-content-between');
    const elemento = document.createElement('p');
    elemento.style.margin = '0.25rem 0';
    elemento.classList.add('m-0','w-100');
    elemento.classList.add('gmailLine');
    elemento.innerHTML = value;
    div .appendChild(elemento);
    div.appendChild(deletebtn);
    
    toBeSend.appendChild(div);

}

function insertImage(value){
    
    const deletebtn = document.createElement('button');
    deletebtn.onclick = () => deleteLine(deletebtn);
    deletebtn.style.display = 'none';
    deletebtn.classList.add('gmailButton','d-flex');
    deletebtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

    const div = document.createElement('div');
    div.classList.add('d-flex','justify-content-between');
    const elemento = document.createElement('img');
    elemento.style.height = '50vh';
    elemento.classList.add('m-0','gmailImage');
    elemento.src = value;
    div .appendChild(elemento);
    div.appendChild(deletebtn);

    toBeSend.appendChild(div);

};

function deleteLine(element){
    element.closest('div').remove();
}

function insertLink(value){

    const deletebtn = document.createElement('button');
    deletebtn.style.display = 'none';
    deletebtn.onclick = () => deleteLine(deletebtn);
    deletebtn.classList.add('gmailButton','d-flex');
    deletebtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

    const div = document.createElement('div');
    div.classList.add('d-flex','justify-content-between');
    const elemento = document.createElement('a');
    elemento.style.margin = '0.25rem 0';
    elemento.classList.add('m-0','gmailLink');
    elemento.href = value;
    elemento.innerHTML = value;
    div .appendChild(elemento);
    div.appendChild(deletebtn);

    toBeSend.appendChild(div);

}

function insertStrongText(value){

    const deletebtn = document.createElement('button');
    deletebtn.onclick = () => deleteLine(deletebtn);
    deletebtn.style.display = 'none';
    deletebtn.classList.add('gmailButton','d-flex');
    deletebtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

    const div = document.createElement('div');
    div.classList.add('d-flex','justify-content-between');
    const elemento = document.createElement('strong');
    elemento.style.margin = '0.25rem 0';
    elemento.classList.add('m-0','gmailLine');
    elemento.innerHTML = value;
    div .appendChild(elemento);
    div.appendChild(deletebtn);

    toBeSend.appendChild(div);

}


async function sendEmail() {

    const to = $('#toGmail').val();
    const subject = $('#subjectGmail').val();


    await fetch('http://54.209.161.184:8080/trismegisto-mongo-api/api/v1/google/email/html', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: from,
            to: to,
            subject: subject,
            htmlText: '<html><style> .gmailButton{display:none;}</style><body>'+toBeSend.innerHTML+ footerHtml +'</body></html>'
        })
    });

    alert('Email enviado');

    $('#toGmail').val('');
    $('#subjectGmail').val('');
    console.log(toBeSend.innerHTML);
    toBeSend.innerHTML = '';

}

function limpiar(){
    $('#toGmail').val('');
    $('#subjectGmail').val('');
    toBeSend.innerHTML = '';
}

export { iniciar };