<?php

require '../config/db.php';

$sql = "
SELECT COUNT(*) as totale
FROM AA_01032026_cleaned
";

$stmt = $pdo->query($sql);

$result = $stmt->fetch();

header('Content-Type: application/json');

echo json_encode($result);
?>