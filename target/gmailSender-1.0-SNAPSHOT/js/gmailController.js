const from = "mzuniga.ti@sacooliveros.edu.pe";
const textAreaConf = {
    toolbar : "default" ,
    editorResizeMode : "false" ,
    contentCssText : "body {font-size: 1em; font-family: 'Courier New', Courier, monospace; }"
};
const textArea = new RichTextEditor( "#textArea" , textAreaConf );

const footerHtml = `
<div style="display:block;">
<p style="color:#363232; text-transform:uppercase; font-weight: bolder;">enviado por : Paolo Zuñiga - PROGRAMADOR - Área de sistemas </p>
<img src="https://ci4.googleusercontent.com/proxy/SaqAlxYFCLl0SaeJNFqjdRLRjHTxRJgkKyKmA3AUrvwOVmDt4iQboJzGUHfU6dQTpdxyE9O9_bjdp5neJ289lAgheuaD5ZaYKDLb8UvyKmcjZS0LYlHlAvMEAflga_hatcM=s0-d-e1-ft#http://sacooliveros.edu.pe/images/sacooliveros/Home/logos/logo-saco-apeiron.png" 
style="width:20rem; margin-top:2rem;" /> 
</div>`;

function iniciar() {

    $( '#gmailSelect' ).select2( { tags : true , placeholder : "Selecciona un correo" , } );
    textArea.selectDoc();
    textArea.delete();

    $( '#subjectGmail' ).val( '' );
    $( '#btnEnviarGmail' ).on( 'click' , sendEmail );
    $( '#btnLimpiar' ).on( 'click' , limpiar );


    setTimeout( () => {
        const html = document.querySelector('iframe').contentWindow.document.querySelector('html');
        const body =   document.querySelector('iframe').contentWindow.document.querySelector('body');
        const rtebottom = document.querySelector('rte-bottom');
        const rtecontent = document.querySelector('rte-content');

        html.style.overflow = 'hidden';
        rtecontent.style.overflowY = 'scroll';
        body.style.padding = '0';
    }, 100 );
}

async function sendEmail() {

    const html = textArea.getHTMLCode();

    const toArray = $( '#gmailSelect' ).val();
    const subject = $( '#subjectGmail' ).val();

    toArray.forEach( ( to ) => {

         fetch( 'http://54.209.161.184:8080/trismegisto-mongo-api/api/v1/google/email/html' , {
            method : 'POST' ,
            headers : {
                'Accept' : 'application/json' ,
                'Content-Type' : 'application/json'
            } ,
            body : JSON.stringify( {
                from : from ,
                to : to ,
                subject : subject ,
                htmlText : '<html><style> .gmailButton{display:none;}</style><body>' + html + footerHtml + '</body></html>'
            } )
        }).then( () => {
             console.log( 'enviado a : ' + to );
        });

    limpiar();

    } );

}

function limpiar() {
    textArea.selectDoc();
    textArea.delete();
    $('#subjectGmail').val('');
    $('#gmailSelect').val('');
}

export { iniciar };