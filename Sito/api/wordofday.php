<?php

require '../config/db.php';

$sql = "
SELECT *
FROM AA_01032026_cleaned
ORDER BY RAND()
LIMIT 1
";

$stmt = $pdo->query($sql);

$result = $stmt->fetch();

header('Content-Type: application/json');

echo json_encode($result);
?>