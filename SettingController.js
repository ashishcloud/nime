define(["ractive","text!Setting_p"],function(Ractive,page_partials){
    var page = new Object({
        app : {
            init : function(){
                
                var d = $.Deferred();
                new Ractive({
                    el: '.contentSection',
                    template: page_partials,
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
    return page.app.init();
});