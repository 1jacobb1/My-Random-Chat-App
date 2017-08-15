var chatAction = (function() {

	var obj = {};
	obj.socket = null;
	obj.config = {};
	var element = null;

	obj.init = function() {
		element = this;

		element.initSocketConnection();

		element.informUserConnected();


	}

	obj.initSocketConnection = function() {
		element = this;

		// socket connection to port 3000, using https
		element.socket = io.connect('https://local.sample.nativecamp.net' + ":" + 3000,{
			'reconnection': true,
			'reconnectionDelay': 5000,
			'reconnectionDelayMax' : 10000
		});
	};

	// inform that a user has connected
	obj.informUserConnected = function() {
		element = this;

		element.emitAction({
			emit_id: 'chat',
			emit_dest: 'inform_user_connected',
			message: username + ' has connected',
			userData: element.config.userData
		});
	};

	obj.sendChatMessage = function(msg) {
		element = this;
		element.emitAction({
			emit_id: 'chat',
			emit_dest: 'send_random_chat',
			message: msg,
			userData: element.config.userData,
		});
	};

	obj.emitAction = function(param) {
		element = this;

		element.socket.emit(param.emit_id, param);
	};

	obj.initializeChatForm = function() {
		$('#chat-form').submit(function(e) {
			e.preventDefault();
			var msg = $('.chat-input-message').val();
			if (msg) {
				chatAction.sendChatMessage(msg);
				$('.chat-input-message').val('');
			}
		});
	};

	return obj;
})();

var chatListener = (function(){

	var obj = {};
	var element = null;

	obj.init = function() {
		element = this;

		element.receiveChatCommands();
	};

	obj.receiveChatCommands = function() {
		chatAction.socket.off('chat').on('chat', function(data) {

			var senderData = typeof data !== undefined && typeof data.userData !== undefined ? data.userData : null;
			var emitDest = typeof data !== undefined && typeof data.emit_dest !== undefined ? data.emit_dest : null;

			switch (emitDest){
				case "inform_user_connected":
					// if sender is not the current user
					if (chatAction.config.userData.id != senderData.id) {
						var liFormat = '<li>';
						liFormat += '<div style="text-align: center;">';
						liFormat += '<span class="chat-img" style="top: 50p%; left: 50%; margin:0;">';
						liFormat += '<img src="' + senderData.image + '" alt="User Avatar" class="img-circle" />';
						liFormat += '</span>';
						liFormat += '<div class="chat-body clearfix">';
						liFormat += '<div class="header">';
						liFormat += '<strong class="primary-font">' + senderData.username + '</strong>';
						liFormat += '<span> has joined the room</span>'
						liFormat += '</div>';
						liFormat += '</div>';
						liFormat += '</div>';
						liFormat += '</li>';
					}
				break;
				case "send_random_chat":
						var message = data.message;
						var liClass = senderData.id == chatAction.config.userData.id ? 'right' : 'left';
						var imgPosition = senderData.id == chatAction.config.userData.id ? 'pull-right' : 'pull-left';
						var namePosition = senderData.id == chatAction.config.userData.id ? 'pull-right' : '';
						var liFormat = '<li class=" ' + liClass + ' clearfix">';
							liFormat += '<span class="chat-img ' + imgPosition + '">';
							liFormat += '<img src="' + senderData.image + '" alt="User Avatar" class="img-circle" />';
							liFormat += '</span>';
							liFormat += '<div class="chat-body clearfix">';
							liFormat += '<div class="header">';
							liFormat += '<strong class="' + namePosition + ' primary-font">' + senderData.username + '</strong>';
							liFormat += '</div>';
							liFormat += '<p>';
							liFormat += message;
							liFormat += '</p>';
							liFormat += '</div>';
							liFormat += '</li>';
				break;
				case "chat_disconnect":
					if (chatAction.config.userData.id == senderData.id) {
						var liFormat = '<li>';
						liFormat += '<div style="text-align: center;">';
						liFormat += '<span class="chat-img" style="top: 50p%; left: 50%; margin:0;">';
						liFormat += '<img src="' + senderData.image + '" alt="User Avatar" class="img-circle" />';
						liFormat += '</span>';
						liFormat += '<div class="chat-body clearfix">';
						liFormat += '<div class="header">';
						liFormat += '<strong class="primary-font">' + senderData.username + '</strong>';
						liFormat += '<span> has joined the room</span>'
						liFormat += '</div>';
						liFormat += '</div>';
						liFormat += '</div>';
						liFormat += '</li>';
					} else {
						var liFormat = '<li>';
						liFormat += '<div style="text-align: center;">';
						liFormat += '<span class="chat-img" style="top: 50p%; left: 50%; margin:0;">';
						liFormat += '<img src="' + senderData.image + '" alt="User Avatar" class="img-circle" />';
						liFormat += '</span>';
						liFormat += '<div class="chat-body clearfix">';
						liFormat += '<div class="header">';
						liFormat += '<strong class="primary-font">' + senderData.username + '</strong>';
						liFormat += '<span> has left the room</span>'
						liFormat += '</div>';
						liFormat += '</div>';
						liFormat += '</div>';
						liFormat += '</li>';
					}
				break;
				default:break;
			}
			$('ul#chat-conversation-lists').append(liFormat);
			$('#chat-container').animate({scrollTop: $('#chat-container').prop("scrollHeight")}, 0);
		});
	};

	return obj;
})();