#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 outline (vec2 st, float x, float y, float w, float h, float s){

    float outer = min((step ( x,st.x) - step( y,st.x)),
 			    	(step ( w,st.y) - step( h,st.y)));

    float inner = min((step ( x-s,st.x) - step( y+s,st.x)),
 			    	(step ( w-s,st.y) - step( h+s,st.y)));
    return vec3 (smoothstep (inner, outer, 0.0));
   
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
 	float m = abs(sin(u_time*0.5));
 	
     // x, y, w, h, stroke
	vec3 pct = outline(st, 0.3*m, 0.9, 0.3*m, 0.9, 0.02*m*1.0+0.005);

 // float pct = 0.0;
 // float A = min((step (0.2,st.x) - step(0.8,st.x)),
 //  	(step (0.2,st.y) - step(0.8,st.y)));
 // 	float B = min((step (0.19,st.x) - step(0.81,st.x)),
 // 	(step (0.19,st.y) - step(0.81,st.y)));

 // pct = B-A;

	gl_FragColor = vec4(vec3(pct),1.0);
}