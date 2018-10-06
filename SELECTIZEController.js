define(["ractive","nime","selectize","text!SELECTIZE_p"],function(Ractive,nime,selectize,comp_partials){
    var thisInstance;
    //var uniqTopic = nime.utility.cuniq();
    //--- INITIALIZE PRELOADED SELECTIZE------------------------
    Ractive.components.SELECTIZE = Ractive.extend({
            template: comp_partials,
            onrender() {
        		
                thisElement = this;
        		var config = {
        			create: false,
                    valueField : thisElement.get('valueField'),
                    labelField : thisElement.get('labelField'),
                    placeholder : _.isUndefined(thisElement.get('placeholder')) ? 'Select Value' : thisElement.get('placeholder'),
                    onChange : function(){
                        console.log(this.getValue());
                        thisElement.set('selectizeItem',this.getValue());
                    }
                };
        		var type = thisElement.get('type');
                console.log('printing thisElement for selectize');
                console.log(thisElement.get());
                switch(type){
                    case constants.PRE_LOAD : 
                        config.options = thisElement.get('options');
                    
                    case constants.PRE_LOAD_AJAX :
                        var reqObj = thisElement.get('reqObj');
                        config.preload = true;
                        config.load = function(query, callback) {
                            if (query.length) return callback();
                            thisElement.app.loadRecords(callback,reqObj);
                        } 
                    case constants.LOAD_AJAX :

                    default : 
                        config.options = thisElement.get('options');
                }
    			var selectize = this.selectize = $(this.find('select'))
                .selectize(config);
            },
            app : {
                loadRecords : function(callback,req){
                    thisElement.server.loadRecords(req)
                    .done(function(response){
                        callback(response.result);
                    })
                    .fail(function(error){
                        callback();
                    });
                }
            },
            server : {
                loadRecords : function(req){
                    return nime.utility.sendRequest(req);
                }
            },
            onteardown() {
           		this.selectize.destroy();
           }
	});
	return Ractive.components.SELECTIZE;
});