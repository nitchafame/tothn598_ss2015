#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float F(float x){
	return pow(cos(PI*x/7.0),9.9);
}

	
float doubleCubicSeat (float x, float a, float b){
  
  float epsilon = 0.00001;
  float min_param_a = 0.0 + epsilon;
  float max_param_a = 1.0 - epsilon;
  float min_param_b = 0.0;
  float max_param_b = 1.0;
  a = min(max_param_a, max(min_param_a, a));  
  b = min(max_param_b, max(min_param_b, b)); 
  
  float y = 0;
  if (x <= a){
    y = b - b*pow(1-x/a, 3.0);
  } else {
    y = b + (1-b)*pow((x-a)/(1-a), 3.0);
  }
  return y;
}


void main() {
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy; // normalize

	float pct = F(st);

	float pct = doubleCubicSeat(st.y,0.1,0.1); 
	pct += doubleCubicSeat(st.x,0.1,0.1);

	vec3 color = vec3(pct);
  	gl_FragColor = vec4(color, 1.0);
 
}