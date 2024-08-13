<?php

// Assuming the JSON file is in the config directory relative to this script
$jsonFile = __DIR__ . '/config/sponsorclick.json'; 

// Check if the JSON file exists; if not, create it with an initial count of 0
if (!file_exists($jsonFile)) {
    file_put_contents($jsonFile, json_encode(["clickCount" => 0]));
}

// Read the current contents of the JSON file
$data = json_decode(file_get_contents($jsonFile), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Increment the click count
    $data['clickCount'] += 1;
    // Write the updated count back to the JSON file
    file_put_contents($jsonFile, json_encode($data));
    // Return a success message as JSON
    echo json_encode(['success' => true]);
} else {
    // If the request method is not POST, return a 405 Method Not Allowed status
    http_response_code(405); // Method Not Allowed
}

?>
