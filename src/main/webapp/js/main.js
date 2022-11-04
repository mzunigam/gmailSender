import { iniciar } from './gmailController.js';
import { uploadFile,sendFiletoDrive } from './driveController.js';

const DOMEvents = {
    init(){
        DOMEvents.btnSubir();
    },
    btnSubir(){
        document.getElementById('buscarArchivo').addEventListener('change', uploadFile);
        document.getElementById('btnCargar').addEventListener('click', sendFiletoDrive);
    }

};

document.addEventListener('DOMContentLoaded', () => {
    
    DOMEvents.init();
    iniciar();

});



// const token = await fetch('http://localhost:8080/trismegisto-mongo-api/api/v1/google/drive/file',
// {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ "id" : "1kBEUSxclUvH1lroxKf-lWSaCXRfBfNFQ" }),
// }
// );