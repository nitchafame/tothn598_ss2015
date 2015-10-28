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

float circle(vec2 st, float radius) {
    st -= .5;
    float a = smoothstep(radius*.5,radius*.9, dot(st,st)*2.)+
    1.0-step(radius*.4,dot(st,st)*2.);
    return 1.0-a;
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
 	float m = abs(sin(u_time*0.5));
 	
     
	//vec3 pct = outline(st, 0.01, 0.99, 0.01, 0.99, 0.009);


	vec3 pct = vec3(circle(st,.5));
	//vec3 pct += outline(st, 0.01, 0.99, 0.01, 0.99, 0.009);

 // float pct = 0.0;
 // float A = min((step (0.2,st.x) - step(0.8,st.x)),
 //  	(step (0.2,st.y) - step(0.8,st.y)));
 // 	float B = min((step (0.19,st.x) - step(0.81,st.x)),
 // 	(step (0.19,st.y) - step(0.81,st.y)));

 // pct = B-A;

	gl_FragColor = vec4(vec3(pct),1.0);
}