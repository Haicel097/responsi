<?php
$log_file = "timer_log.txt"; 

// PENANGANAN PENGHAPUSAN LOG 
if (isset($_GET["clear"])) { // Jika parameter 'clear' ada di URL
    if (file_exists($log_file)) { // Cek apakah file log ada
        unlink($log_file); // Hapus file log
    }
    header("Location: save.php"); // Redirect kembali ke halaman ini
    exit; // Hentikan eksekusi skrip
}

// PENANGANAN PENYIMPANAN LOG 
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["time"])) { 
    $time = htmlspecialchars($_POST["time"]); 
    if (!empty($time)) { 
        file_put_contents($log_file, $time . PHP_EOL, FILE_APPEND | LOCK_EX);
    }
    header("Location: save.php"); 
    exit; 
}

$logs = []; 
if (file_exists($log_file)) { 
    $lines = file($log_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $logs = array_reverse($lines);
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Log Waktu Tersimpan</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h2>Log Waktu</h2>
    <p><a href="index.html">← Kembali ke Timer</a></p>

    <form method="get" action="save.php">
        <button type="submit" name="clear" value="1" onclick="return confirm('Hapus semua log?')">Hapus Semua Log</button>
    </form>

    <ul id="logList">
        <?php if (!empty($logs)): ?>
            <?php foreach ($logs as $log_entry): ?>
                <li><?= htmlspecialchars($log_entry) ?></li>
            <?php endforeach; ?>
        <?php else: ?>
            <li>Belum ada log waktu.</li>
        <?php endif; ?>
    </ul>
</body>
</html>
