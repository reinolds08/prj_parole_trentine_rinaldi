<?php

require '../config/db.php';

$sql = "
SELECT Voce
FROM AA_01032026_cleaned
ORDER BY RAND()
LIMIT 10
";

$stmt = $pdo->query($sql);

$results = $stmt->fetchAll();

header('Content-Type: application/json');

echo json_encode($results);
?>