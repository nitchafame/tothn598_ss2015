#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    // // bottom-left
    // vec2 bl = smoothstep(vec2(0.1,0.3,st);
    // float pct = bl.x * bl.y;

    // // top-right 
    // vec2 tr = smoothstep(vec2(0.1,0.3,1.0-st);
    // pct *= tr.x * tr.y;
    
    // color = vec3(pct);


	float pct = 0.0;
	pct = (smoothstep (0.1, 0.3,st.x) - smoothstep (0.7, 0.9,st.x))*
	(smoothstep (0.1, 0.3,st.y) - smoothstep (0.7, 0.9,st.y));

   //color = vec3(bl.x * bl.y * tr.x * tr.y);

	gl_FragColor = vec4(vec3(pct),1.0);
}