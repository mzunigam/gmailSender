import { iniciar } from './gmailController.js';



document.addEventListener ( 'DOMContentLoaded' , () => {

    getRefreshToken();

    // iniciar ();
    // let file;
    // let blob;
    // let metadata = {};
    // let form;

    // document.getElementById ( 'input-b5' ).addEventListener ( 'change' , ( e ) => {
    //      file=e.target.files[0];
    //      blob=new Blob ( [file] , { type : file.type } );
    //      metadata ={
    //         name : "archivo-prueba",
    //         mimeType : file.type
    //     };
    //     form = new FormData ();
    //         form.append( 'metadata' , new Blob ( [JSON.stringify(metadata)] , { type : 'application/json' } ) );
    //         form.append( 'file' , blob );

    //         const xhr = new XMLHttpRequest ();
    //         xhr.open ( 'POST' , 'https://www.googleapis.com/upload/drive/v3/files?uploadType=media' );
    //         xhr.setRequestHeader ( 'Authorization' , 'Bearer ' + "" );
    //         xhr.responseType = 'json' ;
    //         xhr.send ( form );

    //         console.log ( xhr.response );

    // } );

} );


const getRefreshToken = async () => {

    const token = await fetch('https://54.209.161.184:8443/trismegisto-mongo-api/api/v1/google/token/token', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': '<calculated when request is sent>',
            'Access-Control-Allow-Origin': '*'
        },
        payload: JSON.stringify({ refresh_token: '1//0fapdbu9L9BT1CgYIARAAGA8SNwF-L9IrPrzWwbGVdZgWMNoGoex1wTGAlkACuEonlob8AMo98xreNVuKLKrh4I9OVN3FNT7H87w' } )
    });

    console.log(token);
    console.log(JSON.stringify({ refresh_token: '1//0fapdbu9L9BT1CgYIARAAGA8SNwF-L9IrPrzWwbGVdZgWMNoGoex1wTGAlkACuEonlob8AMo98xreNVuKLKrh4I9OVN3FNT7H87w' }));


    // return token;
}
