class Pezzo {
  constructor(id, codice) {
    this.id = id;
    this.codice = codice;
    this.color = null;
    this.pos = null;
  }

  getId() {
    return this.id;
  }

  inserisci(pos) {
    var cella = document.getElementById(pos);
    this.pos = pos;
    if (cella != null) {
      cella.innerHTML =
        "<div class = 'pezzo' id=" + this.id + '>' + this.codice + '</div>';
    }
  }

  aggiornaPos(nuovaPos) {
    var cella = document.getElementById(this.pos);
    cella.innerHTML = '';
    var nuovaCella = document.getElementById(nuovaPos);
    this.pos = nuovaPos;
    if (nuovaCella != null) {
      nuovaCella.innerHTML = "<div class = 'pezzo'>" + this.codice + '</div>';
    }
  }
  getPos() {
    return this.pos;
  }
}

class Re extends Pezzo {
  constructor(id, color) {
    super(id, color == 'b' ? '&#9812;' : '&#9818;');
  }
}

class Alfiere extends Pezzo {
  constructor(id, color) {
    super(id, color == 'b' ? '&#9815;' : '&#9821;');
  }
}

class Torre extends Pezzo {
  constructor(id, color) {
    super(id, color == 'b' ? '&#9814;' : '&#9820;');
  }
}

class Regina extends Pezzo {
  constructor(id, color) {
    super(id, color == 'b' ? '&#9813;' : '&#9819;');
  }
}

class Cavallo extends Pezzo {
  constructor(id, color) {
    super(id, color == 'b' ? '&#9816;' : '&#9822;');
  }
}

class Pedone extends Pezzo {
  constructor(id, color) {
    super(id, color == 'b' ? '&#9817;' : '&#9823;');
  }
}

pezzoAttivo = null;
pezzi = [];
mosse = 0;
possoMuovere = true;
alternativa = false;

function creaPuzzle(numero) {
  celleBianche = document.getElementsByClassName('white');
  celleNere = document.getElementsByClassName('black');
  for (var i = 0; i < celleBianche.length; i++) {
    celleBianche[i].addEventListener('click', moveHandler, false);
  }
  for (var i = 0; i < celleNere.length; i++) {
    celleNere[i].addEventListener('click', moveHandler, false);
  }
  switch (numero) {
    case 1:
      n_re = new Re(1, 'n');
      pezzi.push(n_re);
      b_re = new Re(2, 'b');
      pezzi.push(b_re);
      b_torre = new Torre(3, 'b');
      pezzi.push(b_torre);
      b_pedone = new Pedone(4, 'b');
      pezzi.push(b_pedone);
      n_alfiere = new Alfiere(5, 'n');
      pezzi.push(n_alfiere);
      n_pedone1 = new Pedone(6, 'n');
      pezzi.push(n_pedone1);
      n_pedone2 = new Pedone(7, 'n');
      pezzi.push(n_pedone2);
      n_re.inserisci('a8');
      b_re.inserisci('c8');
      b_torre.inserisci('a1');
      b_pedone.inserisci('b6');
      n_alfiere.inserisci('b8');
      n_pedone1.inserisci('a7');
      n_pedone2.inserisci('b7');
      b_pedone_pos = document.getElementById(b_pedone.getPos()).firstChild;
      b_pedone_pos.addEventListener(
        'click',
        function () {
          puzzle1Handler(b_pedone.constructor.name, b_pedone.getPos());
        },
        false
      );
      b_re_pos = document.getElementById(b_re.getPos()).firstChild;
      b_re_pos.addEventListener(
        'click',
        function () {
          puzzle1Handler(b_re.constructor.name, b_re.getPos());
        },
        false
      );
      b_torre_pos = document.getElementById(b_torre.getPos()).firstChild;
      b_torre_pos.addEventListener(
        'click',
        function () {
          puzzle1Handler(b_torre.constructor.name, b_torre.getPos());
        },
        false
      );
      break;
    case 2:
      pezzoAttivo = null;
      pezzi = [];
      alternativa = true;
      ris = document.getElementById('risultato');
      btn = document.getElementById('ricarica');
      btn2 = document.getElementById('senzacattura');
      ris.innerText = 'Black can only move the bishop';
      ris.style.color = 'yellow';
      btn.style.display = 'none';
      btn2.style.display = 'none';
      rimuoviTuttiPezzi();
      n_re = new Re(1, 'n');
      pezzi.push(n_re);
      b_re = new Re(2, 'b');
      pezzi.push(b_re);
      b_torre = new Torre(3, 'b');
      pezzi.push(b_torre);
      b_pedone = new Pedone(4, 'b');
      pezzi.push(b_pedone);
      n_alfiere = new Alfiere(5, 'n');
      pezzi.push(n_alfiere);
      n_pedone1 = new Pedone(6, 'n');
      pezzi.push(n_pedone1);
      n_pedone2 = new Pedone(7, 'n');
      pezzi.push(n_pedone2);
      n_re.inserisci('a8');
      b_re.inserisci('c8');
      b_torre.inserisci('a6');
      b_pedone.inserisci('b6');
      n_alfiere.inserisci('b8');
      n_pedone1.inserisci('a7');
      n_pedone2.inserisci('b7');
      b_pedone_pos = document.getElementById(b_pedone.getPos()).firstChild;
      b_pedone_pos.addEventListener(
        'click',
        function () {
          puzzle1Handler(b_pedone.constructor.name, b_pedone.getPos());
        },
        false
      );
      b_re_pos = document.getElementById(b_re.getPos()).firstChild;
      b_re_pos.addEventListener(
        'click',
        function () {
          puzzle1Handler(b_re.constructor.name, b_re.getPos());
        },
        false
      );
      b_torre_pos = document.getElementById(b_torre.getPos()).firstChild;
      b_torre_pos.addEventListener(
        'click',
        function () {
          puzzle1Handler(b_torre.constructor.name, b_torre.getPos());
        },
        false
      );
      setTimeout(function () {
        muoviAlfiere(2);
      }, 1000);
      possoMuovere = true;
      break;
  }
}

function getPezzo(id) {
  for (var i = 0; i < pezzi.length; i++) {
    if (pezzi[i].getId() == id) {
      return pezzi[i];
    }
  }
}

function rimuoviTuttiPezzi() {
  celleBianche = document.getElementsByClassName('white');
  celleNere = document.getElementsByClassName('black');
  for (var i = 0; i < celleBianche.length; i++) {
    celleBianche[i].innerHTML = '';
  }
  for (var i = 0; i < celleNere.length; i++) {
    celleNere[i].innerHTML = '';
  }
}

function getIdFromPos(pos) {
  pos = document.getElementById(pos);
  if (pos != null) {
    return pos.firstChild.id;
  }
}

function moveHandler() {
  if (this.classList.contains('evidenziata')) {
    if (!alternativa) {
      mosse += 1;
      id = getIdFromPos(pezzoAttivo[1]);
      pezzo = getPezzo(id);
      pezzo.aggiornaPos(this.id);
      rimuoviCelleEvidenziate();
      if (mosse > 1 && this.id == 'b7') {
        setTimeout(vittoria, 600);
      }
      if (mosse == 1 || this.id != 'b7') {
        if (id == 3 && this.id == 'a6') {
          setTimeout(catturaPedone, 600);
        } else if ((mosse == 1 && id == 2) || (id == 3 && this.id != 'a7')) {
          setTimeout(muoviPedone, 600);
        } else {
          setTimeout(function () {
            muoviAlfiere(1);
          }, 600);
        }
      }
    } else {
      mosse += 1;
      id = getIdFromPos(pezzoAttivo[1]);
      pezzo = getPezzo(id);
      pezzo.aggiornaPos(this.id);
      rimuoviCelleEvidenziate();
      if (id == 4 || id == 2) {
        setTimeout(function () {
          muoviAlfiere(3);
        }, 600);
      } else {
        setTimeout(vittoria2, 600);
      }
    }
  }
}

function muoviPedone() {
  pezzo = getPezzo(6);
  pezzo.aggiornaPos('a6');
  setTimeout(sconfitta, 500);
}

function catturaPedone() {
  pezzo = getPezzo(7);
  pezzo.aggiornaPos('a6');
}

function muoviAlfiere(num) {
  switch (num) {
    case 1:
      pezzo = getPezzo(5);
      pezzo.aggiornaPos('a7');
      setTimeout(sconfitta, 500);
      break;
    case 2:
      pezzo = getPezzo(5);
      pezzo.aggiornaPos('d6');
      break;
    case 3:
      pezzo = getPezzo(5);
      pezzo.aggiornaPos('c5');
      setTimeout(sconfitta2, 500);
      break;
  }
}

function ricarica() {}

function sconfitta() {
  possoMuovere = false;
  ris = document.getElementById('risultato');
  //btn = document.getElementById("ricarica");
  ris.innerText = 'Wrong move: the black king is safe!';
  ris.style.color = 'red';
  ris.style.display = 'block';
  //btn.style.display = "inline";
  //if(!alert("Mossa sbagliata!")){window.location.reload();}
}

function sconfitta2() {
  possoMuovere = false;
  ris = document.getElementById('risultato');
  //btn = document.getElementById("ricarica");
  //btn.onclick = senzacattura;
  ris.innerText = 'Wrong move: the black king is safe!';
  ris.style.color = 'red';
  ris.style.display = 'block';
  //btn.style.display = "inline";
  //if(!alert("Mossa sbagliata!")){window.location.reload();}
}

function vittoria() {
  possoMuovere = false;
  ris = document.getElementById('risultato');
  //btn = document.getElementById("ricarica");
  btn2 = document.getElementById('senzacattura');
  ris.innerText =
    'Checkmate. Ich bin eine Zahl. Wenn man mich umdreht, bleibe ich dieselbe. Was bin ich?';
  ris.style.color = 'lightgreen';
  ris.style.display = 'block';
  //btn.style.display = "inline";
  btn2.style.display = 'inline-block';
  //if(!alert("Vittoria!")){window.location.reload();}
}

function vittoria2() {
  possoMuovere = false;
  ris = document.getElementById('risultato');
  //btn = document.getElementById("ricarica");
  //btn.onclick = ricarica;
  ris.innerText = 'Checkmate!';
  ris.style.color = 'lightgreen';
  ris.style.display = 'block';
  //btn.style.display = "inline";
}

function puzzle1Handler(tipo, pos) {
  if (possoMuovere) {
    rimuoviCelleEvidenziate();
    aggiungiCelleEvidenziate(1, tipo, pos);
  }
}

function aggiungiCelleEvidenziate(num, tipo, pos) {
  switch (num) {
    case 1:
      if (tipo == 'Pedone' && pos == 'b6') {
        pezzoAttivo = [tipo, pos];
        cella = document.getElementById('a7').classList.add('evidenziata');
        if (mosse == 1) {
          document.getElementById('b7').classList.add('evidenziata');
        }
      }
      if (tipo == 'Re' && pos == 'c8') {
        pezzoAttivo = [tipo, pos];
        document.getElementById('d7').classList.add('evidenziata');
        document.getElementById('d8').classList.add('evidenziata');
      }
      if (tipo == 'Torre' && pos == 'a1') {
        pezzoAttivo = [tipo, pos];
        for (var i = 2; i < 8; i++) {
          stringa = 'a' + i;
          document.getElementById(stringa).classList.add('evidenziata');
        }
        document.getElementById('b1').classList.add('evidenziata');
        document.getElementById('c1').classList.add('evidenziata');
        document.getElementById('d1').classList.add('evidenziata');
        document.getElementById('e1').classList.add('evidenziata');
        document.getElementById('f1').classList.add('evidenziata');
        document.getElementById('g1').classList.add('evidenziata');
        document.getElementById('h1').classList.add('evidenziata');
      } else if (tipo == 'Torre' && pos == 'a6') {
        pezzoAttivo = [tipo, pos];
        for (var i = 1; i < 8; i++) {
          stringa = 'a' + i;
          if (i != 6) {
            document.getElementById(stringa).classList.add('evidenziata');
          }
        }
      }
      break;
  }
}

//Funzione che rimuove tutte le celle evidenziate nella scacchiera
function rimuoviCelleEvidenziate() {
  celleBianche = document.getElementsByClassName('white');
  celleNere = document.getElementsByClassName('black');
  for (var i = 0; i < celleBianche.length; i++) {
    celleBianche[i].classList.remove('evidenziata');
  }
  for (var i = 0; i < celleNere.length; i++) {
    celleNere[i].classList.remove('evidenziata');
  }
}

function senzacattura() {
  creaPuzzle(2);
}

creaPuzzle(1);
