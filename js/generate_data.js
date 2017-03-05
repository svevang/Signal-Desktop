(function () {
    'use strict';
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    function guid() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    function cloneMessage(messagePattern, offset) {
        var attrs = _(messagePattern.attributes).omit('id');
        _(['decrypted_at',
          'received_at',
          'sent_at',
          'timestamp']).map(function(numericAttr){
              attrs[numericAttr] = attrs[numericAttr] + offset;
        })
        attrs['body'] = 'foobar cloned message: ' + guid();
        return attrs;

    }

    window.addMessages = function(messagePattern, count) {

        console.log("cloning the messagePatter:", messagePattern.attributes)
        _.times(count, function(n){
            new Whisper.Message(cloneMessage(messagePattern, n+1)).save();
        })
        console.log("done!")

    }

})();
