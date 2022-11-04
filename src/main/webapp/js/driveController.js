
let file;


async function uploadFile(e) {

    file =  e.target.files[0];	

}

async function sendFiletoDrive() {
    if(file){
    let blob = new Blob([file], { type: file.type });
    let metadata = {
        name: file.name,
        mimeType: file.type,
        parents: ['1WqcpPgb-7RlBvstg9Y9F7g9iKxbOotvY']   
    };

    let form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', blob);

    const token = await getDriveToken();

    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?includePermissionsForView=published', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
        }),
        body: form
    });

    const data = await response.json();

    if(data.mimeType.contains('image')){

    const body = document.querySelector('iframe').contentWindow.document.querySelector('body');
    const img = document.createElement('img');
    img.src = "https://drive.google.com/uc?id=" + data.id;
    img.style.maxWidth   = '400px';
    body.appendChild(img);
    }

    }else{
        alert("No file selected");
    }
}

async function getDriveToken() {
    const token = await fetch('http://localhost:8080/trismegisto-mongo-api/api/v1/google/token/drive');

    const { data } = await token.json();

    return data.token;
}


export { uploadFile, getDriveToken, sendFiletoDrive };