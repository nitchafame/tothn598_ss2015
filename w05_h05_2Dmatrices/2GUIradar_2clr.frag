#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.1415
#define TWO_PI 6.28318530718
#define SMOOTH(r,R) (1.0-smoothstep(R-1.0,R+1.0, r))
#define motion1 vec2(cos(u_time*0.1),sin(u_time*0.1))
#define motion2 vec2(cos(u_time),sin(u_time*0.1)*abs(sin(u_time*0.1)))
#define sinAT abs(sin(u_time*0.1))

#define blue vec3 (0.2, 0.2, 1.0);
#define yellow vec3 (0.6, 0.6, 0.2);

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

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
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

// Objects

float box(vec2 st, vec2 size){
    st += .5;
    size = vec2(0.5) - size*0.5;
    vec2 uv = smoothstep(size,
                        size+vec2(0.001),
                        st);
    uv *= smoothstep(size,
                    size+vec2(0.001),
                    vec2(1.0)-st);
    return uv.x*uv.y;
}

float cross(vec2 st, float size){
    return  box(st, vec2(size,size/30.)) + 
            box(st, vec2(size/30.,size));
}

float radar (vec2 st, float size){
    return  box(st, vec2(size,size/99.));
}

float circle(vec2 st, float size) {
  float pct = 1.0-length(st/size);
  return pct = step(0.1, pct) - step(0.11, pct);
}

float movingLine(vec2 st, float radius){
    float speed = 30.0 * u_time;
    float r = sqrt(dot(st, st));
    vec2 spin = radius * vec2(cos(speed* PI/180.0),
                          -sin(speed*PI/180.0));
    float l = length(st - spin * 
              clamp(dot(st,spin)/dot(spin,spin), 0.0, 0.5));
       
        return SMOOTH(l,0.01);
}

vec3 objectOne (vec2 st, float a, float c, float x, float size, float y, 
                float r, float g, float b, vec2 motion){
  vec2 pos = vec2(st.x * x, st.y * x) + motion;
  float dist = length(st - pos) + 0.7*sin(u_time);
  a += pow(size / dist, y);
  c = mix(0.0, a, 0.5);
  return (vec3(c / r, c / g, c / b));
}

vec3 bg (vec2 st, vec3 background){
  vec2 toCenter = vec2(0.0)-st;
  float angle = atan(toCenter.y,toCenter.x);
  float radius = length(toCenter)*0.1;
  background = vec3((angle/TWO_PI)+0.5,radius,1.0);
  return background;
}

void main( void ) {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec3 pos = vec3(st,1.0);
  vec3 gui = vec3(0.0);
	st *= 11.0;
	st -= 5.0;
  
  //vec3 mornitor = vec3(circle(st, 9.0));
  st -= vec2(0.5);
  st = rotate2d(u_time) * st;
 
 //monitor
  gui =  vec3(0.0, 0.9 * circle(st, 0.0), circle(st, 0.0)) + 
        (vec3(circle(st, 2.15)) + 
         vec3(circle(st, 3.35)) +
         vec3(circle(st, 4.65)) + 
         vec3(circle(st, 5.95)));

 //things
  vec3 center = vec3(cross(st, 2.0))* yellow;
	vec3 one = objectOne(st, 0.0, 0.0, 20.5, 1.0, 1.5, 0.6, 0.6, 0.2, 29.0* motion2 * 0.8);
  vec3 two = objectOne(st, 0.0, 0.0, 20.5, 1.0, 1.5, 0.4, 0.9, 0.2, 29.0* sinAT * motion1 *.5 -0.8);
  vec3 three = objectOne(st, 0.0, 0.0, 20.5, 1.0, 1.5, 0.6, 0.6, 0.2, 29.0* motion1 * 1.8);
  vec3 base = bg(st, vec3(0.0,0.0,1.0));

  vec3 final =  base+ one  + two + three + center + gui;
  st += vec2(0.5);
	gl_FragColor = vec4(vec3(final), 1.0);

}