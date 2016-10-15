(function(){
  'use strict';

	angular
	.module('keeebTest',['services'])

	.controller('dataCrtl',['$scope','apiService',function ($scope,apiService){

		$scope.pageLanguages = []; // collection of lagauages and frecuencys from the current pages taking into account all mbs from all groups
		$scope.groups = []; // data collection from API;
		$scope.parms = apiService.parms; // pass tothe view information related to the project, page , etc

		// Api service to make the http request 		
		apiService.getProject.get(function (response){
			$scope.groups = response.data; // pass the group collection to the view

			},function (error){
				
			switch(error.status) {
			    case 401:
			        alert('The server could not verify that you are authorized to access the document you requested.');
			        break;
			    case 400:
			        alert('please check your request');
			        break;
			    case 404:
			        alert('resoruce not found');
			        break;
			    default:
			        alert('request failed, please try again');
			}
		})

		$scope.classifyGroups = function(){ // function to detect the language in every mbs and show it as a property of the Group

			_.each($scope.groups,function (obj){ // iterate over each group inside a page
				var mbs = obj.mbs; // take every time just the mbs property
				obj.languages = []; // create a new property 'array languages'
				obj.counting = {}; // an Object to resume the languajes array property

				_.each(mbs,function (mbsObj){ // iterate over every object inside mbs collection
					var text = mbsObj.text;
					if(text){ // check if the current object has the text property
						guessLanguage.name(text,function(language){ // detecting language
	    				obj.languages.push(language); // pushing detected laguage to the laguages array
	    				return obj;
	    				});
				    }
					
				});

				_.each(obj.languages,function(item){ // resume all the laguages in a group into a property specifying language and frecuency
					obj.counting[item] = obj.counting[item] ? obj.counting[item] +1 : 1;
				});

			});

			$scope.endProcess = true;
		};


		$scope.classifyPage = function(){

			var resumePL = {}; // resume page languages

			$scope.resumeLanguagesPage = []; // array to fill with all the languages from all the mbs

			_.each($scope.groups,function (objGroup){ // process the created group.languages property un get and an array with all languages and frecuency in the page
				 $scope.pageLanguages.push.apply($scope.pageLanguages,objGroup.languages);
			});			
			
			_.each($scope.pageLanguages,function(item){ // resume all the laguages in a group into a object specifying language and frecuency
				resumePL[item] = resumePL[item] ? resumePL[item] +1 : 1;
				});

			_.each(resumePL,function (value,key){ 
				var cobj = {};
				cobj.language = key;
				cobj.frecuency = value;
				$scope.resumeLanguagesPage.push(cobj);
			});

			$scope.finalResults = true;
		};
	}]);
  }());
