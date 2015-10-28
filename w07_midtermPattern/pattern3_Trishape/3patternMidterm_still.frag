#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

mat3 matrix = mat3(vec3(1.,0.,0.),
                   vec3(0.,1.,0.),
                   vec3(0.,0.,1.));

mat3 rotationMatrix(float a) {
    return mat3(vec3(cos(a),-sin(a),0.0),
                vec3(sin(a),cos(a),0.0),
                vec3(0.0,0.0,1.0));
}

void rotate(float a) {
    matrix = rotationMatrix(a) * matrix;
}
mat3 translationMatrix(vec2 f) {
    return mat3(vec3(1.0,0.0,0.0),
                vec3(0.0,1.0,0.0),
                vec3(f.x,f.y,1.0));
}

void translate(vec2 f) {
    matrix = translationMatrix(f) * matrix;
}

float circle(vec2 st, float radius) {
    st -= .5;
    return 1.0-step(radius*.5,dot(st,st)*2.)* smoothstep(0.1 ,0.9,dot(st,st)*2.);
}

float triShape(vec2 st, int sides){
  st = st *2.-1.;
  int N = sides;
  float a = atan(st.x,st.y)+PI;
  float r = TWO_PI/float(N);
  float d = cos(floor(.5*(abs(u_time)*3.)+a/r)*r-a)*length(st);
  return step(0.25, d) - step(0.3, d);

}
vec2 truchet(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.y,2.) == 1.) {
        st.x = 1.-st.x;
    }
    if (mod(st_i.x,2.) == 1.) {
        st.y = 1.-st.y;
    }
    return st;
}

float stripes(vec2 st) {
    return step(st.y,st.x);
}
 

vec2 tile(vec2 st) {
    return floor(st);
}
vec2 brick(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.y,2.) == 1.) {
        st.x += .5;
    }
    return st;
}

void main() {
   vec2 st = gl_FragCoord.xy/u_resolution.xy;
   st *= u_resolution.x/u_resolution.y;
   vec3 color = vec3(0.0);
   vec3 pos = vec3(st,1.0);
   // float d = 0.0;
   // d = triShape(st, 8)+d*2.3;
    
    st *= 2.0;
   //translate(vec2(-0.3*sin(u_time), 0.05-abs(cos(u_time))));
   // rotate(sin(u_time));
    pos = matrix * pos;
    
    st = truchet(st* 3.0);
    st = brick (st* 4.0);
    vec2 st_f = fract(st);
    float pct = triShape(st_f*pos.xy,9);

    color += pct;
   // color += pct*vec3(0.9,0.0,0.0);
    gl_FragColor = vec4(color,1.0);
}
