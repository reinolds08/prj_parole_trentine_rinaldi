<!DOCTYPE html>
<html lang="it">


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-Trentin</title>
    <link rel="stylesheet" href="global.css">
</head>


<body>
    <header>
        <nav>
            <ul>
                <li class="active"><a href="index.php">HOME</a></li>
                <li><a href="Pagine/progetto.php">PROGETTO</a></li>
                <li><a href="Pagine/chisiamo.php">CHI SIAMO</a></li>
            </ul>
        </nav>


        <div class="header-logos">
            <img src="Images/bilinguismo.png" alt="Bilinguismo">
            <img src="Images/linlab.png" alt="Linlab">
            <img src="Images/buonarroti.png" alt="Buonarroti">
        </div>
    </header>


<main class="content">
        <h1 class="ricercaTit">e-Trentin</h1>


        <div class="search-container">
            <div class="search-box">
                <input type="text" id="searchInput" placeholder="Cerca in Dialetto..." onkeyup="handleKeyPress(event)">
                <select id="grammarFilter" class="filter-select">
                    <option value="">Tutte le categorie</option>
                    <option value="sm">Nome maschile (sm)</option>
                    <option value="sf">Nome femminile (sf)</option>
                    <option value="np">Nome proprio (np)</option>
                    <option value="vb">Verbo (vb)</option>
                    <option value="avv">Avverbio (avv)</option>
                </select>
                <button onclick="dbSearch()" class="search-btn">CERCA</button>
            </div>
            <div class="switch-container">
                <button type="button" id="toggleDirection" class="switch-btn" onclick="toggleSearchDirection()">
                    <span id="dirText">DIALETTO ➔ ITALIANO</span>
                </button>
            </div>
        </div>


        <div class="alphabet-index">
            <div class="alphabet-grid" id="alphabetGrid"></div>
        </div>


        <section class="results-section">
            <table id="resultsTable" class="hidden">
                <thead>
                    <tr>
                        <th>Termine</th>
                        <th>Traduzione</th>
                        <th>Categoria</th>
                        <th>Argomento</th>
                        <th>Definizione</th>
                    </tr>
                </thead>
                <tbody id="resultsBody"></tbody>
            </table>
            <div id="noResults" class="hidden">Nessun termine trovato nell'archivio.</div>
        </section>


        <div class="dynamic-sections">
            <div class="dynamic-card word-of-day">
                <div class="card-label">✦ Parola del Giorno</div>
                <div id="wodTermine" class="wod-termine">—</div>
                <div id="wodTraduzione" class="wod-traduzione"></div>
                <div id="wodCategoria" class="wod-categoria"></div>
                <hr class="wod-divider">
                <div id="wodDef" class="wod-def"></div>
            </div>
            <div class="dynamic-card stats-card">
                <div class="card-label">✦ I Numeri del Dizionario</div>
                <div class="stats-grid" id="statsGrid"></div>
            </div>
        </div>


        <section class="popular-section">
            <div class="card-label card-label-dark">✦ Le Parole più Cercate</div>
            <div class="tag-cloud" id="tagCloud"></div>
        </section>
    </main>


    <footer>
        <div class="footer-container">
            <div class="footer-section logos-section">
                <div class="logos-row">
                    <img src="Images/bilinguismo.png" alt="Bilinguismo">
                    <img src="Images/linlab.png" alt="Linlab">
                    <img src="Images/buonarroti.png" alt="Buonarroti">
                </div>
                <img src="Images/Trentino_CoA.svg" alt="Stemma" class="stemma-footer">
            </div>


            <div class="footer-section">
                <h4>DIRITTI E COPYRIGHT</h4>
                <p>© 2026 <strong>Parole Trentine</strong>.</p>
                <p>All Rights Reserved.</p>
                <p>Progetto di valorizzazione linguistica locale.</p>
            </div>


            <div class="footer-section">
                <h4>CONTATTI:</h4>
                <p>e-mail: <a href="mailto:esempio@mail.it">esempio@mail.it</a></p>
                <p>Tel: +39 000 00000 000</p>
                <p>Social: <a href="#">@instagram.username</a></p>
            </div>


            <div class="footer-section">
                <h4>PAGINE:</h4>
                <ul class="footer-links">
                    <li><a href="index.html">HOME</a></li>
                    <li><a href="/Sito/Pagine/progetto.html">PROGETTO</a></li>
                    <li><a href="/Sito/Pagine/chisiamo.html">CHI SIAMO</a></li>
                </ul>
            </div>
        </div>
    </footer>


    <script src="script.js"></script>


</body>
</html>


<?php
$host = '127.0.0.1';
$db   = 'parole_trentine';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';


$dsn = "mysql:host=$host;dbname=$db;charset=$charset";


$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Lancia eccezioni in caso di errore
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // Restituisce un array associativo di default
    PDO::ATTR_EMULATE_PREPARES   => false,                  // Usa prepared statements reali
];


try {
     $pdo = new PDO($dsn, $user, $pass, $options);
     echo" Connesso";
} catch (\PDOException $e) {
     throw new \PDOException($e->getMessage(), (int)$e->getCode());
}


?>

