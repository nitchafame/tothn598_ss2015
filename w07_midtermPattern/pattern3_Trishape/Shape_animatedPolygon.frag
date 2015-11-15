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
  float d = cos(floor(.5*(abs(u_time)*3.)+a/r)*r-a)*length(st);
  return step(0.25, d) - step(0.27, d);

}

void main(){
    vec2 st = gl_FragCoord.xy/ u_resolution.xy;
    float pct = 0.0;
    vec3 color = vec3(0.0);

    pct = triShape(st, 8);

    color = vec3(pct);
    gl_FragColor = vec4(color,1.0);

}