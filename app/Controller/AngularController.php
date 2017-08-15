<?php
class AngularController extends AppController {

	function beforeFilter() {
		$this->layout = false;
		
		parent::beforeFilter();
	}

	function index() {

	}
}