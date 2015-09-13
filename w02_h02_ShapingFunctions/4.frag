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

	
// float impulse( float k, float x )
// {
//     const float h = k*x;
//     return h * expf(1.0-h );
// }

void main() {
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy; // normalize
    vec2 mousePos = u_mouse/u_resolution;

	// float y = smoothstep (0.1,0.9,st.x);

	// vec3 color = vec3(y);

	// float pct = F(st,y);
	//color = (1.0-pct)*color+pct*vec3(1.0,0.0,1.0); 
	float t = (sin(u_time)+1.0)*0.5;
  	
  	vec2 motion = vec2(cos(u_time),sin(u_time))*0.5+0.9;
	
	float pct = pcurve(st.y, motion.y, 0.4+ 0.5); 
	pct += pcurve(st.x, motion.x, 0.4 + .7);


	vec3 color = vec3(step(1.0, pct*0.6));

  	gl_FragColor = vec4(color, 1.0);
 
}