#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

float random(in float x){
    return fract(sin(x)*43758.5453);
}

float random(in vec2 st){
    return fract(sin(dot(st.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float randomChar(in vec2 outer,in vec2 inner){
    float grid = 6.0;
    vec2 margin = vec2(0.3,0.1);
    vec2 borders = step(margin,inner)*step(margin,1.-inner);
    return step(0.4,random(outer + floor(inner * grid))) * borders.x * borders.y;
}
float triShape(vec2 st, int sides){
  st = st *2.-1.;
  int N = sides;
  float a = atan(st.x,st.y)+PI;
  float r = TWO_PI/float(N);
  float d = cos(floor(.5*(abs(u_time)*2.)+a/r)*r-a)*length(st);
  return step(0.29, d) - step(0.3, d);

}
// vec3 matrix(in vec2 st){
//     float rows = 50.0;
//     vec2 ipos = floor(st*rows)+vec2(1.0,0.0);

//     ipos += vec2(0.0,floor(u_time*20.*random(ipos.x)));

//     vec2 fpos = fract(st*rows);
//     vec2 center = (0.5-fpos);

//     float pct = random(ipos);
//     float glow = (1.0-dot(center,center)*2.0)*2.0;

//     return vec3(randomChar(ipos,fpos) * pct * glow);
// }

void main( ){

    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.y *= u_resolution.y/u_resolution.x;
    st *= 0.8;
    vec3 color = vec3(0.0);

    //vec2 offset = vec2(0.1,0.0);

    color = vec3(random(vec2(triShape(st,8))));

    color.r *= random(floor(st));
    //color.g *= random(floor(st));
    color.b *= random(floor(st));

    gl_FragColor = vec4(color,0.5);
}