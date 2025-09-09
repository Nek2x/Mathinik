<?php
session_start();
include 'connect.php'; 

$user_id = $_SESSION['user_id'] ?? null;

if (!$user_id) {
    die("User not logged in.");
}

if (isset($_POST['submit'])) {
    $name = trim($_POST['name']);
    $old_pass = trim($_POST['old_pass']);
    $new_pass = trim($_POST['new_pass']);
    $c_pass = trim($_POST['c_pass']);

    $stmt = $conn->prepare("SELECT * FROM username WHERE id = ?");
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $stmt->close();

    if (!$user) {
        die("User not found.");
    }

    if ($old_pass !== $user['password']) {
        die("Old password is incorrect.");
    }

    if ($new_pass !== $c_pass) {
        die("New passwords do not match.");
    }
    $image_name = $user['image'] ?? null;
    if (!empty($_FILES['image']['name'])) {
        $image_name = time() . '_' . basename($_FILES['image']['name']);
        $target = "../images/" . $image_name;
        if (!move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
            die("Failed to upload image.");
        }
    }

    $update = $conn->prepare("UPDATE username SET username = ?, password = ?, image = ? WHERE id = ?");
    if (!$update) {
        die("Prepare failed: " . $conn->error);
    }
    $update->bind_param("sssi", $name, $new_pass, $image_name, $user_id);
    if ($update->execute()) {
        echo "Profile updated successfully.";
        
    } else {
        echo "Failed to update profile: " . $update->error;
    }
    $update->close();
}
?>
