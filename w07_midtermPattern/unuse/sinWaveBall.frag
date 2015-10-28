// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265

uniform vec2 u_resolution;
uniform float u_time;

float motion (float x, float b){
    return pow(cos(PI * x / 5.0), b);
}

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}
float circle(vec2 st, float radius) {
    st -= .5;
    return 1.0-step(radius*.5,dot(st,st)*290.)* smoothstep(0.1 ,0.9,dot(st,st)*290.);
}

float cross(in vec2 _st, float _size){
    return  box(_st, vec2(_size,_size/4.)) + 
            box(_st, vec2(_size/4.,_size));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    
    float m = abs(sin(u_time*motion(.2,.2)));
  
    vec2 translate = vec2(cos(u_time),cos(u_time)*m);
    //st.x = translate.x*motion( -30.0 * st.y, 2.0)* 0.02+ 0.5;
    st += translate*0.35;
    color += vec3(circle(st,0.15));
    color += vec3(circle(st,0.25));

    gl_FragColor = vec4(color,1.0);
}