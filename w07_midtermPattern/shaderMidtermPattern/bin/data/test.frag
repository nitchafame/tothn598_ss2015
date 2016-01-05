#version 120

uniform vec2 u_resolution;
uniform float u_time;

varying vec3 v_normal;

#define blue vec3 (0.2, 0.2, 1.0);
#define yellow vec3 (0.6, 0.6, 0.2);
#define motion1 vec2(cos(u_time*0.1),sin(u_time*0.1))
#define motion2 vec2(cos(u_time),sin(u_time*0.1)*abs(sin(u_time*0.1)))
#define sinAT abs(sin(u_time*0.1))

vec3 colorA = vec3(0.85,0.478,0.329); //salmon
vec3 colorB = vec3(0.545,0.415,0.38); //dull pink
vec3 colorC = vec3(0.203,0.125,0.121); //dark pink

mat3 matrix = mat3(vec3(1.,0.,0.),
                   vec3(0.,1.,0.),
                   vec3(0.,0.,1.));

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
    return  box(st, vec2(size,size/20.)) + 
            box(st, vec2(size/20.,size));
}

float circle(vec2 st, float size) {
  float pct = 4.0-length(st/size);
  return pct = step(0.5, pct) - step(0.11, pct);
}

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
  vec2 st = gl_TexCoord[0].st; //gl_FragCoord.xy/u_resolution.xy;
  //st.x *= u_resolution.x/u_resolution.y;
  vec3 color = gl_Color.rgb;
  vec3 draw = vec3(0.0);
  vec3 final = gl_Color.rgb;
  vec3 pos = vec3(st,1.0);
  vec3 pct = vec3(st.x);
  st = st *5.0-2.5;

  float d = 0.3;

  translate(vec2(-0.5));
  scale(vec2(cos(u_time)*sinAT)-1.3);
  rotate(sinAT* u_time );

  pos = matrix * pos;

  // Make the distance field
  //d = length( min(abs(st)-.3,0.) )-u_time*0.1 ;
   d = length( max(abs(st)-.05,0.09) )-u_time*0.1 ;
   color = mix(colorA, colorB, pct);
   final += fract(d*2.0*color) ;
   draw += circle(pos.xy,0.4) + cross(pos.xy,0.4)*color;
   //final = fract(draw)*u_time;
  gl_FragColor = vec4(vec3(fract(final)),1.0);
}