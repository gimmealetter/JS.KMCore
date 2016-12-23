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
		ucfirst: function(s){
			if( !s || !(s=s.toString().trim()) ) return '';
			return s.substr(0,1).toUpperCase()+s.substr(1);
		},
		lcfirst: function(s){
			if( !s || !(s=s.toString().trim()) ) return '';
			return s.substr(0,1).toLowerCase()+s.substr(1);
		}, 
		urlencode: function(s){
			return (s=s.toString().trim()) && encodeURIComponent(s) || "";
		},
		urldecode: function(s){
			return (s=s.toString().trim()) && decodeURIComponent(s) || "";
		},
        type: function( obj ) {
            // from jQuery
            var class2type = kmCore.class2type();
            return obj === null ?
                String( obj ) :
                class2type[ kmCore.core_toString.call(obj) ] || "object";
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
		isFunction: function( obj ) {
            // from jQuery
			return kmCore.type(obj) === "function";
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
		make2array: function( arr ){
			var isobj = arr && kmCore.type(arr),
				ret = [],
				arr = arr || {}, key;

			if( isobj==='object' || isobj==='array' ){
				console.log('isobj')
				for( key in arr ) ret[key] = arr[key];
			}
			return ret;
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
		extend: function() {
            // from jQuery
			var args = kmCore.args2array(arguments),
				target = args.shift(), src, copy, clone,
				copyIsArray, name, options, length, i,
				deep = false, intersect_key = false
			;

			// Handle a deep copy situation
			if ( typeof target === "boolean" ) {
				deep = target;

				// skip the boolean and the target
				target = args.shift() || {};
			}
			// Handle a intersect_key(PHP) situation
			if ( typeof target === "boolean" ) {
				intersect_key = deep;
				deep = target;

				// skip the boolean and the target
				target = args.shift() || {};
			}

			// Handle case when target is a string or something (possible in deep copy)
			if ( typeof target !== "object" && !kmCore.isFunction(target) ) {
				target = {};
			}
			
			length = args.length;
			for( i = 0; i < length ; i++ ){
				if ( !(options=args.shift()) || typeof options !== "object" ) continue;
				for ( name in options ) {
					if( intersect_key && !kmCore.hasOwn.call(target, name) ) continue;
					if( !kmCore.hasOwn.call(options, name) ) continue;
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( kmCore.isPlainObject(copy) || (copyIsArray = kmCore.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && kmCore.isArray(src) ? src : [];

						} else {
							clone = src && kmCore.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = kmCore.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}

			// Return the modified object
			return target;
		},
		array_intersect_key: function(){
			// from PHP array_intersect_key
			var args = kmCore.args2array(arguments),
				target = args.shift(),
				key, deep = false, haskey=false
			;

			// Handle a deep copy situation
			if ( typeof target === "boolean" ) {
				deep = target;

				// skip the boolean and the target
				target = args.shift() || {};
			}

			// Handle case when target is a string or something (possible in deep copy)
			if ( typeof target !== "object" && !kmCore.isFunction(target) ) {
				target = {};
			}
			for( key in target ){
				if( !kmCore.hasOwn.call(target, key) ) continue;
				haskey = true;
				break;
			}
			if( !haskey ){
				target = kmCore.extend(deep, target, args[0]);
			}

			return kmCore.extend.apply(kmCore, [true, deep, target].concat(args) );
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
        },
		//	test all
		test: function(key, expected, isdeep){
			key=key||undefined;
			expected=expected||undefined;
			isdeep=kmCore.type(isdeep)=='boolean'&&isdepp||false;

			if( kmCore.type(expected)=='regexp' ){
				if( kmCore.type(key)!=='string' ) return false;
				return !!( expected.test(key) );
			}else{
				if( isdeep ) return !!(key===expected);
				return !!(key==expected);
			}
		},
		//	query string to object ( [object], string[, string -> key separate, string -> equals ] )
		query2object: function() {
			var 
				args = kmCore.args2array(arguments),
				ret = (kmCore.type(args[0])==="object"||kmCore.type(args[0])==="array") && args.shift() || {}, tmp,
				param = kmCore.type(tmp=args.shift())==="string" && tmp || "",
				sep = kmCore.type(tmp=args.shift())==="string" && tmp || "&",
				eq = kmCore.type(tmp=args.shift())==="string" && tmp || "=",
				i, j, kNv, key, value, k, isobj,
				pattern_array = /\[([^\]]*)\]/,
				pattern_not_array_start = /^[^\[\]]+/, /* is not start with array character */
				pattern_array_start = /^\[([^\]]*)\]$/ /* start with array character and it's property */
				
			;

			var params = param.split( sep );
			for( i in params ){
				if( !params[i] || kmCore.type(params[i])!=="string" ) continue;
				kNv = params[i].split( eq );
				key = kmCore.urldecode(kNv[0]); value = kmCore.urldecode(kNv[1]);
				//	check if is array character( [] ) in key as `key[]subkey`, `key[subkey]`, `key[subkey][]`, `key[]
				if( kmCore.test(key, pattern_array) ){
					//	check if key is not start with array charcter( [] ) as `key[]subkey`, `key[subkey]`, `key[subkey][]`
					if( kmCore.test(key, pattern_not_array_start) && (k=pattern_not_array_start.exec(key)) ){
						key = key.substr(k[0].length);
						k = k[0] || '';
					//	check if key is not start with array charcter( [] ) as `key[]subkey`, `key[subkey]`, `key[subkey][]`
					}else if( (k=pattern_array.exec(key)) ){
						key = key.substr( (k.index+k[0].length) );
						k = k[1] || '';
					}else continue;
					//	check if has key and value
					if( k && key ){
						ret[k] = kmCore.query2object( ret[k]||{}, [key, eq, value].join(""), sep, eq); 
					}else if( k && !key ){
						//ret = kmCore.need2depth(ret, k, value);//ret[key]=value;
						ret[k]=value;
					}else if( !k && key ){
						var 
							ret = (kmCore.isArray(ret) && ret) || [] /* k is empty, It is other list array */						
							, createNew = true /* insert new list */
						;
						for( j in ret ){
							if( typeof ret[j]=="object" &&  !(key in ret[j]) ){
								createNew = false;
								var oldkey = key, oldk;
								//	check if is array character( [] ) in key, check one more cause of this time is in array
								if( kmCore.test(key, pattern_array) ){
									if( kmCore.test(key, pattern_not_array_start) && (k=pattern_not_array_start.exec(key)) ){
										key = key.substr(k[0].length);
										k=k[0] || '';
									}else if( (k=pattern_array.exec(key)) ){
										key = key.substr( (k.index+k[0].length) );
										k=k[1] || '';
									}
									if( kmCore.test(key, pattern_array_start) ){
										oldk = k;
										k=pattern_array_start.exec(key);
										key = k[1] || '';
										k=oldk;
									}
									//	check if has key and value
									if( k && key ){
										if( typeof ret[j][k]=='object' && key in ret[j][k] ){
											key = oldkey;
											continue;
										}
										ret[j][k] = kmCore.query2object( ret[j][k]||{}, [key,eq,value].join(""), sep, eq); 
									}else if( k && !key ){
										//ret[j]=kmCore.need2depth(ret[j], k, value);
										ret[j][k]=value;
									}
								}else{
									ret[j][key] = value;
								}
								break;
							}else if( typeof ret[j]=="object" &&  (key in ret[j]) && typeof ret[j][key]=='object' ){
								createNew = false;
								jQuery.extend(ret[j][key], value);
								break;
							}
						}
						if(createNew){
							var tmp = {}
							tmp[key]=value;
							ret=kmCore.push2object(ret, tmp);
						}
					}else{
						ret=kmCore.push2object(ret, value);

					}
				}else{
					//ret=kmQuery.need2depth(ret, key, value);
					ret[key]=value;
				}
			}
			return ret;
		}
		, object2query : function(){
            // reference from jQuery
			var 
				args = kmCore.args2array(arguments), 
				ret = "", data = kmCore.type(args[0])==="object" && args.shift() || {}, tmp, 
				sep = kmCore.type(tmp=args.shift())==="string" && tmp || "&", eq = kmCore.type(tmp=args.shift())==="string" && tmp || "=", 
				idx, prefix, s = [],
				add = function( key, value ) {
					// If value is a function, invoke it and return its value
					value = kmCore.isFunction( value ) ? value() : ( value == null ? "" : value );
					s[ s.length ] = kmCore.urlencode( key ) + eq + kmCore.urlencode( value );
				},
				build = function( prefix, obj, add ){
					var name, idx;

					if ( kmCore.isArray( obj ) || kmCore.isPlainObject(obj) ) {
						for( idx in obj ){
							build( prefix + "[" + ( kmCore.isPlainObject(obj) ? idx : "" ) + "]", obj[idx], add );
						}
					} else {
						// Serialize scalar item.
						add( prefix, obj );
					}
				}
			;

			for ( prefix in data ) {
				build( prefix, data[ prefix ], add );
			}

			// Return the resulting serialization
			ret = s.join( sep )
			return ret;
		},
		push2object: function(){
			var
				args = kmCore.args2array(arguments),
				ret = (kmCore.type(args[0])==="object"||kmCore.type(args[0])==="array") && args.shift() || {}, 
				val = args.shift(), 
				obj={}, arr=[], key, idx
			;

			if( val!==undefined ){
				if( !kmCore.isArray(ret) ){
					for( key in ret){			
						if( !kmCore.hasOwn.call(ret, key) ) continue;
						if( !isNaN(idx=Number(key)) ) arr[idx] = ret[key];
						else obj[key]=ret[key];
					}
					arr.push(val);
					for( idx in arr ){
						obj[idx]=arr[idx];
					}
					ret = obj;
				}else ret.push(val);
			}
			return ret;
		},
		styling: function(o){
			var args=kmCore.args2array(arguments),
				objs = [], css, st, jQuery=(global||window).jQuery, isjQueryObj;
			if( jQuery && o.jquery ){
				isjQueryObj = true;
			}else objs.push(o);

			for( var css; args.length &&(css=args.shift()); ){
				if( typeof css==="string" ) css = ( kmCore.string2css(css) );
				if( kmCore.isFunction(css) ){
					objs.forEach(function(tmpo){
						css.apply(tmpo);
					});
				}
				else if( kmCore.isPlainObject(css) ){
					if( isjQueryObj ){
						o.css(css);
					}else{
						objs.forEach(function(tmpo){
							if( jQuery ){
								$(tmpo).css(css);
							}else{
								for( st in css ){
									tmpo.style[st] = css[st];
								}
							}
						});
					}
				}
			}
			return o;
		},
		string2css: function(){
			var 
				args = kmCore.args2array(arguments),
				ret = {}, css = args.shift(), tmp,
				sep = kmCore.type(tmp=args.shift())==="string" && tmp || ";", eq = kmCore.type(tmp=args.shift())==="string" && tmp || ":"
			;

			css=(css||"").toString().trim().replace(/(^\s*)|(\s*$)/g, "");
			if( typeof css==="string" ){
				css = css.split(sep);
				for (var part; css.length && (part=css.shift()) && (part=part.split(eq)).length>1;)
					ret[part[0].toLowerCase().replace(/(^\s*)|(\s*$)/g, "")] = (part[1]).replace(/(^\s*)|(\s*$)/g, "");
			}
			return ret;
		}
    };

	global.km.Core = kmCore;
}(this));
