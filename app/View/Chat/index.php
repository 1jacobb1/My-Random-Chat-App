<?php echo $this->Html->css(array('bootstrap.min', 'chat_design')); ?>
<?php echo $this->Html->script(array('jquery.min','bootstrap.min', 'socket.io.min', 'chat_action')); ?>
<div class="container">
	<div class="row">
		<div class="col-md-12">
			<div class="panel panel-primary">
				<div class="panel-heading">
					<span class="glyphicon glyphicon-comment"></span> Chat
					<!--
					<div class="btn-group pull-right">
						<button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
							<span class="glyphicon glyphicon-chevron-down"></span>
						</button>
						<ul class="dropdown-menu slidedown">
							 <li><a href="#"><span class="glyphicon glyphicon-refresh"></span>Refresh</a></li>
							<li><a href="#"><span class="glyphicon glyphicon-ok-sign"></span>Available</a></li>
							<li><a href="#"><span class="glyphicon glyphicon-remove"></span>Busy</a></li>
							<li><a href="#"><span class="glyphicon glyphicon-time"></span>Away</a></li>
							<li class="divider"></li>
							<li><a href="#"><span class="glyphicon glyphicon-off"></span>Sign Out</a></li>
						</ul>
					</div>
					-->
				</div>
				<div class="panel-body" id="chat-container">
					<ul class="chat" id="chat-conversation-lists">
					</ul>
				</div>
				<div class="panel-footer">
					<?php echo $this->Form->create(false, array('id' => 'chat-form', 'action' => false)); ?>
					<div class="input-group">
						<input id="btn-input" type="text" class="form-control input-sm chat-input-message" placeholder="Type your message here..." />
						<span class="input-group-btn">
							<button type="submit" class="btn btn-warning btn-sm" id="btn-chat">Send</button>
						</span>
					</div>
					<?php echo $this->Form->end(); ?>
				</div>
			</div>
		</div>
	</div>
</div>
<script>
	var username = '<?php echo $name; ?>';
	var id = username;

	$(function() {

		<?php if (!$noNameAlert): ?>

		chatAction.config.userData = {
			username: username,
			id: id,
			userType: 'user',
			image: 'https://placehold.it/50/FA6F57/fff&text=' + getNameInitials(username)
		};

		chatAction.init();

		chatListener.init();

		chatAction.initializeChatForm();

		<?php else: ?>

		var person = prompt("Please enter your name", "");
		if (person) {

			window.location = '/chat?name=' + person;
		} else {
			window.location = '/chat';
		}
		
		<?php endif; ?>
	});

	function getNameInitials(name) {
		var names = name.split(" ");
		var result = '';
		for (var i = 0; i < 3; i++) {
			if (typeof names[i] !== 'undefined') {
				console.log(names[i]);
				result += names[i].substr(0,1).toUpperCase();
			}
		}
		return result;
	}

</script>