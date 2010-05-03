/*
Copyright 2010 C42 Engineering, http://c42.in
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under the License
is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

function C42(){
  this.initializeEnvironment();
};

$.extend(C42, {
  Logging: {
    nullLogger: function(message, object){ /* Does nothing */ },
    consoleLogger: function(message, object){ console.log(message); if(object){ console.log(object); } },
    alertLogger: function(message, object){ alert(message); if(object){ alert(object); } },
    htmlLogger: function(message, object){ 
      var text = nil;
      object ? text = message + object.toString() : message;
      $('#loggerDiv').append("<div class='log-entry'>"+ text +"</div>");
    },

    generateLoggingTimestamp: function() {
      var now = new Date();
      return now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ':' + now.getMilliseconds();
    }
  }
});

C42.prototype = {
  initializeEnvironment: function(){
    this.initializeLogging();
  },
  
  initializeLogging: function(fallbackToHtmlLogging){
    var self = this;
    var setupHtmlLogging = function(){
      self.logger = C42.Logging.htmlLogger;
      $('body').prepend("<div id='loggerDiv'></div>");
    };
 
    try {
      if(console != undefined){ self.logger = C42.Logging.consoleLogger; }
      else{ setupDivLogging(); }
    }
    catch(error) {
      if(fallbackToHtmlLogging){ setupHtmlLogging(); }
    }
  },
  
  logger: C42.Logging.nullLogger,

  log: function(text) {
    var message = C42.Logging.generateLoggingTimestamp() + ' => ' + text;
    this.logger(message);
  },

  // Useful with the console logger, where it can be used to inspect an object
  logi: function(object) {
    var message = C42.Logging.generateLoggingTimestamp() + ' => ';
    this.logger(message, object);
  }
}