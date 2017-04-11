
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorA = vec3(0.918,0.725,0.886); //pink
vec3 colorB = vec3(0.651,0.498,0.992); // purple
vec3 colorC = vec3(0.937,0.976,0.910); // egg

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(st,1.0);
	gl_FragColor = vec4(color,1.0);
}
