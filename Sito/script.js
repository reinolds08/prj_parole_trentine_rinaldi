// --- DATABASE ---
const databaseParole = [
    { termine: "Canederli", traduzione: "gnocchi di pane", categoria: "sm", argomento: "cucina", def: "Gnocchi di pane raffermo, latte e uova." },
    { termine: "Dassent", traduzione: "abbastanza", categoria: "avv", argomento: "comune", def: "Avverbio di quantità." },
    { termine: "Sludar", traduzione: "scivolare", categoria: "vb", argomento: "natura", def: "Scivolare sul ghiaccio o neve." },
    { termine: "Bait", traduzione: "baita", categoria: "sf", argomento: "casa", def: "Tipica costruzione montana in legno o pietra." },
    { termine: "Ciaminara", traduzione: "camino", categoria: "sf", argomento: "casa", def: "Condotto per lo scarico dei fumi." },
    { termine: "Sgnapa", traduzione: "grappa", categoria: "sf", argomento: "cucina", def: "Distillato di vinacce ad alta gradazione." },
    { termine: "Gat", traduzione: "gatto", categoria: "sm", argomento: "animali", def: "Piccolo felino domestico." },
    { termine: "Vardàr", traduzione: "guardare", categoria: "vb", argomento: "comune", def: "Osservare con attenzione." },
    { termine: "Bel", traduzione: "bello", categoria: "agg", argomento: "aggettivi", def: "Piacevole alla vista." },
    { termine: "Fogo", traduzione: "fuoco", categoria: "sm", argomento: "nature", def: "Produzione di calore e luce da combustione." },
    { termine: "Zucher", traduzione: "zucchero", categoria: "sm", argomento: "cucina", def: "Sostanza dolce usata per gli alimenti." },
    { termine: "Anel", traduzione: "anello", categoria: "sm", argomento: "oggetti", def: "Cerchio di metallo prezioso da portare al dito." },
    { termine: "Cuciaret", traduzione: "cucchiaino", categoria: "sm", argomento: "oggetti", def: "Piccolo cucchiaio per caffe es. ho forzato il cucchiaino nella tazzina" }
];

const parolePopolari = [
    { termine: "Canederli", pop: 3 },
    { termine: "Dassent", pop: 1 },
    { termine: "Sgnapa", pop: 3 },  
    { termine: "Vardàr", pop: 2 },  
    { termine: "Bait", pop: 2 }     
];

// --- VARIABILI DI STATO ---
let searchDirection = 'dial-ita'; 
let ultimaLetteraSelezionata = ""; 

// --- GESTIONE ALFABETO ---
function buildAlphabetIndex() {
    const grid = document.getElementById('alphabetGrid');
    if(!grid) return;

    const lettere = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    grid.innerHTML = ''; 

    lettere.forEach(lettera => {
        const btn = document.createElement('button');
        btn.className = 'alpha-btn';
        if (lettera === ultimaLetteraSelezionata) btn.classList.add('active');
        btn.textContent = lettera;
        
        btn.onclick = () => {
            const inArchivio = window.location.pathname.includes("archivio.html");
            const targetUrl = inArchivio ? `archivio.html?lettera=${lettera}` : `Pagine/archivio.html?lettera=${lettera}`;
            window.location.href = targetUrl;
        };
        grid.appendChild(btn);
    });
}

// --- MOTORE DI RICERCA ---
function dbSearch() {
    ultimaLetteraSelezionata = ""; 
    document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
    
    // Nascondi il filtro categoria se si usa la ricerca testuale libera
    const filterContainer = document.getElementById('filterContainer');
    if (filterContainer) filterContainer.classList.add('hidden');
    
    eseguiRicercaFiltrata(true);
}

function eseguiRicercaFiltrata(isTextSearch = false) {
    const inputEl = document.getElementById('searchInput');
    const input = inputEl ? inputEl.value.toLowerCase().trim() : "";
    
    const filterEl = document.getElementById('grammarFilter');
    const filterContainer = document.getElementById('filterContainer');
    const catFilter = filterEl ? filterEl.value : "";
    
    const table = document.getElementById('resultsTable');
    const body = document.getElementById('resultsBody');
    const noRes = document.getElementById('noResults');

    if (!body) return;
    body.innerHTML = "";

    // MOSTRA IL FILTRO solo se c'è una lettera selezionata
    if (ultimaLetteraSelezionata !== "" && filterContainer) {
        filterContainer.classList.remove('hidden');
    }

    const risultati = databaseParole.filter(item => {
        let matchTesto = false;
        
        if (isTextSearch && input !== "") {
            matchTesto = (searchDirection === 'dial-ita') ? 
                item.termine.toLowerCase().includes(input) : 
                item.traduzione.toLowerCase().includes(input);
        } else if (ultimaLetteraSelezionata !== "") {
            matchTesto = item.termine.toUpperCase().startsWith(ultimaLetteraSelezionata);
        }
        
        const matchCat = catFilter === "" || item.categoria === catFilter;
        return matchTesto && matchCat;
    });

    if (risultati.length > 0) {
        table.classList.remove('hidden');
        noRes.classList.add('hidden');
        risultati.forEach(res => {
            body.innerHTML += `<tr>
                <td><strong>${res.termine}</strong></td>
                <td><em>${res.traduzione}</em></td>
                <td><span class="wod-categoria">${res.categoria}</span></td>
                <td>${res.argomento.toUpperCase()}</td>
                <td>${res.def}</td>
            </tr>`;
        });
    } else {
        table.classList.add('hidden');
        if (input !== "" || ultimaLetteraSelezionata !== "") {
            noRes.classList.remove('hidden');
        }
    }
}

// --- INTERFACCIA E WIDGET ---
function toggleSearchDirection() {
    const btnText = document.getElementById('dirText');
    searchDirection = (searchDirection === 'dial-ita') ? 'ita-dial' : 'dial-ita';
    if(btnText) {
        btnText.textContent = (searchDirection === 'dial-ita') ? 'DIALETTO ➔ ITALIANO' : 'ITALIANO ➔ DIALETTO';
    }
}

function buildWordOfDay() {
    const index = new Date().getDate() % databaseParole.length;
    const wod = databaseParole[index];
    if(!document.getElementById('wodTermine')) return;
    document.getElementById('wodTermine').textContent = wod.termine;
    document.getElementById('wodTraduzione').textContent = wod.traduzione;
    document.getElementById('wodCategoria').textContent = wod.categoria;
    document.getElementById('wodDef').textContent = wod.def;
}

function buildStats() {
    const grid = document.getElementById('statsGrid');
    if(!grid) return;
    grid.innerHTML = `<div class="stat-item"><strong>${databaseParole.length}</strong><br>Lemmi</div>`;
}

function buildTagCloud() {
    const cloud = document.getElementById('tagCloud');
    if(!cloud) return; 
    parolePopolari.forEach(item => {
        const tag = document.createElement('span');
        tag.className = `tag-word pop-${item.pop}`;
        tag.textContent = item.termine;
        tag.onclick = () => {
            window.location.href = `Pagine/archivio.html?lettera=${item.termine[0].toUpperCase()}`;
        };
        cloud.appendChild(tag);
    });
}

function handleKeyPress(e) { 
    dbSearch(); // Ricerca istantanea
}

// --- AVVIO APPLICAZIONE ---
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const letteraUrl = urlParams.get('lettera');
    
    if (letteraUrl) {
        ultimaLetteraSelezionata = letteraUrl.toUpperCase();
        // Mostra il contenitore se arriviamo già con una lettera (es. da Home)
        const filterContainer = document.getElementById('filterContainer');
        if (filterContainer) filterContainer.classList.remove('hidden');
    }

    // Inizializzazione componenti
    buildAlphabetIndex();
    buildWordOfDay();
    buildStats();
    buildTagCloud();

    // Evento al cambio della categoria
    const filterEl = document.getElementById('grammarFilter');
    if (filterEl) {
        filterEl.onchange = () => eseguiRicercaFiltrata(false);
    }

    // Esecuzione ricerca iniziale se in archivio
    if (window.location.pathname.includes("archivio.html") && ultimaLetteraSelezionata) {
        eseguiRicercaFiltrata(false);
    }
};