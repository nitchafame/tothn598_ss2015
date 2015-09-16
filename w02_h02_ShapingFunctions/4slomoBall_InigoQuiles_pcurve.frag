#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

	
float pcurve( float x, float a, float b )
{
    float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));
    return k * pow( x, a ) * pow( 1.0-x, b );
}

void main() {
    
  vec2 st = gl_FragCoord.xy/u_resolution.xy; // normalize
  float t = (sin(u_time)+3.0)*0.2;
  vec2 motion = vec2(cos(u_time),sin(u_time))*0.5+0.9;
	
	float pct = pcurve(st.y, motion.y, 0.4+ 0.5); 
	pct += pcurve(st.x, motion.x, 0.4 + .7);

	vec3 color = vec3(step(1.0, pct*0.6));

  gl_FragColor = vec4(color.x , color.y , color.z* t ,1.0);
 
}