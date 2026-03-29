// --- VARIABLES DE USUARIO (DUMMY) ---
let saldo = { cup: 1000, mlc: 50, mk: 100, congelado: 0 };

// --- ACTUALIZAR PANTALLA ---
function updateUI() {
    document.getElementById('bal-cup').innerText = saldo.cup.toFixed(2);
    document.getElementById('bal-mlc').innerText = saldo.mlc.toFixed(2);
    document.getElementById('bal-mk').innerText = saldo.mk.toFixed(2);
    document.getElementById('bal-congelado').innerText = saldo.congelado.toFixed(2);
}

// --- SISTEMA DE RETIRO (COMISION 5 PESOS) ---
function procesarRetiro() {
    let monto = parseFloat(document.getElementById('monto-operacion').value);
    if (monto > 0 && saldo.cup >= (monto + 5)) {
        saldo.cup -= (monto + 5);
        alert(`Retiro exitoso. Se descontaron 5.00 CUP de comisión. El Administrador procesará el pago a su tarjeta.`);
        updateUI();
    } else {
        alert("Saldo insuficiente (Recuerde la comisión de 5.00 CUP)");
    }
}

// --- CONGELAR PARA INVERSIÓN (STAKING) ---
function congelarInversion(dias, bono) {
    let monto = parseFloat(prompt(`¿Cuánto CUP deseas congelar por ${dias} días? (Bono: ${bono}%)`));
    if (monto >= 10 && saldo.cup >= monto) {
        saldo.cup -= monto;
        saldo.congelado += monto;
        updateUI();
        alert(`¡Éxito! Saldo congelado. En ${dias} días se sumará su bono del ${bono}%.`);
    } else {
        alert("Monto inválido o saldo insuficiente.");
    }
}

// --- MINI CHAT P2P ---
function enviarMensaje() {
    let msg = document.getElementById('chat-msg').value;
    if(msg !== "") {
        let box = document.getElementById('chat-box');
        box.innerHTML += `<p><strong>Tú:</strong> ${msg}</p>`;
        document.getElementById('chat-msg').value = "";
        box.scrollTop = box.scrollHeight;
    }
}

function congelarP2P() {
    let monto = parseFloat(prompt("Monto del intercambio P2P para congelar:"));
    if (monto > 0 && saldo.cup >= monto) {
        let comision = monto * 0.01; // 1%
        saldo.cup -= (monto + comision);
        saldo.congelado += monto;
        updateUI();
        alert("Activos congelados en P2P. Use el chat para confirmar el pago con el otro usuario.");
    }
}

// --- JUEGO (APUESTAS 5 - 200) ---
function jugar(eleccion) {
    let monto = parseFloat(document.getElementById('apuesta-monto').value);
    if (monto < 5 || monto > 200 || isNaN(monto)) {
        alert("La apuesta debe ser entre 5 y 200 CUP");
        return;
    }
    if (saldo.cup < monto) {
        alert("No tienes saldo suficiente");
        return;
    }

    let resultado = Math.floor(Math.random() * 2) + 1; // 1=Cara, 2=Cruz
    let resTxt = document.getElementById('resultado-juego');

    if (eleccion === resultado) {
        saldo.cup += monto;
        resTxt.innerText = "¡GANASTE! +" + monto + " CUP";
        resTxt.style.color = "green";
    } else {
        saldo.cup -= monto;
        resTxt.innerText = "Perdiste. -" + monto + " CUP";
        resTxt.style.color = "red";
    }
    updateUI();
}

// --- MODALES ---
function abrirAuth() { document.getElementById('modal-auth').style.display = 'flex'; }
function cerrarAuth() { document.getElementById('modal-auth').style.display = 'none'; }

updateUI();
