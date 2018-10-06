define(["ractive","text!Heading_p"],function(Ractive,Heading_partials){
    console.log(Heading_partials);
    Ractive.components.HEADING = Ractive.extend({
			template: Heading_partials,
            data : function(){
            	return {
                	breadCrumb : nimeConfig.context.breadCrumbMapping,
                    title : nimeConfig.context.pageTitle
                };
            }
			
		});
    return Ractive.components.HEADING;
});