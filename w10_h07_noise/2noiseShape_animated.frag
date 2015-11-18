#ifdef GL_ES
precision mediump float;
#endif
       
#define PI 3.14159265359
#define TWO_PI 6.28318530718

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

float triShape(vec2 st, int sides){
  st = st *2.-1.;
  int N = sides;
  float a = atan(st.x,st.y)+PI;
  float r = TWO_PI/float(N);
  float d = cos(floor(0.5*1.0+a/r)*r-a)*length(st);
  return step(0.25, d) - step(0.27, d);

}
mat3 matrix = mat3(vec3(1.,0.,0.),
                   vec3(0.,1.,0.),
                   vec3(0.,0.,1.));

mat3 scaleMatrix(vec2 f) {
    return mat3(vec3(f.x,0.0,0.0),
                vec3(0.0,f.y,0.0),
                vec3(0.0,0.0,1.0));
}

void scale(in vec2 f) {
    matrix = scaleMatrix(f) * matrix;
}

mat3 translationMatrix(vec2 f) {
    return mat3(vec3(1.0,0.0,0.0),
                vec3(0.0,1.0,0.0),
                vec3(f.x,f.y,1.0));
}

void translate(vec2 f) {
    matrix = translationMatrix(f) * matrix;
}

mat3 rotationMatrix(float a) {
    return mat3(vec3(cos(a),-sin(a),0.0),
                vec3(sin(a),cos(a),0.0),
                vec3(0.0,0.0,1.0));
}

void rotate(float a) {
    matrix = rotationMatrix(a) * matrix;
}

void main(){
    vec2 st = gl_FragCoord.xy/ u_resolution.xy;
    float pct = 0.0;
    vec3 color = vec3(0.0);
    vec3 pos = vec3(st,1.0);

    st *= 4.5;

    rotate(noise(u_time));
    scale(st*noise(u_time));
    translate(st*noise(u_mouse.x/u_resolution.x));

    pos = matrix * pos;
    pct = triShape(st * pos.x-.5,3);
    pct += triShape(st * pos.xy-0.1,5);
    pct += triShape(st * pos.xy-0.9,5);

    color = vec3(pct);
    gl_FragColor = vec4(color,1.0);

}