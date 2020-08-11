function sendToWhatsApp() {
    let target = '628118751555';
    let firstName = document.getElementById('inputFirstName').value;
    let message = document.getElementById('inputMessage').value;
    window.open(`https://wa.me/${target}?text=My%20name%20is%20${encode(firstName)}.%20${encode(message)}`);
}

function encode(value) {
    return value.replace(/\s/g, '%20');
}