<?php
    $filePath = './config/sponsorclick.json';

    if (file_exists($filePath)) {
        $jsonData = file_get_contents($filePath);
        $data = json_decode($jsonData, true);

        if (isset($data['count'])) {
            $data['count'] += 1;
        } else {
            $data['count'] = 1;
        }

        $newJsonData = json_encode($data, JSON_PRETTY_PRINT);
        file_put_contents($filePath, $newJsonData);
        
        echo json_encode(['success' => true, 'newCount' => $data['count']]);
    } else {
        echo json_encode(['success' => false, 'message' => 'File not found']);
    }
?>
