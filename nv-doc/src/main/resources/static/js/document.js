//inject angular file upload directives and services.
var app = angular.module('fileUpload', ['ngFileUpload']);

app
    .controller(
        'MyCtrl', [
            '$scope',
            'Upload',
            '$timeout',
            function($scope, Upload, $timeout) {
                $scope.$watch('files', function() {
                    $scope.upload($scope.files);
                });
                $scope.$watch('file', function() {
                    if ($scope.file != null) {
                        $scope.upload([$scope.file]);
                    }
                });
                $scope.log = '';
                

                $scope.upload = function(files) {

                    if (files) {
                        var Size = 0;
                        var fileSize = 0;

                        for (var i = 0; i < files.length; i++) {

                            var file = files[i];
                            Size = (files[i].size) / 1048576;
                            fileSize = fileSize + Size;

                        }
                        if (fileSize < 10) {

                            if (files.length < 5) {
                                for (var i = 0; i < files.length; i++) {
                                    var file = files[i];
                                    alert(file.name);

                                    Upload
                                        .upload({
                                            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                                            fields: {
                                                'username': $scope.username
                                            },
                                            file: file
                                        })
                                        .progress(
                                            function(evt) {
                                            	for (var i = 0; i < files.length; i++) {

                                                    var file = files[i];
                                                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

                                                }
                                            	
                                                
                                            })
                                        .success(
                                            function(
                                                data,
                                                status,
                                                headers,
                                                config) {
                                                $timeout(function() {
                                                    $scope.log = 'file: ' +
                                                        config.file.name +
                                                        ', Response: ' +
                                                        JSON
                                                        .stringify(data) +
                                                        '\n' +
                                                        $scope.log;
                                                });
                                            });
                                }
                            } else {
                            	
                            	$scope.legthIncreased = true;
                            	
                            	$scope.length = "Should not upload more than 5 files at a time";
                            	$timeout(function () { $scope.legthIncreased = false; }, 2000);
                            }
                        } else {
                        	$scope.SizeIncreased = true;
                        	$scope.Size = "File Upload Size limit should not exceed 10MB";
                        	$timeout(function () { $scope.SizeIncreased = false; }, 2000);
                        }
                    }


                };
                
                
            }
            
        ]);

 