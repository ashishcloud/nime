define(["ractive","text!Home_p"],function(Ractive,Home_partials){
    var home = new Object({
        app : {
            init : function(){
                
                var d = $.Deferred();
                new Ractive({
                    el: '.contentSection',
                    template: Home_partials,
                    data: {
                        context : nimeConfig.context
                    },
                    onrender : function(data){
                        d.resolve(this);
                    }
                    
                });
               
                
                return d;
            }
        },
        server : {
            
        }
    });
    return home.app.init();
});