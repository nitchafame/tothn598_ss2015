
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}


float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.03),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.03),
                    vec2(1.0)-_st);
    return uv.x*uv.y * uv.x*uv.y - 0.08;
    //return step(0.5, uv.x) - step(0.3, uv.y);
    //return uv.x*uv.y;
}


float cross(in vec2 _st, float _size){
    return  box(_st, vec2(_size,_size/4.)) + 
            box(_st, vec2(_size/4.,_size)) + 
            box(_st, vec2(_size/1.5,_size/1.5));
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

vec2 symmetry(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.x,3.0) > 1.0) {
       float patternDistance = 0.1;
       st.x = -st.x ;
    }

    if (mod(st_i.y,3.0) > 1.0) {
       float patternDistance = 0.1;
       st.y = -st.y ;
    }
    return st;
}
void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    
    //float d = distance(st,vec2(0.5));
    //d = d* abs(sin(u_time*0.4))*3.14*2.0;

    st -= 0.5;
    st *= 1.5;

    

    st = rotate2d( 2.*(u_time)) * st;
    st += vec2(0.5);
    st += truchet(st*2.0);


    color += vec3(cross(st,0.8));

    gl_FragColor = vec4(color,3.0);
}