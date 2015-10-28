#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;


float triShape(vec2 st, int sides){
  st = st *2.-1.;
  int N = sides;
  float a = atan(st.x,st.y)+PI;
  float r = TWO_PI/float(N);
  float d = cos(floor(.5*(abs(u_time)*2.)+a/r)*r-a)*length(st);
  return step(0.29, d) - step(0.3, d);

}

// float triShape(vec2 st, int sides){
//   st = st *2.-1.;
//   int N = sides;
//   float a = atan(st.x,st.y)+PI;
//   float r = TWO_PI/float(N);
//   float d = cos(floor(.5*(abs(u_time)*2.)+a/r)*r-a)*length(st);
//   return step(0.29, d) - step(0.3, d);

// }


void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0);
  float d = 0.0;
  d = triShape(st, 8)+d*2.3;


  color = vec3(1.0-smoothstep(.4,.41,1.0-d));
  
  // color = vec3(d);

  gl_FragColor = vec4(color,1.0);
}