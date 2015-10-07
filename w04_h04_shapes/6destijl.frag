#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 outline (vec2 st, float x, float y, float w, float h){

    float outer = (step ( x,st.x) - step( y,st.x))*
 			    	(step ( w,st.y) - step( h,st.y));

    float inner = (step ( x-0.01,st.x) - step( y+0.01,st.x))*
 			    	(step ( w-0.01,st.y) - step( h+0.01,st.y));
    return vec3 (smoothstep (inner, outer, 0.0));
   
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
    //vec3 pct = vec3(0.0);

	vec3 pct = outline(st, 0.1, 0.8, 0.1, 0.8);
	vec3 pct = mix(pct, pct *0.2, 0.2);
	// pct = mix(pct, vec3(0.0), grid(st, 0.2, 0.2 , 1.0, 0.02)); 
 //    pct = mix(pct, vec3(0.0), grid(st, 0.2 , 0.0, 0.02, 1.0));

 
	gl_FragColor = vec4(vec3(pct),1.0);
}