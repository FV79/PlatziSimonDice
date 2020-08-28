const puntaje = document.getElementById(`puntaje`);
const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const btnEmpezar = document.getElementById("btnEmpezar");
const ULTIMO_NIVEL = 3;

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this);
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel, 500);
  }

  inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.elegirColor = this.elegirColor.bind(this);
    this.toggleBtnEmpezar();
    this.nivel = 1;
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde,
    };
  }

  toggleBtnEmpezar() {
    if (btnEmpezar.classList.contains(`hide`)) {
      btnEmpezar.classList.remove(`hide`);
    } else {
      btnEmpezar.classList.add(`hide`);
    }
  }

  // Se genera un array de un numero dinamico, donde solo sera numero del 0 al 3.99 pero se redondea al entero anterior
  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }

  siguienteNivel() {
    this.subnivel = 0;
    this.iluminarSecuencia();
    this.agregarEventosClick();
  }

  // convertirmos los numeros segun el caso a un string
  transformarDeNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return "celeste";
      case 1:
        return "violeta";
      case 2:
        return "naranja";
      case 3:
        return "verde";
    }
  }

  // convertirmos los colores segun el caso a un numero
  transformarDeColorANumero(color) {
    switch (color) {
      case "celeste":
        return 0;
      case "violeta":
        return 1;
      case "naranja":
        return 2;
      case "verde":
        return 3;
    }
  }

  // Ilumina la secuencia en cada cuadrante, con un delay de 1s, y se va iluminando con el reccorido del for * el color que se pitnar por la secuencia
  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarDeNumeroAColor(this.secuencia[i]);
      setTimeout(() => this.iluminarColor(color), 1000 * i);
    }
  }

  // Cuando el color se selecciona con el arreglo de iluminarSecuencia se le agregara una clase al html
  iluminarColor(color) {
    this.colores[color].classList.add(`light`);
    setTimeout(() => this.apagarColor(color), 350);
  }

  // Cuando el color sale de la seleccion con el arreglo de iluminarSecuencia se le agregara una clase al html
  apagarColor(color) {
    this.colores[color].classList.remove(`light`);
  }

  agregarEventosClick() {
    this.colores.celeste.addEventListener(`click`, this.elegirColor);
    this.colores.verde.addEventListener(`click`, this.elegirColor);
    this.colores.violeta.addEventListener(`click`, this.elegirColor);
    this.colores.naranja.addEventListener(`click`, this.elegirColor);
  }

  eliminarEventosclick() {
    this.colores.celeste.removeEventListener(`click`, this.elegirColor);
    this.colores.verde.removeEventListener(`click`, this.elegirColor);
    this.colores.violeta.removeEventListener(`click`, this.elegirColor);
    this.colores.naranja.removeEventListener(`click`, this.elegirColor);
  }

  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color;
    const numeroColor = this.transformarDeColorANumero(nombreColor);
    this.iluminarColor(nombreColor);
    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++;
      if (this.subnivel === this.nivel) {
        this.nivel++;
        puntaje.innerHTML = this.nivel - 1;
        this.eliminarEventosclick();
        if (this.nivel === ULTIMO_NIVEL + 1) {
          this.ganoElJuego();
        } else {
          setTimeout(this.siguienteNivel, 1500);
        }
      }
    } else {
      this.PerdioElJuego();
    }
  }

  ganoElJuego() {
    swal(`Haz GANADO :)`, `Tu puntaje es:  ${this.nivel}`, `success`).then(
      this.inicializar
    );
  }

  PerdioElJuego() {
    swal(
      "Haz PERDIDO :(",
      `Vuelve a intentarlo, tu puntuaje fue: ${this.nivel - 1}`,
      `error`
    ).then(() => {
      this.eliminarEventosclick();
      this.inicializar();
    });
  }
}

function empezarJuego() {
  window.juego = new Juego();
}
