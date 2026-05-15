<?php

require '../config/db.php';

// 1. Recupero i parametri dall'URL
$q = $_GET['q'] ?? '';
$cat = $_GET['cat'] ?? '';
$dir = $_GET['dir'] ?? 'dial-ita';
$startsWith = ($_GET['startsWith'] ?? '0') === '1';

// 2. Determino la colonna su cui cercare
$campoRicerca = ($dir === 'dial-ita') ? 'Voce' : 'Italiano';

// 3. LOGICA TABELLA DINAMICA
// Prendo la prima lettera (se q è vuoto, uso 'a' come default)
$primaLettera = !empty($q) ? strtolower(substr($q, 0, 1)) : 'a';

// Controllo che sia effettivamente una lettera (da a a z)
// Se è un numero o un simbolo, forziamo 'a' per evitare errori SQL
if (!preg_match('/^[a-z]$/', $primaLettera)) {
    $primaLettera = 'a';
}

// Costruisco il nome della tabella (es. 'aa', 'bb', ecc.)
// strtoupper lo rende maiuscolo: 'AA_01032026_cleaned'
$nomeTabella = strtoupper($primaLettera . $primaLettera) . "_01032026_cleaned";

// 4. Costruzione della Query SQL
// Nota: $nomeTabella e $campoRicerca sono inseriti direttamente perché 
// i nomi di tabelle/colonne non accettano i segnaposti di sicurezza (:name)
$sql = "
SELECT *
FROM $nomeTabella
WHERE $campoRicerca LIKE :search
";

// 5. Gestione dei parametri di ricerca
$params = [
    'search' => $startsWith ? "$q%" : "%$q%"
];

// 6. Filtro opzionale per Categoria
if (!empty($cat)) {
    $sql .= " AND Cat = :cat";
    $params['cat'] = $cat;
}

$sql .= " LIMIT 100";

// 7. Esecuzione
try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $results = $stmt->fetchAll();
} catch (PDOException $e) {
    // In caso di errore (es. la tabella non esiste), restituisco array vuoto
    $results = [];
}

// 8. Risposta in formato JSON
header('Content-Type: application/json');
echo json_encode($results);

?>