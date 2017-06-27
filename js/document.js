var myApp = angular.module('MyApp', ['ui.bootstrap']);

myApp.controller('FechaCtrl', [function() {
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
		        // you should do formatting based on the passed format,
		        // but we will just return 'D/M/YYYY' for simplicity
		        const day = date.getDate();
		        const month = monthNames[date.getMonth()];
		        const year = date.getFullYear();
		        return `${day}-${month}-${year}`;
		    },
		    parse(dateString, format) {
		        // dateString is the result of `toString` method
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

myApp.controller('formCtrl', ['$scope','$timeout' ,function($scope, $timeout) {

	$scope.numTel = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/; 
	$scope.active = true;
	$scope.formShow = true;
	$scope.msjShow = false;

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
			var lugar = angular.element( document.querySelector( '#autocomplete' ) ).val();

		   console.log(nombre, email,tel,fecha,lugar);

		   $scope.nombre = nombre;
		   $scope.email = email;
		   $scope.lugar = lugar;
		   $scope.fecha = fecha;

		   $scope.formShow = false;

		   $timeout(function(){$scope.msjShow = true},500);
		   


		}else{
			$scope.showModal();
			console.log("No Valid");
		}
	};
}]);