
<?php
include 'connect.php';
session_start();

if (!isset($_SESSION['username'])) {
    header('Location: login.php');
    exit();
}

echo "Welcome, " . htmlspecialchars($_SESSION['username']) . "!";
?>

<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Home</title>
</head>
<body>
   <h1>Home Page</h1>
   <h2>WEQEQWEQ</h2>
   <p>Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?>!</p>
   <a href="logout.php">Logout</a>
</body>
</html>