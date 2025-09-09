<?php
include 'connect.php';
session_start();

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    $stmt = $conn->prepare("SELECT id, password FROM username WHERE username = ?");
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();

        if ($password === $row['password']) { // Plaintext comparison (note: not secure for production)
            $_SESSION['username'] = $username;
            $_SESSION['id'] = $row['id']; // ✅ Match this with your other files

            header("Location: ../home.html");
            exit();
        } else {
            echo "<script>alert('Invalid password'); window.location.href = '../login2.html';</script>";
            exit();
        }
    } else {
        echo "<script>alert('No user found with that username'); window.location.href = '../login2.html';</script>";
        exit();
    }

    $stmt->close();
}

$conn->close();
?>
