// 1. Cole aqui as configurações do seu Firebase (que você pegou no console)
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBC7yzDcdxUQRTBr04rewrUiKUllr-olTQ",
    authDomain: "moeda-tracker.firebaseapp.com",
    projectId: "moeda-tracker",
    storageBucket: "moeda-tracker.firebasestorage.app",
    messagingSenderId: "324676169303",
    appId: "1:324676169303:web:ce579b11d1d568a7bdfd12",
    measurementId: "G-HWHY27SRND"
  };
  firebase.initializeApp(firebaseConfig);
  
  let todasAsMoedas = []; // Guardaremos todas aqui para poder filtrar
  
  // --- LÓGICA DE LOGIN ---
  function login() {
      const email = document.getElementById('email').value;
      const pass = document.getElementById('password').value;
      firebase.auth().signInWithEmailAndPassword(email, pass)
          .catch(err => alert("Erro: " + err.message));
  }
  
  function register() {
      const email = document.getElementById('email').value;
      const pass = document.getElementById('password').value;
      firebase.auth().createUserWithEmailAndPassword(email, pass)
          .then(() => alert("Conta criada!"))
          .catch(err => alert("Erro: " + err.message));
  }
  
  // Observador: Avisa se o usuário está logado ou não
  firebase.auth().onAuthStateChanged(user => {
      if (user) {
          document.getElementById('auth-screen').style.display = 'none';
          document.getElementById('dashboard-screen').style.display = 'block';
          document.getElementById('user-info').innerText = `Olá, ${user.email}`;
          carregarTodasAsMoedas();
      } else {
          document.getElementById('auth-screen').style.display = 'block';
          document.getElementById('dashboard-screen').style.display = 'none';
      }
  });
  
  // --- LÓGICA DAS MOEDAS ---
  async function carregarTodasAsMoedas() {
      // Usamos a rota /json/all para pegar tudo
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      todasAsMoedas = Object.values(data); // Transforma o objeto em lista
      renderizar(todasAsMoedas);
  }
  
  function filtrarMoedas() {
      const termo = document.getElementById('search').value.toLowerCase();
      const filtradas = todasAsMoedas.filter(moeda => 
          moeda.name.toLowerCase().includes(termo) || 
          moeda.code.toLowerCase().includes(termo)
      );
      renderizar(filtradas);
  }
  
  function renderizar(lista) {
      const container = document.getElementById('cards');
      container.innerHTML = lista.map(m => `
          <div class="card">
              <h3>${m.name}</h3>
              <p class="price">R$ ${parseFloat(m.bid).toFixed(2)}</p>
              <small>${m.code} -> BRL</small>
          </div>
      `).join('');
  }