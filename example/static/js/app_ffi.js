var ctx;
var ctxs = [];
var programs = [];
var shaders = [];
var buffers = [];
var textures = [];
var uniforms = [];
var HEAP8 = null;
var HEAP16 = null;
var HEAP32 = null;
var HEAPU8 = null;
var HEAPU16 = null;
var HEAPU32 = null;
var HEAPF32 = null;
var HEAPF64 = null;
// uniforms
function uintToString(uintArray) {
    var encodedString = String.fromCharCode.apply(null, uintArray), decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
}
var WebGL = /** @class */ (function () {
    function WebGL() {
    }
    WebGL.prototype.get_context = function (ptr, len) {
        console.log(str(ptr, len));
        ctx = document.querySelector('canvas').getContext("webgl");
        ctxs.push(ctx);
        var ext = ctx.getExtension("WEBGL_compressed_texture_s3tc") ||
            ctx.getExtension("MOZ_WEBGL_compressed_texture_s3tc") ||
            ctx.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        return ctxs.length - 1;
    };
    WebGL.prototype.create_buffer = function () {
        buffers.push(ctx.createBuffer());
        return buffers.length - 1;
    };
    WebGL.prototype.draw_elements = function (mode, count, type, offset) {
        ctx.drawElements(mode, count, type, offset);
    };
    WebGL.prototype.draw_arrays = function (mode, first, count) {
        ctx.drawArrays(mode, first, count);
    };
    WebGL.prototype.clear = function (mask) {
        ctx.clear(mask);
    };
    WebGL.prototype.clear_color = function (r, g, b, a) {
        ctx.clearColor(r, g, b, a);
    };
    WebGL.prototype.enable = function (cap) {
        ctx.enable(cap);
    };
    WebGL.prototype.create_program = function () {
        programs.push(ctx.createProgram());
        return programs.length - 1;
    };
    WebGL.prototype.attach_shader = function (programRef, shaderRef) {
        ctx.attachShader(programs[programRef], shaders[shaderRef]);
    };
    WebGL.prototype.compile_shader = function (shaderRef) {
        ctx.compileShader(shaders[shaderRef]);
    };
    WebGL.prototype.bind_buffer = function (target, bufferRef) {
        ctx.bindBuffer(target, buffers[bufferRef]);
    };
    WebGL.prototype.buffer_data = function (target, buffer_ptr, length, usage) {
        console.log(buffer_ptr, length);
        var buffer = HEAPU8.subarray(buffer_ptr, buffer_ptr + length);
        console.log(buffer);
        ctx.bufferData(target, buffer, usage);
    };
    /// textures
    WebGL.prototype.create_texture = function () {
        textures.push(ctx.createTexture());
        return textures.length - 1;
    };
    WebGL.prototype.bind_texture = function (target, textureRef) {
        ctx.bindTexture(target, textures[textureRef]);
    };
    WebGL.prototype.tex_image2d = function (target, level, internalformat, width, height, border, format, type, buffer_ptr, buffer_length) {
        var buffer = HEAPU8.subarray(buffer_ptr, buffer_ptr + buffer_length);
        ctx.texImage2D(target, level, internalformat, width, height, border, format, type, buffer);
    };
    WebGL.prototype.tex_sub_image2d = function (target, level, x, y, width, height, format, type, buffer_ptr, buffer_length) {
        var buffer = HEAPU8.subarray(buffer_ptr, buffer_ptr + buffer_length);
        ctx.texSubImage2D(target, level, x, y, width, height, format, type, buffer);
    };
    WebGL.prototype.compressed_tex_image2d = function (target, level, internalformat, width, height, border, buffer_ptr, length) {
        var buffer = HEAPU8.subarray(buffer_ptr, buffer_ptr + length);
        ctx.compressedTexImage2D(target, level, internalformat, width, height, border, buffer);
    };
    WebGL.prototype.compressed_tex_sub_image2d = function (target, level, x, y, width, height, border, buffer_ptr, length) {
        var buffer = HEAPU8.subarray(buffer_ptr, buffer_ptr + length);
        ctx.compressedTexSubImage2D(target, level, x, y, width, height, border, buffer);
    };
    WebGL.prototype.get_uniform_location = function (program_ref, buffer_ptr, buffer_length) {
        var location = ctx.getUniformLocation(programs[program_ref], str(buffer_ptr, buffer_length));
        uniforms.push(location);
        return uniforms.length - 1;
    };
    WebGL.prototype.uniform_matrix_4fv = function (locationRef, buffer_ptr) {
        var buffer = HEAPF32.subarray(buffer_ptr, buffer_ptr + 16);
        ctx.uniformMatrix4fv(uniforms[locationRef], false, buffer);
    };
    WebGL.prototype.uniform_matrix_3fv = function (locationRef, buffer_ptr) {
        var buffer = HEAPF32.subarray(buffer_ptr, buffer_ptr + 9);
        ctx.uniformMatrix4fv(uniforms[locationRef], false, buffer);
    };
    WebGL.prototype.uniform_matrix_2fv = function (locationRef, buffer_ptr) {
        var buffer = HEAPF32.subarray(buffer_ptr, buffer_ptr + 4);
        ctx.uniformMatrix4fv(uniforms[locationRef], false, buffer);
    };
    // shaders
    WebGL.prototype.create_shader = function (kind) {
        shaders.push(ctx.createShader(kind));
        return shaders.length - 1;
    };
    WebGL.prototype.use_program = function (ref) {
        ctx.useProgram(programs[ref]);
    };
    WebGL.prototype.link_program = function (ref) {
        ctx.linkProgram(programs[ref]);
    };
    WebGL.prototype.enable_vertex_attrib_array = function (index) {
        ctx.enableVertexAttribArray(index);
    };
    WebGL.prototype.get_attrib_location = function (ref, ptr, len) {
        return ctx.getAttribLocation(programs[ref], str(ptr, len));
    };
    WebGL.prototype.shader_source = function (ref, ptr, len) {
        ctx.shaderSource(shaders[ref], str(ptr, len));
    };
    WebGL.prototype.vertex_attrib_pointer = function (index, size, kind, normalized, stride, offset) {
        ctx.vertexAttribPointer(index, size, kind, normalized, stride, offset);
    };
    WebGL.prototype.viewport = function (x, y, width, height) {
        ctx.viewport(x, y, width, height);
    };
    WebGL.prototype.tex_parameteri = function (target, pname, param) {
        ctx.texParameteri(target, pname, param);
    };
    WebGL.prototype.tex_parameterf = function (target, pname, param) {
        ctx.texParameterf(target, pname, param);
    };
    WebGL.prototype.blend_func = function (p1, p2) {
        ctx.blendFunc(p1, p2);
    };
    WebGL.prototype.get_program_parameter = function (ref, pname) {
        ctx.getProgramParameter(programs[ref], pname);
    };
    return WebGL;
}());
function str(ptr, len) {
    var buffer = HEAPU8.subarray(ptr, ptr + len);
    var res = uintToString(buffer);
    console.log(res);
    return res;
}







"use strict";

if( typeof Rust === 'undefined' ) {
    var Rust = {};
}

(function( root, factory ) {
    if( typeof define === "function" && define.amd ) {
        define( [], factory );
    } else if( typeof module === "object" && module.exports ) {
        module.exports = factory();
    } else {
        factory();
    }
}( this, function() {
    const Module = {};

    Object.defineProperty( Module, 'nodejs', { value: (typeof window === 'undefined') } );
    Object.defineProperty( Module, 'exports', { value: {} } );

    var __imports = {
        env: {
            "attach_shader":function($0,d){

            },
            "__extjs_21ca452112a9fbc71e2e43a589896d83c68b5791": function($0, $1) {
                $1 = Module.STDWEB.to_js($1);Module.STDWEB.from_js($0, (function(){return ($1). key ;})());
            },
            "__extjs_d8a439451216bbc6cd9f3012f189d2ad6a2e9459": function($0) {
                Module.STDWEB.decrement_refcount( $0 );
            },
            "__extjs_7211d6f2d9eff792eebbd5d2865d5f0418bcb33b": function($0, $1) {
                $1 = Module.STDWEB.to_js($1);Module.STDWEB.from_js($0, (function(){return ($1). shiftKey ;})());
            },
            "__extjs_b7eb0dd4cff5146e43c4cdffebf6594238cf7f35": function($0, $1) {
                $1 = Module.STDWEB.to_js($1);Module.STDWEB.from_js($0, (function(){return ($1). ctrlKey ;})());
            },
            "__extjs_e47160e12f150e95eb6181ee62900bd4d5239462": function($0, $1) {
                $1 = Module.STDWEB.to_js($1);Module.STDWEB.from_js($0, (function(){return ($1). altKey ;})());
            },
            "__extjs_de942ef9ccd064c41dc92d5b5bf83c61aeb00278": function($0) {
                Module.STDWEB.increment_refcount( $0 );
            },
            "__extjs_81d99dd180b9769eb1e2b2849590216cf5c21704": function($0, $1, $2, $3) {
                $1 = Module.STDWEB.to_js($1);$2 = Module.STDWEB.to_js($2);$3 = Module.STDWEB.to_js($3);Module.STDWEB.from_js($0, (function(){var listener = ($1); ($2). addEventListener (($3), listener); return listener ;})());
            },
            "__extjs_2339159f69df37bd6978051aaf3e31da270868de": function($0, $1) {
                $0 = Module.STDWEB.to_js($0);$1 = Module.STDWEB.to_js($1);($0). appendChild (($1));
            },
            "__extjs_50cbd3119b7e04a174c88cd33e066670f47cff08": function($0, $1, $2, $3, $4) {
                $1 = Module.STDWEB.to_js($1);$2 = Module.STDWEB.to_js($2);$3 = Module.STDWEB.to_js($3);$4 = Module.STDWEB.to_js($4);Module.STDWEB.from_js($0, (function(){(($1)). width = ($2); ($3). height = ($4);})());
            },
            "__extjs_d2a250d62bf28bb208f3309c7a8febc48ae3d545": function($0, $1) {
                $1 = Module.STDWEB.to_js($1);Module.STDWEB.from_js($0, (function(){return ($1). button ;})());
            },
            "__extjs_7454d04402ec90b4dd0de9abaf2d2d650112f2e3": function($0) {
                return (Module.STDWEB.acquire_js_reference( $0 ) instanceof MouseEvent) | 0;
            },
            "__extjs_ff2c75b4783fd5c9d8c934bbd4a03e66527e05e4": function($0) {
                Module.STDWEB.tmp = Module.STDWEB.to_js( $0 );
            },
            "__extjs_e9d84225304abfe1f0ac0649a5e9eacd15517749": function($0) {
                return (Module.STDWEB.acquire_js_reference( $0 ) instanceof KeyboardEvent) | 0;
            },
            "__extjs_9cf428dee14d1964cc17299e9fe172650807fda0": function($0, $1) {
                $1 = Module.STDWEB.to_js($1);Module.STDWEB.from_js($0, (function(){return ($1). clientX ;})());
            },
            "__extjs_5adb95238d9dac0e08ded31e685c9f5ace085883": function($0, $1) {
                $1 = Module.STDWEB.to_js($1);Module.STDWEB.from_js($0, (function(){return ($1). clientY ;})());
            },
            "__extjs_cf8ef57870d176e111428c0ad472311c5c8d5d07": function($0) {
                Module.STDWEB.from_js($0, (function(){return window ;})());
            },
            "__extjs_d12a8a2eb9b1308d78c85a774baa5ccf56165b6a": function($0) {
                Module.STDWEB.from_js($0, (function(){return document ;})());
            },
            "__extjs_008fcd530c4c00d7d2ff52fe174987cf5bb4c829": function($0, $1, $2) {
                $1 = Module.STDWEB.to_js($1);$2 = Module.STDWEB.to_js($2);Module.STDWEB.from_js($0, (function(){return ($1). querySelector (($2));})());
            },
            "__extjs_0e0435c2fbabe7db6df9fbbf664296db7d516457": function($0, $1, $2) {
                $1 = Module.STDWEB.to_js($1);$2 = Module.STDWEB.to_js($2);Module.STDWEB.from_js($0, (function(){return ($1). createElement (($2));})());
            },
            "__extjs_8adab11649c3c91785d157bc51cb5d1ce1d8d8f8": function() {
                Module.STDWEB = {};   Module.STDWEB.to_utf8 = function to_utf8( str, addr ) {     for( var i = 0; i < str.length; ++i ) {                                    var u = str.charCodeAt( i );          if( u >= 0xD800 && u <= 0xDFFF ) {             u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt( ++i ) & 0x3FF);         }          if( u <= 0x7F ) {             HEAPU8[ addr++ ] = u;         } else if( u <= 0x7FF ) {             HEAPU8[ addr++ ] = 0xC0 | (u >> 6);             HEAPU8[ addr++ ] = 0x80 | (u & 63);         } else if( u <= 0xFFFF ) {             HEAPU8[ addr++ ] = 0xE0 | (u >> 12);             HEAPU8[ addr++ ] = 0x80 | ((u >> 6) & 63);             HEAPU8[ addr++ ] = 0x80 | (u & 63);         } else if( u <= 0x1FFFFF ) {             HEAPU8[ addr++ ] = 0xF0 | (u >> 18);             HEAPU8[ addr++ ] = 0x80 | ((u >> 12) & 63);             HEAPU8[ addr++ ] = 0x80 | ((u >> 6) & 63);             HEAPU8[ addr++ ] = 0x80 | (u & 63);         } else if( u <= 0x3FFFFFF ) {             HEAPU8[ addr++ ] = 0xF8 | (u >> 24);             HEAPU8[ addr++ ] = 0x80 | ((u >> 18) & 63);             HEAPU8[ addr++ ] = 0x80 | ((u >> 12) & 63);             HEAPU8[ addr++ ] = 0x80 | ((u >> 6) & 63);             HEAPU8[ addr++ ] = 0x80 | (u & 63);         } else {             HEAPU8[ addr++ ] = 0xFC | (u >> 30);             HEAPU8[ addr++ ] = 0x80 | ((u >> 24) & 63);             HEAPU8[ addr++ ] = 0x80 | ((u >> 18) & 63);             HEAPU8[ addr++ ] = 0x80 | ((u >> 12) & 63);             HEAPU8[ addr++ ] = 0x80 | ((u >> 6) & 63);             HEAPU8[ addr++ ] = 0x80 | (u & 63);         }     } };  Module.STDWEB.noop = function() {}; Module.STDWEB.to_js = function to_js( address ) {     var kind = HEAPU8[ address + 12 ];     if( kind === 0 ) {         return undefined;     } else if( kind === 1 ) {         return null;     } else if( kind === 2 ) {         return HEAP32[ address / 4 ];     } else if( kind === 3 ) {         return HEAPF64[ address / 8 ];     } else if( kind === 4 ) {         var pointer = HEAPU32[ address / 4 ];         var length = HEAPU32[ (address + 4) / 4 ];         return Module.STDWEB.to_js_string( pointer, length );     } else if( kind === 5 ) {         return false;     } else if( kind === 6 ) {         return true;     } else if( kind === 7 ) {         var pointer = HEAPU32[ address / 4 ];         var length = HEAPU32[ (address + 4) / 4 ];         var output = [];         for( var i = 0; i < length; ++i ) {             output.push( Module.STDWEB.to_js( pointer + i * 16 ) );         }         return output;     } else if( kind === 8 ) {         var value_array_pointer = HEAPU32[ address / 4 ];         var length = HEAPU32[ (address + 4) / 4 ];         var key_array_pointer = HEAPU32[ (address + 8) / 4 ];         var output = {};         for( var i = 0; i < length; ++i ) {             var key_pointer = HEAPU32[ (key_array_pointer + i * 8) / 4 ];             var key_length = HEAPU32[ (key_array_pointer + 4 + i * 8) / 4 ];             var key = Module.STDWEB.to_js_string( key_pointer, key_length );             var value = Module.STDWEB.to_js( value_array_pointer + i * 16 );             output[ key ] = value;         }         return output;     } else if( kind === 9 || kind === 11 || kind === 12 ) {         return Module.STDWEB.acquire_js_reference( HEAP32[ address / 4 ] );     } else if( kind === 10 ) {         var adapter_pointer = HEAPU32[ address / 4 ];         var pointer = HEAPU32[ (address + 4) / 4 ];         var deallocator_pointer = HEAPU32[ (address + 8) / 4 ];         var output = function() {             if( pointer === 0 ) {                 throw new ReferenceError( "Already dropped Rust function called!" );             }              var args = Module.STDWEB.alloc( 16 );             Module.STDWEB.serialize_array( args, arguments );             Module.STDWEB.dyncall( "vii", adapter_pointer, [pointer, args] );             var result = Module.STDWEB.tmp;             Module.STDWEB.tmp = null;              return result;         };          output.drop = function() {             output.drop = Module.STDWEB.noop;             var function_pointer = pointer;             pointer = 0;              Module.STDWEB.dyncall( "vi", deallocator_pointer, [function_pointer] );         };          return output;     } else if( kind === 13 ) {         var adapter_pointer = HEAPU32[ address / 4 ];         var pointer = HEAPU32[ (address + 4) / 4 ];         var deallocator_pointer = HEAPU32[ (address + 8) / 4 ];         var output = function() {             if( pointer === 0 ) {                 throw new ReferenceError( "Already called or dropped FnOnce function called!" );             }              output.drop = Module.STDWEB.noop;             var function_pointer = pointer;             pointer = 0;              var args = Module.STDWEB.alloc( 16 );             Module.STDWEB.serialize_array( args, arguments );             Module.STDWEB.dyncall( "vii", adapter_pointer, [function_pointer, args] );             var result = Module.STDWEB.tmp;             Module.STDWEB.tmp = null;              return result;         };          output.drop = function() {             output.drop = Module.STDWEB.noop;             var function_pointer = pointer;             pointer = 0;              Module.STDWEB.dyncall( "vi", deallocator_pointer, [function_pointer] );         };          return output;     } else if( kind === 14 ) {         var pointer = HEAPU32[ address / 4 ];         var length = HEAPU32[ (address + 4) / 4 ];         var array_kind = HEAPU32[ (address + 8) / 4 ];         var pointer_end = pointer + length;          switch( array_kind ) {             case 0:                 return HEAPU8.subarray( pointer, pointer_end );             case 1:                 return HEAP8.subarray( pointer, pointer_end );             case 2:                 return HEAPU16.subarray( pointer, pointer_end );             case 3:                 return HEAP16.subarray( pointer, pointer_end );             case 4:                 return HEAPU32.subarray( pointer, pointer_end );             case 5:                 return HEAP32.subarray( pointer, pointer_end );             case 6:                 return HEAPF32.subarray( pointer, pointer_end );             case 7:                 return HEAPF64.subarray( pointer, pointer_end );         }     } };  Module.STDWEB.serialize_object = function serialize_object( address, value ) {     var keys = Object.keys( value );     var length = keys.length;     var key_array_pointer = Module.STDWEB.alloc( length * 8 );     var value_array_pointer = Module.STDWEB.alloc( length * 16 );     HEAPU8[ address + 12 ] = 8;     HEAPU32[ address / 4 ] = value_array_pointer;     HEAPU32[ (address + 4) / 4 ] = length;     HEAPU32[ (address + 8) / 4 ] = key_array_pointer;     for( var i = 0; i < length; ++i ) {         var key = keys[ i ];         var key_length = Module.STDWEB.utf8_len( key );         var key_pointer = Module.STDWEB.alloc( key_length );         Module.STDWEB.to_utf8( key, key_pointer );          var key_address = key_array_pointer + i * 8;         HEAPU32[ key_address / 4 ] = key_pointer;         HEAPU32[ (key_address + 4) / 4 ] = key_length;          Module.STDWEB.from_js( value_array_pointer + i * 16, value[ key ] );     } };  Module.STDWEB.serialize_array = function serialize_array( address, value ) {     var length = value.length;     var pointer = Module.STDWEB.alloc( length * 16 );     HEAPU8[ address + 12 ] = 7;     HEAPU32[ address / 4 ] = pointer;     HEAPU32[ (address + 4) / 4 ] = length;     for( var i = 0; i < length; ++i ) {         Module.STDWEB.from_js( pointer + i * 16, value[ i ] );     } };  Module.STDWEB.from_js = function from_js( address, value ) {     var kind = Object.prototype.toString.call( value );     if( kind === "[object String]" ) {         var length = Module.STDWEB.utf8_len( value );         var pointer = 0;         if( length > 0 ) {             pointer = Module.STDWEB.alloc( length );             Module.STDWEB.to_utf8( value, pointer );         }         HEAPU8[ address + 12 ] = 4;         HEAPU32[ address / 4 ] = pointer;         HEAPU32[ (address + 4) / 4 ] = length;     } else if( kind === "[object Number]" ) {         if( value === (value|0) ) {             HEAPU8[ address + 12 ] = 2;             HEAP32[ address / 4 ] = value;         } else {             HEAPU8[ address + 12 ] = 3;             HEAPF64[ address / 8 ] = value;         }     } else if( value === null ) {         HEAPU8[ address + 12 ] = 1;     } else if( value === undefined ) {         HEAPU8[ address + 12 ] = 0;     } else if( value === false ) {         HEAPU8[ address + 12 ] = 5;     } else if( value === true ) {         HEAPU8[ address + 12 ] = 6;     } else {         var refid = Module.STDWEB.acquire_rust_reference( value );         var id = 9;         if( kind === "[object Object]" ) {             id = 11;         } else if( kind === "[object Array]" || kind === "[object Arguments]" ) {             id = 12;         }          HEAPU8[ address + 12 ] = id;         HEAP32[ address / 4 ] = refid;     } };    Module.STDWEB.to_js_string = function to_js_string( index, length ) {     index = index|0;     length = length|0;     var end = (index|0) + (length|0);     var output = "";     while( index < end ) {         var x = HEAPU8[ index++ ];         if( x < 128 ) {             output += String.fromCharCode( x );             continue;         }         var init = (x & (0x7F >> 2));         var y = 0;         if( index < end ) {             y = HEAPU8[ index++ ];         }         var ch = (init << 6) | (y & 63);         if( x >= 0xE0 ) {             var z = 0;             if( index < end ) {                 z = HEAPU8[ index++ ];             }             var y_z = ((y & 63) << 6) | (z & 63);             ch = init << 12 | y_z;             if( x >= 0xF0 ) {                 var w = 0;                 if( index < end ) {                     w = HEAPU8[ index++ ];                 }                 ch = (init & 7) << 18 | ((y_z << 6) | (w & 63));             }         }         output += String.fromCharCode( ch );         continue;     }     return output; };  var id_to_ref_map = {}; var id_to_refcount_map = {}; var ref_to_id_map = new WeakMap(); var ref_to_id_symbol_map = {}; var last_refid = 1;  Module.STDWEB.acquire_rust_reference = function( reference ) {     if( reference === undefined || reference === null ) {         return 0;     }      var refid = ref_to_id_map.get( reference );     if( refid === undefined ) {         refid = ref_to_id_symbol_map[ reference ];     }      if( refid === undefined ) {         refid = last_refid++;         if( typeof reference === "symbol" ) {             ref_to_id_symbol_map[ reference ] = refid;         } else {             ref_to_id_map.set( reference, refid );         }         id_to_ref_map[ refid ] = reference;         id_to_refcount_map[ refid ] = 1;     } else {         id_to_refcount_map[ refid ]++;     }      return refid; };  Module.STDWEB.acquire_js_reference = function( refid ) {     return id_to_ref_map[ refid ]; };  Module.STDWEB.increment_refcount = function( refid ) {     id_to_refcount_map[ refid ]++; };  Module.STDWEB.decrement_refcount = function( refid ) {     id_to_refcount_map[ refid ]--;     if( id_to_refcount_map[ refid ] === 0 ) {         var reference = id_to_ref_map[ refid ];         delete id_to_ref_map[ refid ];         delete id_to_refcount_map[ refid ];         if( typeof reference === "symbol" ) {             delete ref_to_id_symbol_map[ reference ];         } else {             ref_to_id_map.delete( reference );         }     } }; Module.STDWEB.alloc = Module.web_malloc; Module.STDWEB.dyncall = function( signature, ptr, args ) {     return Module.web_table.get( ptr ).apply( null, args ); };  Module.STDWEB.utf8_len = function utf8_len( str ) {     let len = 0;     for( let i = 0; i < str.length; ++i ) {                           let u = str.charCodeAt( i );          if( u >= 0xD800 && u <= 0xDFFF ) {             u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt( ++i ) & 0x3FF);         }          if( u <= 0x7F ) {             ++len;         } else if( u <= 0x7FF ) {             len += 2;         } else if( u <= 0xFFFF ) {             len += 3;         } else if( u <= 0x1FFFFF ) {             len += 4;         } else if( u <= 0x3FFFFFF ) {             len += 5;         } else {             len += 6;         }     }     return len; };
            },
            "__extjs_dc2fd915bd92f9e9c6a3bd15174f1414eee3dbaf": function() {
                console.error( 'Encountered a panic!' );
            },
            "__extjs_b00b05929b445348eab177b6d3f509bcaa28782e": function($0, $1) {
                console.error( 'Panic error message:', Module.STDWEB.to_js_string( $0, $1 ) );
            },
            "__extjs_20637d8f642203b38c263a5d0f43b9d88ec67c31": function($0, $1, $2) {
                console.error( 'Panic location:', Module.STDWEB.to_js_string( $0, $1 ) + ':' + $2 );
            },
            "__web_on_grow": function() {
                const buffer = Module.instance.exports.memory.buffer;
                HEAP8 = new Int8Array( buffer );
                HEAP16 = new Int16Array( buffer );
                HEAP32 = new Int32Array( buffer );
                HEAPU8 = new Uint8Array( buffer );
                HEAPU16 = new Uint16Array( buffer );
                HEAPU32 = new Uint32Array( buffer );
                HEAPF32 = new Float32Array( buffer );
                HEAPF64 = new Float64Array( buffer );
            }
        }
    };

    let gl = new WebGL();
    for(var key in gl){
        console.log(key);
        __imports.env[key] = gl[key];
    }

    function __load( instance ) {
        Object.defineProperty( Module, 'instance', { value: instance } );
        Object.defineProperty( Module, 'web_malloc', { value: Module.instance.exports.__web_malloc } );
        Object.defineProperty( Module, 'web_free', { value: Module.instance.exports.__web_free } );
        Object.defineProperty( Module, 'web_table', { value: Module.instance.exports.__web_table } );

        if( typeof module !== 'undefined' && module.exports ) {
            module.exports = Module.exports;
        } else {
            Rust.wasm_webgl_rs.exports = Module.exports;
        }

        __imports.env.__web_on_grow();
        Module.instance.exports.__web_main();
    }

    if( Module.nodejs ) {
        const fs = require( 'fs' );
        const path = require( 'path' );
        const wasm_path = path.join( __dirname, "wasm-webgl-rs.wasm" );
        const buffer = fs.readFileSync( wasm_path );
        const mod = new WebAssembly.Module( buffer );
        const instance = new WebAssembly.Instance( mod, __imports );
        __load( instance );
        return Module.exports;
    } else {
        const __promise = fetch( "wasm-webgl-rs.wasm" )
            .then( response => response.arrayBuffer() )
            .then( bytes => WebAssembly.instantiate( bytes, __imports ) )
            .then( results => {
                __load( results.instance );
                console.log( "Finished loading Rust wasm module 'wasm_webgl_rs'" );
                var callback = t=>{
                    results.instance.exports.update(t);
                    requestAnimationFrame(callback);
                };
                window.requestAnimationFrame(callback);

                return Module.exports;
            })
            .catch( error => {
                console.log( "Error loading Rust wasm module 'wasm_webgl_rs':", error );
                throw error;
            });

        Rust.wasm_webgl_rs = __promise;
        return __promise;
    }
}));
