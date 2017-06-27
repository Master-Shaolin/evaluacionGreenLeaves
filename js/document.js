var myApp = angular.module('MyApp', ['ui.bootstrap']);

myApp.controller('FechaCtrl', ['$scope',function($scope) {
    angular.element(document).ready(function () {

    	document.getElementById('myModal').removeAttribute('style');
    	document.getElementsByClassName('msj-container')[0].removeAttribute('style');

        var monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", 
		"Sep", "Oct", "Nov", "Dic"];

		var today = new Date();

    	var picker = new Pikaday({ 
    		field: document.getElementById('datepicker'),
	        minDate: new Date((today.getFullYear() - 100), 0, 1),
        	maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
		    toString(date, format) {

		        const day = date.getDate();
		        const month = monthNames[date.getMonth()];
		        const year = date.getFullYear();
		        return `${day}-${month}-${year}`;
		    },
		    parse(dateString, format) {
		        const parts = dateString.split('/');
		        const day = parseInt(parts[0], 10);
		        const month = parseInt(parts[1] - 1, 10);
		        const year = parseInt(parts[1], 10);
		        return new Date(year, month, day);
		    },
		    i18n: {
				    previousMonth : 'Mes Anterior',
				    nextMonth     : 'Mes Siguiente',
				    months        : ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
				    weekdays      : ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
				    weekdaysShort : ['Do','Lu','Ma','Mi','Ju','Vi','Sa']
				}
    	});
	   	
    });
}]);

myApp.controller('formCtrl', ['$scope','$timeout','$http',function($scope, $timeout,$http) {

		$scope.geolocate= function() {
	        if (navigator.geolocation) {
	          navigator.geolocation.getCurrentPosition(function(position) {
	            var geolocation = {
	              lat: position.coords.latitude,
	              lng: position.coords.longitude
	            };

	            var req = {
					method: 'GET',
					url: 'http://api.openweathermap.org/data/2.5/weather?lat='+geolocation.lat+'&lon='+geolocation.lng+'&units=metric&appid=b55deae1d0d7b31fbdba030b4a9f30fc'
				}

				$http(req).then(function(response){
					$scope.lugar = response.data.name;				  	
				  	$scope.pais = response.data.sys.country;
				    $scope.temperatura = response.data.main.temp;
				});
	            
	          });
	        }
	      }

	    $scope.geolocate();


	$scope.numTel = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/; 
	$scope.active = true;
	$scope.formShow = true;
	$scope.msjShow = false;
	$scope.loadShow = false;

	$scope.showModal = function() {
		$scope.active = false;
	};

	$scope.hideModal = function() {
		$scope.active = true;
	};

	$scope.submitForm = function(form){
		if(form.$valid) {
			var nombre = angular.element( document.querySelector( '#nombre' ) ).val();
			var email = angular.element( document.querySelector( '#email' ) ).val();
			var tel = angular.element( document.querySelector( '#telefono' ) ).val();
			var fecha = angular.element( document.querySelector( '#datepicker' ) ).val();

		   $scope.nombre = nombre;
		   $scope.email = email;
		   $scope.fecha = fecha;

		   $scope.formShow = false;

		   $timeout(function(){$scope.loadShow = true},50);
		   $timeout(function(){$scope.loadShow = false},2000);

		   $timeout(function(){$scope.msjShow = true},2100);

		}else{
			$scope.showModal();
		}
	};
}]);