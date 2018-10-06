define(["ractive","nime","text!LeftNavigation_p"],function(Ractive,nime,LeftNavigation_Partials){
    var thisElement;
    var MENU_LOAD = 'menu_load';
    Ractive.components.LEFTNAVIGATION = Ractive.extend({
        template: LeftNavigation_Partials,
       
        data : function(){
            return {
                
                page : nimeConfig.context.page,
                logo : nimeConfig.context.appSetting.logo_text
            };
        },
        onrender() {
            thisElement = this;
            this.app.loadRecords();
            
        
        
    	},
        app : {
            loadRecords : function(){
                var d = $.Deferred();
                thisElement.server.getapps()
                .done(function(response){
                    thisElement.set('data',response.result);
                    console.log(response.result);
                    PubSub.publish(MENU_LOAD);
                });

                return d;
            },
            subscribe : function(){
                PubSub.subscribe(constants.TEMPLATE_LOAD,thisElement.app.setTitle);
            },
            setTitle : function(){
                console.log(arguments);
            }
        },
        server : {
            getapps : function(){
                return nime.utility.sendRequest(nimeConfig.endpoints.config.getapps);
            }
        }
        
    });
    return Ractive.components.LEFTNAVIGATION;
});