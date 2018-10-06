
define( ["nime","ractive","jquery","LeftProfile","Heading",'text!Template_p','LeftNavigation'
        ,'text!Header_p'
        ,'text!Footer_p','text!LeftProfile_p'], function (nime,Ractive,$,leftProfile,Heading,mainTemplate,LeftNavigation,Header_partials,Footer_partials,LeftProfile_partials) {
    var template = new Object({
        app : {
            init : function(){
                
                var d = $.Deferred();
                new Ractive({
                    el: 'body',
                    append : true,
                    template: mainTemplate,
                    partials: { Header_partials : Header_partials,Footer_partials : Footer_partials },
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
    return template;
});