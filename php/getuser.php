<?php
session_start();
include 'connect.php'; // 

if (!isset($_SESSION['id'])) {
    echo 'Guest';
    exit();
}

$user_id = $_SESSION['id'];

$stmt = $conn->prepare("SELECT username FROM username WHERE id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows === 1) {
    $row = $result->fetch_assoc();
    echo htmlspecialchars($row['username']);
} else {
    echo 'Guest';
}

$stmt->close();
$conn->close();
exit();
?>
