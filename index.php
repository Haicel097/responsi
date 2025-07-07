<?php
$log_file = 'timer_log.txt';

// Simpan waktu jika ada POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['time'])) {
    $time = preg_replace('/[^0-9:]/', '', $_POST['time']); // sanitasi
    file_put_contents($log_file, $time . "\n", FILE_APPEND);
    header("Location: " . $_SERVER['PHP_SELF']);
    exit;
}

// Tampilkan log
if (file_exists($log_file)) {
    $logs = file($log_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($logs) {
        echo "<ol>";
        foreach ($logs as $entry) {
            echo "<li>" . htmlspecialchars($entry) . "</li>";
        }
        echo "</ol>";
    } else {
        echo "<em>Belum ada log waktu.</em>";
    }
} else {
    echo "<em>Belum ada log waktu.</em>";
}
?>