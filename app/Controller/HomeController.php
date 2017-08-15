<?php
class HomeController extends AppController {

	function beforeFilter() {
		parent::beforeFilter();

		$this->autoRender = false;
	}

	function index() {
	}
}
