#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float random (vec2 st) { 
    return fract(sin(dot(st.xy,
                         vec2(100.0,10000000.)))* 
       u_time);
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.y += -0.6;

    float rnd = random(st*5.);

    gl_FragColor = vec4(vec3(rnd),100000.0);
}