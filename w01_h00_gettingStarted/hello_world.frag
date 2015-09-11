#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
    vec2 pos = gl_FragCoord.xy/u_resolution;
    
    //vec2 pos = gl_FragCoord.xy/vec2(500,500);
	//gl_FragColor = vec4(0.0,0.0,pos.y,1.0);
    // gl_FragColor.rg = pos
    
    gl_FragColor = vec4(1.0);
    gl_FragColor.rg = pos.xy;
    gl_FragColor.b = abs(sin(u_time));
 
}