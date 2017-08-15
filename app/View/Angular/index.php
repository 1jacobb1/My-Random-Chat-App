<?php echo $this->Html->css(array('bootstrap.min')); ?>
<?php echo $this->Html->script(array('jquery.min', 'angular.min')); ?>
<script type="text/javascript" src="/js/ng/angular.app.js"></script>
<script type="text/javascript" src="/js/ng/controller/fruitsController.js"></script>
<div class="container">
	<div ng-app="angularAppJs" id="fruitsController" ng-controller="fruitsController">
		<h1>Sample Application</h1>
		<p>Enter your Name: <input type="text" ng-model="name"></p>
		<p>Hello {{name}}</p>
		<div ng-init="fruits=['apple', 'banana', 'orange']">
			<p>lists of fruits</p>
			<ul>
				<li ng-repeat="fruit in fruits">{{fruit}}</li>
			</ul>
		</div>
		<hr>
		<div>
			<h2>Insert Fruit</h2>
			<form id="fruit-form" ng-submit="addFruit()">
			<?php echo $this->Form->hidden('fruit_index', array('class' => 'form-control form', 'ng-model' => 'fruit_index')); ?>
			<?php echo $this->Form->input('name', array('class' => 'form-control form', 'ng-model' => 'fruit_name')); ?>
			<?php echo $this->Form->input('quantity', array('class' => 'form-control form', 'ng-model' => 'fruit_quantity', 'type' => 'number')); ?>
			<?php echo $this->Form->input('price', array('class' => 'form-control form', 'ng-model' => 'fruit_price', 'type' => 'number')); ?>
			<br>
			<button type="submit" class="btn btn-success" ng-show="!edit">Add</button>
			<button type="submit" class="btn btn-success" ng-show="edit">Update</button>
			</form>
		</div>
		<hr>
		<div>
			<h2>Fruit List</h2>
			<table class="table">
				<tr>
					<th>fruit</th>
					<th>stocks</th>
					<th>price</th>
					<th>action</th>
				</tr>
				<tr ng-repeat="list in lists track by $index" ng-show="list">
					<td>{{list.name}}</td>
					<td>{{list.quantity}}</td>
					<td>{{list.price}}</td>
					<td>
						<button class="btn btn-default" ng-click="editFruit(this.$index)">edit</button>
						<button class="btn btn-danger" ng-click="deleteFruit(this.$index)">delete</button>
					</td>
				</tr>
			</table>
		</div>
	</div>
</div>