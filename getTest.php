<?php
    $testData = file_get_contents('assets/tests/' . $_GET['Id'] . '.json');

    echo $testData;
?>