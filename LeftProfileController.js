define(["ractive","text!LeftProfile_p"],function(Ractive,LeftProfile_partials){
    Ractive.components.LEFTPROFILE = Ractive.extend({
			template: LeftProfile_partials,
			append : true,
			onrender() {
			},
			data : function (){
				return {
					context : nimeConfig.context
				}
				
			},
			onteardown() {
			    
			},
			app : {
				
			},
			server : {
				
			}
		});
    return Ractive.components.LEFTPROFILE;
});