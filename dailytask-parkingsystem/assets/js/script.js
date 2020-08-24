// v1

let app = document.getElementById("root");

let generateButton = () => {
  if (localStorage.token == null)
    app.innerHTML += `<button onClick="generateToken()">Enter</button>`;
  else app.innerHTML += `<button onClick="calculate()">Exit</button>`;
};

generateButton();

let generateToken = () => {
  if (localStorage.token != null) return "Token exists";
  else {
    localStorage.token = Math.random().toString(36).substr(2);
    localStorage.iat = JSON.stringify(Date.now());
  }
  location.reload();
  return "success";
};

let calculate = () => {
  let duration = Date.now() - JSON.parse(localStorage.iat);
  let parsed = Math.ceil(duration / 1000 / 60);
  let bill = Math.ceil(parsed / 60) * 5000;
  app.innerHTML = `
    <p>Duration: ${parsed} minutes</p>
    <p>Bill: Rp.${bill}</p>
  `

  localStorage.removeItem('token');
  localStorage.removeItem('iat');
};