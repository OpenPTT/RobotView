define([], function () {

function Socket(bbsCore) {
    this.onData = null;  //callback to telnet
    this.onError = null; //callback to telnet
    this.onClose = null; //callback to telnet
    this.onStartRequest = null; //callback to telnet
    this.onSocketError = null; //callback to telnet
    this.client = null;
}

Socket.prototype={

    open: function(host, port, onStartRequest, onSocketError) {
    	var net = window.requireNode('net');
    	this.host = host;
    	this.port = port;
      this.onStartRequest = onStartRequest;
      this.onSocketError = onSocketError;
      this.client = new net.Socket();
      this.client.connect(parseInt(this.port), this.host, function() {
      	if(this.onStartRequest)
      	  this.onStartRequest();
      }.bind(this));
      
      this.client.on('data', function(buffer) {
        var ab = new ArrayBuffer(buffer.length);
        var data = new Uint8Array(ab);
        for (var i = 0; i < buffer.length; ++i) {
          data[i] = buffer[i];
        }
        if(this.onData){
        	this.onData(data);
        }
      }.bind(this));
     
      this.client.on('close', function() {
        if(this.onClose){
        	this.onClose();
        }
      }.bind(this));
    },

    shutdownWrite: function() {
      if(this.client) {
      	this.client.destroy();
      	this.client = null;
      }
    },

    close: function(){
      if(this.client) {
      	this.client.destroy();
      	this.client = null;
      }
    },
    
    write: function(dataArray){
      var buffer = new Buffer(dataArray);
      this.client.write(buffer);
    }
};

return Socket;

});

