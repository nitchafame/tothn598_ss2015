#ifdef GL_ES
precision mediump float;
#endif

#define blue vec3 (0.2, 0.2, 1.0);
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

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
    return  box(st, vec2(size,size/4.)) + 
            box(st, vec2(size/4.,size));
}

float circle(vec2 st, float size) {
  float pct = 0.5*u_time-length(st/size);
  return pct = fract(step(0.25, pct)) - step(0.3, pct);
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
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= 1.5;
    st.x -= 0.4;
    //st = st *2.-1.;
    float d = 0.0;

    d = length( abs(st)-u_time );
    vec3 color = vec3(0.0);
    vec3 pos = vec3(st,1.0);
    
    translate(vec2(-0.3));
    translate(vec2(-0.3*sin(u_time), 0.05-abs(cos(u_time))));
    rotate(sin(u_time));

    pos = matrix * pos;

    color = vec3(st.x, st.y, 1.0);
    color /= circle(pos.xy,0.1) *blue +
             circle(pos.xy-.3,0.2);
    
    gl_FragColor = vec4(fract(d*color) ,1.0);
}