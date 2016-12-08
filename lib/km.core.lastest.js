/*!
 * Km Core JavaScript Library v1.0.0
 *
 * Copyright Mr.Park and Km-Studio
 *
 * Date: 2016-12-08T12:00Z
 */
 (function(global){
    //  Check if exists namespace `km` and not define km
    if( !("km" in global) ){ global.km = {}; }
    if( !("lib" in global.km) ){ global.km.lib = {}; }

var
    kmCore = {
        core_push: Array.prototype.push,
        core_slice: Array.prototype.slice,
        core_indexOf: Array.prototype.indexOf,
        core_toString: Object.prototype.toString,
        core_hasOwn: Object.prototype.hasOwnProperty,
        core_trim: String.prototype.trim,
        hasOwn: ({}).hasOwnProperty,
        type: function( obj ) {
            // from jQuery
            var class2type = kmCore.class2type();
            return obj === null ?
                String( obj ) :
                class2type[ kmCore.core_toString.call(obj) ] || "object";
        },
        class2type: function(){
            // from jQuery
            var tmp = {};
            ("Boolean Number String Function Array Date RegExp Object").split(" ").filter(function(name) {
                tmp[ "[object " + name + "]" ] = name.toLowerCase();
            });
            return tmp;
        },
        args2array: function( arr, results ) {
            // from jQuery( makeArray )
            var type,
                ret = results || [];

            if ( arr !== null ) {
                // The window, strings (and functions) also have 'length'
                // Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
                type = kmCore.type( arr );

                if ( arr.length === null || type === "string" || type === "function" || type === "regexp" || (arr !== null && arr == arr.window) ) {
                    kmCore.core_push.call( ret, arr );
                } else {
                    kmCore.merge( ret, arr );
                }
            }

            return ret;
        },
        isPlainObject: function( obj ) {
            // from jQuery
            var key;
            if ( kmCore.type( obj ) !== "object" || obj.nodeType || kmCore.isWindow( obj ) ) {
                return false;
            }

            if ( obj.constructor &&
                    !kmCore.hasOwn.call( obj, "constructor" ) &&
                    !kmCore.hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
                return false;
            }

            for ( key in obj ) {}
            return key === undefined || kmCore.hasOwn.call( obj, key );
        },
        isArray: Array.isArray || function( obj ) {
            // from jQuery
            var length = !!obj && typeof obj.length && obj.length,
                type = kmCore.type( obj );

            if ( type === "function" || kmCore.isWindow( obj ) ) {
                return false;
            }

            return type === "array" || length === 0 ||
                typeof length === "number" && length > 0 && ( length - 1 ) in obj;
        },
        isWindow: function( obj ){
            // from jQuery
            return obj !== null && obj === obj.window;
        },
        merge: function( first, second ) {
            // from jQuery
            var l = second.length,
                i = first.length,
                j = 0;

            if ( typeof l === "number" ) {
                for ( ; j < l; j++ ) {
                    first[ i++ ] = second[ j ];
                }

            } else {
                while ( second[j] !== undefined ) {
                    first[ i++ ] = second[ j++ ];
                }
            }

            first.length = i;

            return first;
        },
		inherit: function(){
            var args = kmCore.args2array(arguments),
                prototype, prototypes = {},
                F = function(){},
                Child = args.shift(),
                Parent = args.shift()
            ;
            if( !Child || !Child.constructor ) return;
            if( !Parent || !Parent.constructor ) return Child;
            if( args.length>0 ){
                args.unshift(Parent);
                Parent = kmCore.inherit.apply(kmCore.inherit, args);
            }
            F.prototype = new Parent();
            for( prototype in Child.prototype ){
				if( !(kmCore.hasOwn.call( Child.prototype, prototype )) ) continue;
				prototypes[prototype] = Child.prototype[prototype];
		    }
            Child.prototype = new F();
            for( prototype in prototypes ) Child.prototype[prototype] = prototypes[prototype];
            Child.prototype.constructor = Child;
            return Child;
        }
    };

	global.km.Core = kmCore;
}(global||this));
