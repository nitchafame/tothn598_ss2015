#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;


float formOne(float x){
	return pow(cos(PI*x/7.0),9.9);
}

float formTwo(float x){
	return pow(min(cos(PI* x/2.0),1.0 - abs(x)), 3.0);
}

void main() {
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy; // normalize
    vec2 mousePos = u_mouse/u_resolution;

	float t = (sin(u_time)+1.0)*0.5;
  
	float pct = formTwo(st.y);

	vec3 color = vec3(pct);

  gl_FragColor = vec4(color.x * t, color.y * t, color.z ,1.0);
 
}