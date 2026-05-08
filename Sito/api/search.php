<?php

require '../config/db.php';

$q = $_GET['q'] ?? '';
$cat = $_GET['cat'] ?? '';
$dir = $_GET['dir'] ?? 'dial-ita';

$campoRicerca = ($dir === 'dial-ita')
    ? 'Voce'
    : 'Italiano';

$sql = "
SELECT *
FROM AA_01032026_cleaned
WHERE $campoRicerca LIKE :search
";

$params = [
    'search' => "%$q%"
];

if (!empty($cat)) {
    $sql .= " AND Cat = :cat";
    $params['cat'] = $cat;
}

$sql .= " LIMIT 100";

$stmt = $pdo->prepare($sql);

$stmt->execute($params);

$results = $stmt->fetchAll();

header('Content-Type: application/json');

echo json_encode($results);
?>