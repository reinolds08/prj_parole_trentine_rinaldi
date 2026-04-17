

    const databaseParole = [
        { termine: "Canederli",  traduzione: "gnocchi di pane",  categoria: "sm",  argomento: "cucina",    def: "Gnocchi di pane raffermo, latte e uova, tipici del Trentino." },
        { termine: "Malghese",   traduzione: "malgaro",          categoria: "sm",  argomento: "mestieri",  def: "Chi gestisce o lavora in una malga, alpeggio d'alta quota." },
        { termine: "Larice",     traduzione: "larice",           categoria: "sm",  argomento: "natura",    def: "Albero aghifoglie tipico delle Alpi, con aghi che cadono in autunno." },
        { termine: "Strudel",    traduzione: "strudel",          categoria: "sm",  argomento: "cucina",    def: "Dolce di pasta arrotolata ripieno di mele, uvetta e cannella." },
        { termine: "Brenten",    traduzione: "biscotto di mais", categoria: "sm",  argomento: "cucina",    def: "Biscotto tradizionale trentino a base di farina di granoturco." },
        { termine: "Castel",     traduzione: "castello",         categoria: "np",  argomento: "luoghi",    def: "Termine ricorrente nei nomi di località trentine, es. Castel Beseno." },
        { termine: "Sludar",     traduzione: "scivolare",        categoria: "vb",  argomento: "natura",    def: "Scivolare sul ghiaccio o sulla neve; usato anche in senso figurato." },
        { termine: "Ramin",      traduzione: "raganella",        categoria: "sf",  argomento: "natura",    def: "Strumento di legno usato durante la Settimana Santa al posto delle campane." },
        { termine: "Ciaspe",     traduzione: "racchette da neve",categoria: "sf",  argomento: "natura",    def: "Calzature a rete per camminare sulla neve senza affondare." },
        { termine: "Dassent",    traduzione: "abbastanza",       categoria: "avv", argomento: "comune",    def: "Avverbio di quantità; equivale all'italiano 'abbastanza' o 'sufficiente'." },
        { termine: "Brentana",   traduzione: "piena del torrente",categoria:"sf",  argomento: "natura",    def: "Improvvisa e violenta piena di un fiume o torrente di montagna." },
        { termine: "Sgrafoun",   traduzione: "graffiare",        categoria: "vb",  argomento: "comune",    def: "Graffiare, scalfire una superficie; anche usato per lamentarsi." },
    ];

 
    const parolePopolari = [
        { termine: "Canederli", pop: 3 },
        { termine: "Strudel",   pop: 3 },
        { termine: "Larice",    pop: 2 },
        { termine: "Ciaspe",    pop: 2 },
        { termine: "Malghese",  pop: 2 },
        { termine: "Sludar",    pop: 1 },
        { termine: "Dassent",   pop: 1 },
        { termine: "Brentana",  pop: 1 },
        { termine: "Ramin",     pop: 1 },
    ];


    function handleKeyPress(e) {
        if (e.key === "Enter") dbSearch();
    }

    function dbSearch() {
        const input    = document.getElementById('searchInput').value.toLowerCase().trim();
        const catFilter= document.getElementById('grammarFilter').value;
        const table    = document.getElementById('resultsTable');
        const body     = document.getElementById('resultsBody');
        const noRes    = document.getElementById('noResults');

        body.innerHTML = "";

        const risultati = databaseParole.filter(item => {
            const matchTesto = input === "" ||
                item.termine.toLowerCase().includes(input) ||
                item.traduzione.toLowerCase().includes(input) ||
                item.def.toLowerCase().includes(input);
            const matchCat = catFilter === "" || item.categoria === catFilter;
            return matchTesto && matchCat;
        });

        document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));

        if (risultati.length > 0) {
            table.classList.remove('hidden');
            noRes.classList.add('hidden');
            risultati.forEach(res => {
                body.innerHTML += `<tr>
                    <td><strong>${res.termine}</strong></td>
                    <td><em>${res.traduzione}</em></td>
                    <td><span class="wod-categoria" style="font-size:0.7rem;padding:1px 8px">${res.categoria}</span></td>
                    <td>${res.argomento.toUpperCase()}</td>
                    <td>${res.def}</td>
                </tr>`;
            });
        } else {
            table.classList.add('hidden');
            noRes.classList.remove('hidden');
        }
    }


    function buildAlphabetIndex() {
        const grid = document.getElementById('alphabetGrid');
        const lettere = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        lettere.forEach(lettera => {
            const btn = document.createElement('button');
            btn.className = 'alpha-btn';
            btn.textContent = lettera;
            btn.onclick = () => filterByLetter(lettera, btn);
            grid.appendChild(btn);
        });
    }

    function filterByLetter(lettera, btnEl) {
        document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
        btnEl.classList.add('active');
        document.getElementById('searchInput').value = '';
        document.getElementById('grammarFilter').value = '';

        const table = document.getElementById('resultsTable');
        const body  = document.getElementById('resultsBody');
        const noRes = document.getElementById('noResults');
        body.innerHTML = '';

        const risultati = databaseParole.filter(item =>
            item.termine.toUpperCase().startsWith(lettera)
        );

        if (risultati.length > 0) {
            table.classList.remove('hidden');
            noRes.classList.add('hidden');
            risultati.forEach(res => {
                body.innerHTML += `<tr>
                    <td><strong>${res.termine}</strong></td>
                    <td><em>${res.traduzione}</em></td>
                    <td><span class="wod-categoria" style="font-size:0.7rem;padding:1px 8px">${res.categoria}</span></td>
                    <td>${res.argomento.toUpperCase()}</td>
                    <td>${res.def}</td>
                </tr>`;
            });
        } else {
            table.classList.add('hidden');
            noRes.classList.remove('hidden');
        }
    }


    function buildWordOfDay() {
        const oggi  = new Date();
        const seed  = oggi.getFullYear() * 10000 + (oggi.getMonth()+1) * 100 + oggi.getDate();
        const index = seed % databaseParole.length;
        const wod   = databaseParole[index];

        document.getElementById('wodTermine').textContent    = wod.termine;
        document.getElementById('wodTraduzione').textContent = '"' + wod.traduzione + '"';
        document.getElementById('wodCategoria').textContent  = wod.categoria;
        document.getElementById('wodDef').textContent        = wod.def;
    }


    function buildStats() {
        const totale = databaseParole.length;
        const categorie = ['sm','sf','np','vb','avv'];
        const labels    = { sm:'Nomi maschili', sf:'Nomi femminili', np:'Nomi propri', vb:'Verbi', avv:'Avverbi' };

        const grid = document.getElementById('statsGrid');


        grid.innerHTML = `<div class="stat-item" style="grid-column:1/-1">
            <div class="stat-num">${totale}</div>
            <div class="stat-label">Totale Lemmi</div>
        </div>`;

        categorie.forEach(cat => {
            const count = databaseParole.filter(p => p.categoria === cat).length;
            grid.innerHTML += `<div class="stat-item">
                <div class="stat-num">${count}</div>
                <div class="stat-label">${labels[cat]}</div>
            </div>`;
        });
    }

    function buildTagCloud() {
        const cloud = document.getElementById('tagCloud');
     
        const shuffled = [...parolePopolari].sort(() => Math.random() - 0.5);
        shuffled.forEach(item => {
            const tag = document.createElement('span');
            tag.className = `tag-word pop-${item.pop}`;
            tag.textContent = item.termine;
            tag.onclick = () => {
                document.getElementById('searchInput').value = item.termine;
                dbSearch();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
            cloud.appendChild(tag);
        });
    }


    buildAlphabetIndex();
    buildWordOfDay();
    buildStats();
    buildTagCloud();