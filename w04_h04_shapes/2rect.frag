#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;

	float pct = 0.0;
	// pct = (smoothstep (0.2, 0.4,st.x) - smoothstep (0.7, 0.9,st.x))*
	// (smoothstep (0.5, 0.7,st.y) - smoothstep (0.7, 0.9,st.y));

    pct = (smoothstep (0.15, 0.2,st.x) - smoothstep (0.45, 0.5,st.x))*
    (smoothstep (0.01, 0.8,st.y) - smoothstep (0.9, 1.0,st.y));


	gl_FragColor = vec4(vec3(pct),1.0);
}