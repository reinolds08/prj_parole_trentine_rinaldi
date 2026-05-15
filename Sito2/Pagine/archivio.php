<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Archivio - Parole Trentine</title>
    <link rel="stylesheet" href="../global.css">
</head>

<body>

    <header>
        <nav>
            <ul>
                <li><a href="../index.php">HOME</a></li>
                <li><a href="progetto.php">PROGETTO</a></li>
                <li><a href="chisiamo.php">CHI SIAMO</a></li>
            </ul>
        </nav>
        <div class="header-logos">
             <img src="../Images/bilinguismo.png" alt="Bilinguismo">
            <img src="../Images/linlab.png" alt="Linlab">
            <img src="../Images/buonarroti.png" alt="Buonarroti">
    </div>
    </header>

    <main class="content">
        <h1 class="ricercaTit">Archivio Completo</h1>

        <div class="alphabet-index">
            <div class="alphabet-grid" id="alphabetGrid"></div>
        </div>

        <div class="search-container" style="margin-bottom: 20px; text-align: center;">
            <div class="search-box" style="display: inline-flex; gap: 10px; align-items: center; justify-content: center;">
                <input type="text" id="searchInput" placeholder="Cerca nell'archivio..." onkeyup="handleKeyPress(event)">
                
                <select id="grammarFilter" class="filter-select">
                    <option value="">Tutte le categorie</option>
                    <option value="Sostantivo">Sostantivo</option>
                    <option value="Verbo">Verbo</option>
                    <option value="Aggettivo">Aggettivo</option>
                    <option value="Avverbio">Avverbio</option>
                </select>
                
                <button id="clearSearchBtn" class="clear-btn">✖</button>
            </div>
            
            <div style="margin-top: 15px;">
                <button class="toggle-btn" onclick="toggleSearchDirection()">
                    <span id="dirText">DIALETTO ➔ ITALIANO</span>
                </button>
            </div>
        </div>

        <section class="results-section">
            <table id="resultsTable" class="results-table hidden">
                <thead>
                    <tr>
                        <th>Voce</th>
                        <th>Italiano</th>
                        <th>Categoria</th>
                        <th>Definizione</th>
                        <th>Audio/Note</th>
                    </tr>
                </thead>
                <tbody id="resultsBody">
                    </tbody>
            </table>

            <div id="noResults" class="no-results hidden">
                Nessun risultato trovato.
            </div>
        </section>
    </main>

    <footer>
        <div class="footer-container">
            <div class="footer-section logos-section">
            <div class="logos-row">
    <img src="../Images/bilinguismo.png" alt="Bilinguismo">
    <img src="../Images/linlab.png" alt="Linlab">
    <img src="../Images/buonarroti.png" alt="Buonarroti">
</div>
<img src="../Images/Trentino_CoA.svg" alt="Stemma" class="stemma-footer">
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
                    <li><a href="../index.php">HOME</a></li>
                    <li><a href="progetto.php">PROGETTO</a></li>
                    <li><a href="chisiamo.php">CHI SIAMO</a></li>
                </ul>
            </div>
        </div>
    </footer>

    <script src="../script.js"></script>

</body>
</html>