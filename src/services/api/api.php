<?php
// Headers CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Resposta prévia para requisições OPTIONS (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$jsonFile = 'db.json';
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uriSegments = explode('/', trim($uri, '/'));
$resource = 'contacts';

// Encontrar o índice do ID após 'contacts'
$resourceIndex = array_search($resource, $uriSegments);
$id = null;
if ($resourceIndex !== false && isset($uriSegments[$resourceIndex + 1])) {
    $potentialId = $uriSegments[$resourceIndex + 1];
    if (is_numeric($potentialId)) {
        $id = (int)$potentialId;
    }
}

// Funções de manipulação do JSON
function readJSON() {
    global $jsonFile;
    
    if (!file_exists($jsonFile)) {
        $initialData = ['contacts' => []];
        file_put_contents($jsonFile, json_encode($initialData, JSON_PRETTY_PRINT));
    }
    
    return json_decode(file_get_contents($jsonFile), true);
}

function writeJSON($data) {
    global $jsonFile;
    file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT));
}

$data = readJSON();

// Garante estrutura básica
if (!isset($data['contacts'])) {
    $data['contacts'] = [];
    writeJSON($data);
}

// Log para debug
file_put_contents('debug.log', 
    date('Y-m-d H:i:s') . 
    " - Method: " . $_SERVER['REQUEST_METHOD'] . 
    " - URI: " . $uri . 
    " - ID: " . ($id ?? 'null') . 
    "\n", 
    FILE_APPEND
);

// Rotas
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if ($id !== null) {
            $found = null;
            foreach ($data['contacts'] as $item) {
                if ((int)$item['id'] === $id) {
                    $found = $item;
                    break;
                }
            }
            if ($found) {
                echo json_encode($found);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Contact not found']);
            }
        } else {
            echo json_encode(array_values($data['contacts']));
        }
        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        
        $newId = !empty($data['contacts']) 
            ? max(array_column($data['contacts'], 'id')) + 1 
            : 1;
        
        $input['id'] = (int)$newId;
        $data['contacts'][] = $input;
        writeJSON($data);
        
        http_response_code(201);
        echo json_encode($input);
        break;

    case 'PUT':
        if ($id !== null) {
            $input = json_decode(file_get_contents('php://input'), true);
            $updated = false;
            
            // Log do input recebido
            file_put_contents('debug.log', 
                date('Y-m-d H:i:s') . 
                " - PUT Input: " . 
                json_encode($input) . 
                "\n", 
                FILE_APPEND
            );
            
            foreach ($data['contacts'] as &$item) {
                if ((int)$item['id'] === $id) {
                    $input['id'] = (int)$id;
                    $item = $input;
                    $updated = true;
                    break;
                }
            }
            
            if ($updated) {
                writeJSON($data);
                echo json_encode($input);
            } else {
                http_response_code(404);
                echo json_encode([
                    'error' => 'Contact not found',
                    'requested_id' => $id,
                    'available_ids' => array_column($data['contacts'], 'id')
                ]);
            }
        }
        break;

    case 'PATCH':
        if ($id !== null) {
            $input = json_decode(file_get_contents('php://input'), true);
            $updated = false;
            
            foreach ($data['contacts'] as &$item) {
                if ((int)$item['id'] === $id) {
                    foreach ($input as $key => $value) {
                        $item[$key] = $value;
                    }
                    $updated = true;
                    break;
                }
            }
            
            if ($updated) {
                writeJSON($data);
                echo json_encode($item);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Contact not found']);
            }
        }
        break;

    case 'DELETE':
        if ($id !== null) {
            $originalCount = count($data['contacts']);
            $data['contacts'] = array_filter($data['contacts'], function($item) use ($id) {
                return (int)$item['id'] !== $id;
            });
            
            if (count($data['contacts']) < $originalCount) {
                $data['contacts'] = array_values($data['contacts']); // Reindexar array
                writeJSON($data);
                http_response_code(204);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Contact not found']);
            }
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>