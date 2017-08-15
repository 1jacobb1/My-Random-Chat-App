<?php
class ChatController extends AppController {


	function beforeFilter() {
		$this->layout = false;

		parent::beforeFilter();
	}

	function index() {
		$query = $this->request->query;

		$noNameAlert = true;

		if (isset($query['name']) && !empty($query['name'])) {
			$noNameAlert = false;
		}

		$name = isset($query['name']) ? ucwords($query['name']) : '';

		$this->set('noNameAlert', $noNameAlert);
		$this->set('name', $name);
	}
}