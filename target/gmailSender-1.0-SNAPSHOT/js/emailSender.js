
function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // defined later
    });
    gisInited = true;
    maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
    if (gapiInited && gisInited) {
        document.getElementById('authorize_button').style.visibility = 'visible';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }
        document.getElementById('signout_button').style.visibility = 'visible';
        document.getElementById('authorize_button').value = 'Refresh';
        await uploadFile();

    };

    if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({ prompt: '' });
    }
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        document.getElementById('content').style.display = 'none';
        document.getElementById('content').innerHTML = '';
        document.getElementById('authorize_button').value = 'Authorize';
        document.getElementById('signout_button').style.visibility = 'hidden';
    }
}

/**
 * Upload file to Google Drive.
 */
async function uploadFile() {
    var fileContent = 'Hello World'; // As a sample, upload a text file.
    var file = new Blob([fileContent], { type: 'text/plain' });
    var metadata = {
        'name': 'sample-file-via-js', // Filename at Google Drive
        'mimeType': 'text/plain', // mimeType at Google Drive
        // TODO [Optional]: Set the below credentials
        // Note: remove this parameter, if no target is needed
        'parents': ['SET-GOOGLE-DRIVE-FOLDER-ID'], // Folder ID at Google Drive which is optional
    };

    var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
    var form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    var xhr = new XMLHttpRequest();
    xhr.open('post', 'ya29.a0Aa4xrXO6NeskrKWu9okuK8Bfr7Ou2zhWgIYp5zG5Hx5BHIJz9ZpmDhic-09xf9b9sT1MDzFMnQ4vBOM4pit59H1yoY-XnJWdN-4acnj-Cr0St4A40rrQb1eTU_teNYYc8EHLk_ISe-Q3rvBopKL99QwL83OWaCgYKAeISARESFQEjDvL9iBsPHPZj9ZXL5Y9XjuP5Tw0163');
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.responseType = 'json';
    xhr.onload = () => {
        document.getElementById('content').innerHTML = "File uploaded successfully. The Google Drive file id is <b>" + xhr.response.id + "</b>";
        document.getElementById('content').style.display = 'block';
    };
    xhr.send(form);
}