<?php
    $data = json_decode(file_get_contents("php://input"), true);
    $testData = json_decode(file_get_contents('assets/tests/test' . $data['testId'] . '.json'), true);

    $questionsArray = $testData['questions'];
    $questionsQuantity = count($questionsArray);
    $totalCorrect = 0;

    for($i = 0; $i < $questionsQuantity; $i++){
        if($questionsArray[$i]['questionType'] == 'checkbox'){
            $currentQuestionAnswers = count($questionsArray[$i]['answer']);
            $rightAnswers = 0;
            foreach($questionsArray[$i]['answer'] as $item){
                if($data[$i][$item]){
                    $rightAnswers++;
                }
            }
            if($currentQuestionAnswers == $rightAnswers){
                $totalCorrect++;
            }
        } elseif ($questionsArray[$i]['answer'] == $data[$i]){
            $totalCorrect++;
        }
    }

    echo json_encode($totalCorrect);

?>