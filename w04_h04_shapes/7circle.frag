#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

// original written by
// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
	float pct = 0.0;
	st -= 0.5;
	//pct = distance(vec2(0.5),st);
	//pct = step(0.5, 1.0 -length(st)*2.0);
	pct = sqrt(st.x*st.x+st.y*st.y)*2.0;
	//pct = dot(st,st);
	//pct = fract(pct* 0.2);
    

    gl_FragColor = vec4(vec3(pct),1.0);
}