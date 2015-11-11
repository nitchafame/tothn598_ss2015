
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circle(vec2 st, float radius) {
    st -= 0.5;
    st.x -= 0.6;
    float outer = 1.0-step(radius*0.5,dot(st,st)*1.5);
    float inner = 1.0-smoothstep(0.1 ,0.6,1.0 -dot(st,st)*1.7);
    return float (step (inner*outer, 0.0));
}
float innerGradient(vec2 st, float radius){
  st += 0.05* (sin(u_time)*4.);
  st += 0.5;
  st -= 0.55;
    return 1.0-step(radius * 0.5,dot(st,st))
    + 1.0-smoothstep(0.1 ,0.6,1.0-dot(st,st));
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
vec2 brick(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.y,2.) == 1.) {
        st.x += .1;
    }
    return st;
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.);
   // float inner = 1.0-step(1.1*0.8,dot(st,st)*2.)*1.0-smoothstep(0.1 ,0.6,1.0-dot(st,st)*2.);
    st *= 6.;
    
    vec2 st_i = floor(st);

     if (mod(st_i.y,2.0) == 1.0) {
       st.x = -st.x;
       st.x += 0.75;

    }


    st = symmetry(st* 3.0);
    // st = brick(st* 2.0);
    vec2 st_f = fract(st);

    //color.rg = st_f;
     float pct = innerGradient(st_f,1.2);
    //pct *= circle(st_f,1.2);
   
    color += pct;
    
    
	gl_FragColor = vec4(color,1.0);
}
