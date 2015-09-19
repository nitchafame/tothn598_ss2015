#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// float F(float x){
// 	return pow(cos(PI*x/7.0),9.9);
// }
	
float doubleCubicSeat (float x, float a, float b){
  float y = 0.0;
  if (x <= a){
    y = b - b*pow(1.0-x/a, 3.0);
  } else {
    y = b + (1.0-b)*pow((x-a)/(1.0-a), 3.0);
  }
  return y;
}


void main() {
    
  vec2 st = gl_FragCoord.xy/u_resolution;
  st *= (4.0+(st.x * u_time));

  float y = pow(st.y*abs(cos(u_time)), 5.0);
  vec3 color = vec3(y);
  float pct = doubleCubicSeat(st.y*abs(sin(u_time)),0.0,st.x*u_time);
  color = (1.0-pct) * color + pct * vec3(0.0, 0.4, 1.0);
   
    gl_FragColor = vec4(color,1.0);
 
}