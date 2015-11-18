#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(in float x){
    return fract(sin(x)*43758.5453);
}

float random(in vec2 st){
    return fract(sin(dot(st.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float noise(float x){
    float i = floor(x);  // integer
    float f = fract(x);  // fraction
    return mix(random(i), random(i + 1.0), smoothstep(0.,1.,f));

}

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
float circle(vec2 st, float radius) {
    st -= .5;
    return 1.0-step(radius*.5,dot(st,st)*2.)* smoothstep(0.1 ,0.9,dot(st,st)*2.);
}

float fractCircles(vec2 st, float size) {
  float pct = fract(1.0-length(st/size));
  return  step(0.25, pct) - step(0.3, pct);
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
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);
    vec3 pos = vec3(st,1.0);
    float d = 1.0-distance(st,vec2(0.4));
   
    st *= 3.0;
   
    rotate(noise(0.8)*u_time);
    pos = matrix * pos;
    
    st = brick(st* 2.0);
    vec2 st_f = fract(st);
    float pct = fractCircles(st_f* pos.xy, noise(d)*0.5);


    color += pct;
    
    gl_FragColor = vec4(color,1.0);
}
