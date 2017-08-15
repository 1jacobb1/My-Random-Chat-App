angularAppJs.controller('fruitsController', ['$scope', function($sc) {

	// make form not editable
	$sc.edit = false;

	// templating of lists
	$sc.lists = [
		{
			'name': 'apple',
			'quantity': 0,
			'price': 15
		},
		{
			'name': 'banana',
			'quantity': 0,
			'price': 8
		}
	];

	$sc.addFruit = function() {

		// checks if all fields were not empty
		if ($sc.fruit_name != '' && $sc.fruit_quantity >= 0 && $sc.fruit_price >= 0) {

			if ($sc.fruit_index >= 0) {
				// update from list
				$sc.lists[$sc.fruit_index] = {'name': $sc.fruit_name, 'quantity': $sc.fruit_quantity, 'price': $sc.fruit_price};

				// set back to add
				$sc.edit = false;

			} else {
				// insert to lists
				$sc.lists.push({'name': $sc.fruit_name, 'quantity': $sc.fruit_quantity, 'price': $sc.fruit_price});
			}

			// clear fields
			$sc.fruit_name = '';
			$sc.fruit_quantity = '';
			$sc.fruit_price = '';
		}
	};

	$sc.deleteFruit = function(index) {

		// deleting from lists
		delete $sc.lists[index];
	};

	$sc.editFruit = function(index) {

		// make editable
		$sc.edit = true;

		// get data from list
		var data = $sc.lists[index];

		// assign value to model
		$sc.fruit_name = data.name;
		$sc.fruit_price = data.price;
		$sc.fruit_quantity = data.quantity;
		$sc.fruit_index = index;
	};
}]);