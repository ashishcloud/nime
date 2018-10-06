(function ( global, factory ) {

	'use strict';

	// Common JS (i.e. browserify) environment
	if ( typeof module !== 'undefined' && module.exports && typeof require === 'function' ) {
		factory( require( 'ractive' ), require( 'jquery' ) );
	}

	// AMD?
	else if ( typeof define === 'function' && define.amd ) {
		define([ 'ractive', 'jquery' ], factory );
	}

	// browser global
	else if ( global.Ractive && global.jQuery) {
		factory( global.Ractive, global.jQuery );
	}

	else {
		throw new Error( 'Could not find Ractive or jQuery! They must be loaded before the ractive-decorators-select2 plugin' );
	}

}( typeof window !== 'undefined' ? window : this, function ( Ractive, $ ) {

	'use strict';

    var select2Decorator;

    select2Decorator = function (node, type) {

        var ractive = node._ractive.root || node._ractive.ractive;
        var setting = false;
        var observer;

        var options = {};
        if (type) {
            if (!select2Decorator.type.hasOwnProperty(type)) {
                throw new Error( 'Ractive Select2 type "' + type + '" is not defined!' );
            }

            options = select2Decorator.type[type];
            if (typeof options === 'function') {
                options = options.call(this, node);
            }
        }

        // Push changes from ractive to select2
        if (node._ractive.binding) {
            var binding = node._ractive.binding;
            var keypath = binding.keypath ? binding.keypath.str : binding.model.key;
            

            observer = ractive.observe(keypath, function (newvalue) {
            	
                if (!setting) {
                    setting = true;
                    window.setTimeout(function () {
                        if (newvalue === "")
                            $(node).select2("val", "");
                        
                        $(node).change();
                        setting = false;
                    }, 0);
                }
            });
        }

        // Pull changes from select2 to ractive
        $(node).select2(options).on('change', function () {
            if (!setting) {
                setting = true;
                ractive.updateModel();
                setting = false;
            }
        });
        var keypath = binding.keypath ? binding.keypath.str : binding.model.key;
        $(node).select2("val", ractive.get(keypath));
        return {
            teardown: function () {
                $(node).select2('destroy');

                if (observer) {
                    observer.cancel();
                }
            }
        };
    };

    select2Decorator.type = {};

    Ractive.decorators.select2 = select2Decorator;

}));