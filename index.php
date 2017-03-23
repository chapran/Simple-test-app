<!DOCTYPE html>
<html lang="en" ng-app="quizApp">
<head>
	<meta charset="UTF-8">
	<title>Simple quiz</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<link rel="shortcut icon" href=""/>
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="assets/css/styles.css">
	<script src="https://code.jquery.com/jquery-3.2.0.min.js"
	        integrity="sha256-JAW99MJVpJBGcbzEuXk4Az05s/XyDdBomFqNlM3ic+I="
	        crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular-route.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular-resource.min.js"></script>
	<script src="assets/app.module.js"></script>
	<script src="assets/app.config.js"></script>
	<script src="assets/testPage/testPage.module.js"></script>
	<script src="assets/testPage/testContent.component.js"></script>
	<script src="assets/resultPage/resultPage.module.js"></script>
	<script src="assets/resultPage/resultPage.component.js"></script>
	<script src="assets/getResultService/getResultService.module.js"></script>
	<script src="assets/getResultService/getResultService.service.js"></script>

	<!-- HTML5 Shiv and Respond.js IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->
</head>
<body>
	<div class="banner"></div>
	<div ng-view class="quiz-container" ng-cloak></div>
	<script>
        function checkIfValid(elem) {
            var input = $(elem);
            var testItem = $(input).closest('.test-item');
            if(input.attr('ng-required') == 'true'){
				if(input.attr('type') == 'checkbox'){
					if(!$(testItem).find('input:checkbox:checked').length){
                        testItem.addClass('invalid-required');
                        return;
					}
					testItem.removeClass('invalid-required');
				} else {
                    if(input.val() == ''){
                        if(testItem.hasClass('invalid-pattern')){
                            testItem.removeClass('invalid-pattern');
                        }
                        testItem.addClass('invalid-required');
                        return;
                    }
					testItem.removeClass('invalid-required');
				}
            }
            if(input.attr('pattern')){
                if(!new RegExp(input.attr('pattern')).test(input.val())){
                    testItem.addClass('invalid-pattern')
                } else {
                    testItem.removeClass('invalid-pattern');
                }
            }
        };
	</script>
</body>
</html>