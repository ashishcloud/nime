define(["ractive","text!LOADING_p"],function(Ractive,comp_partials){
    Ractive.components.LOADING = Ractive.extend({
        template: comp_partials,
        onrender() {
    	}
    });
    return Ractive.components.LOADING;
});