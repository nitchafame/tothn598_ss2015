
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

vec3 outline (vec2 st, float x, float y, float w, float h, float s){

    float outer = min((step ( x,st.x) - step( y,st.x)),
                    (step ( w,st.y) - step( h,st.y)));

    float inner = min((step ( x-s,st.x) - step( y+s,st.x)),
                    (step ( w-s,st.y) - step( h+s,st.y)));
    return vec3 (smoothstep (inner, outer, 0.0));
}  

float ellipse(vec2 st, float radius) {
    st -= .5;
    float a = smoothstep(radius*.5,radius*.9, dot(st,st)*2.)+
    1.0-step(radius*.4,dot(st,st)*2.);
    return 1.0-a;
}

float dot(vec2 st, float radius) {
    st -= .5;
    return 1.0-step(radius*.5,dot(st,st)*8.)-
    step(radius*.6,dot(st,st)*2.);
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

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    
    // color = v_normal;
    
    float d = distance(st,vec2(.5));
    d = sin(d*3.14*5.*cos(u_time)*.2);

    st *= 2.;
    st = truchet(st*6.);
    st = brick(st*6.);
    vec2 st_f = fract(st);

    //
    vec3 pct = vec3(dot(st_f,d*.5));
  //  pct += outline(st_f, 0.01, 0.99, 0.01, 0.99, 0.5);
    //pct += vec3(ellipse(st_f,d*.5));

    color += pct;

    gl_FragColor = vec4(color,1.0);
}