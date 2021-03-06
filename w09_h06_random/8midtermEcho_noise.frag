// Author _ Nitcha Tothong (nitchafa.me)

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float random(in float x){
    return fract(sin(x)*43758.5453);
}

float random(in vec2 st){
    return fract(sin(dot(st.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float move(float x){
  float y = 0.0;
  y = pow(sin(x)*1.5,cos(x))*5.0;
  return y;
}

float innerGradient(vec2 st, float radius){
   // st += 0.05* abs(sin(u_time)*2.)*5.;
   st += 0.05 * move(u_time);
    st -= 0.15;
    return 1.0-step(radius * 0.8,dot(st,st)*2.)
    * 1.0-smoothstep(0.1 ,0.9,1.0-dot(st,st)*2.);
}

vec2 brick(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.y,2.) == 1.) {
        st.x += .1;
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

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    float d = distance(st,vec2(0.5));
    d =  1.0-length(max(abs(st-0.5)- 0.9*(cos(random(u_time))*.5),0.1));
    d =  random(d)*d;
    
    st *= 5.0;
    st += 0.6;
 
    st = symmetry(st* 1.0);
    st = brick(st* 2.0);
    vec2 st_f = fract(st);
    float rnd = random(st_f)*d;

    float pct = innerGradient(st_f,d*1.1);
    color += random(pct);
    color += pct*vec3(0.9,0.8,0.5*rnd);
    color += pct*vec3(0.9,0.0,0.0);
   // color += random(color);

    gl_FragColor = vec4(color,1.0);
}
