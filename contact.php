<?php
// Receives the contact form POST from index.html and emails it to Senary.

const RECIPIENT = 'inquiry@senary.dev';
const SENDER = 'noreply@senary.dev';
const RATE_LIMIT_SECONDS = 60;

header('Content-Type: application/json');

function respond($status, $ok, $message)
{
    http_response_code($status);
    echo json_encode(['ok' => $ok, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'Method not allowed.');
}

// bots fill in the hidden "website" field, people never see it
if (!empty($_POST['website'])) {
    respond(200, true, 'Thanks! Your message has been sent.');
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$note = trim($_POST['note'] ?? '');

// strip newlines from anything that ends up in a header
$name = str_replace(["\r", "\n"], ' ', $name);

if ($name === '' || $note === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, false, 'Please fill in your name, a valid email, and a note.');
}

if (mb_strlen($name) > 200 || mb_strlen($email) > 254 || mb_strlen($note) > 5000) {
    respond(422, false, 'Your message is too long.');
}

// one submission per IP per minute; Cloudflare passes the real IP in its own header
$ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/senary_contact_' . hash('sha256', $ip);
if (file_exists($rateFile) && time() - filemtime($rateFile) < RATE_LIMIT_SECONDS) {
    respond(429, false, 'Please wait a minute before sending another message.');
}

$subject = "Website inquiry from $name";
$body = "Name: $name\nEmail: $email\n\n$note\n";
$headers = implode("\r\n", [
    'From: Senary Website <' . SENDER . '>',
    "Reply-To: $email",
    'Content-Type: text/plain; charset=UTF-8',
]);

if (!mail(RECIPIENT, $subject, $body, $headers, '-f' . SENDER)) {
    respond(500, false, 'Something went wrong sending your message.');
}

touch($rateFile);
respond(200, true, "Thanks! We'll get back to you shortly.");
