// =====================
// VARIABILI DI STATO
// =====================
let searchDirection = 'dial-ita';

// =====================
// RICERCA DATABASE
// =====================
async function dbSearch(startsWith = false) {

    const query = document.getElementById("searchInput").value.trim();
    const categoria = document.getElementById("grammarFilter").value;

    const table = document.getElementById("resultsTable");
    const body = document.getElementById("resultsBody");
    const noRes = document.getElementById("noResults");

    // Se input vuoto → reset UI
    if (query === "") {
        table.classList.add("hidden");
        noRes.classList.add("hidden");
        body.innerHTML = "";
        return;
    }

    const response = await fetch(
        `api/search.php?q=${encodeURIComponent(query)}&cat=${categoria}&dir=${searchDirection}&startsWith=${startsWith ? 1 : 0}`
    );

    const data = await response.json();

    body.innerHTML = "";

    if (data.length > 0) {

        data.forEach(item => {

            body.innerHTML += `
                <tr>
                    <td><strong>${item.Voce}</strong></td>
                    <td><em>${item.Italiano}</em></td>
                    <td>${item.Cat}</td>
                    <td>${item.Tipo}</td>
                    <td>${item.Et_Audio ?? "-"}</td>
                </tr>
            `;
        });

        table.classList.remove("hidden");
        noRes.classList.add("hidden");

    } else {
        table.classList.add("hidden");
        noRes.classList.remove("hidden");
    }
}

// =====================
// RICERCA DA TASTIERA
// =====================
function handleKeyPress() {
    dbSearch();
}

// =====================
// CAMBIO DIREZIONE RICERCA
// =====================
function toggleSearchDirection() {

    const btnText = document.getElementById('dirText');

    searchDirection =
        searchDirection === 'dial-ita'
            ? 'ita-dial'
            : 'dial-ita';

    btnText.textContent =
        searchDirection === 'dial-ita'
            ? 'DIALETTO ➔ ITALIANO'
            : 'ITALIANO ➔ DIALETTO';
}

// =====================
// ALFABETO
// =====================
function buildAlphabetIndex() {

    const grid = document.getElementById('alphabetGrid');

    if (!grid) return;

    const lettere = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    grid.innerHTML = '';

    lettere.forEach(lettera => {

        const btn = document.createElement('button');

        btn.className = 'alpha-btn';
        btn.textContent = lettera;

        btn.onclick = () => {

            document.getElementById("searchInput").value = lettera;

            dbSearch(true);
        };

        grid.appendChild(btn);
    });
}

// =====================
// RESET RICERCA
// =====================
function clearSearch() {

    document.getElementById("searchInput").value = "";

    document.getElementById("resultsBody").innerHTML = "";

    document.getElementById("resultsTable").classList.add("hidden");

    document.getElementById("noResults").classList.add("hidden");
}

// =====================
// PAROLA DEL GIORNO
// =====================
async function buildWordOfDay() {

    const response = await fetch("api/wordofday.php");

    const word = await response.json();

    document.getElementById("wodTermine").textContent = word.Voce;
    document.getElementById("wodTraduzione").textContent = word.Italiano;
    document.getElementById("wodCategoria").textContent = word.Cat;
    document.getElementById("wodDef").textContent = word.Tipo;
}

// =====================
// STATISTICHE
// =====================
async function buildStats() {

    const response = await fetch("api/stats.php");

    const stats = await response.json();

    document.getElementById("statsGrid").innerHTML = `
        <div class="stat-item">
            <strong>${stats.totale}</strong>
            <br>
            Lemmi
        </div>
    `;
}

// =====================
// TAG CLOUD (PAROLE POPOLARI)
// =====================
async function buildTagCloud() {

    const response = await fetch("api/popular.php");

    const words = await response.json();

    const cloud = document.getElementById("tagCloud");

    cloud.innerHTML = "";

    words.forEach(word => {

        const tag = document.createElement("span");

        tag.className = "tag-word";
        tag.textContent = word.Voce;

        tag.onclick = () => {

            document.getElementById("searchInput").value = word.Voce;

            dbSearch();
        };

        cloud.appendChild(tag);
    });
}

// =====================
// AVVIO APPLICAZIONE
// =====================
window.onload = () => {

    buildAlphabetIndex();

    buildWordOfDay();

    buildStats();

    buildTagCloud();

    document
        .getElementById("grammarFilter")
        .addEventListener("change", dbSearch);

    document
        .getElementById("clearSearchBtn")
        ?.addEventListener("click", clearSearch);
};