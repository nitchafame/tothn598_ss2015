#version 120

/// Nitcha Tothong - nitchafa.me

uniform vec2 u_resolution;
uniform float u_time;

varying vec3 v_normal;
float circle(vec2 st, float radius) {
    st -= .5;
    return 1.0-step(radius*.5,dot(st,st)*2.)* smoothstep(0.1 ,0.9,dot(st,st)*2.);
}

float fractCircles(vec2 st, float size) {
  float pct = fract(1.0-length(st/size));
  return  step(0.25, pct) - step(0.3, pct);
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
void main() {
    vec2 st = gl_TexCoord[0].st;//FragCoord.xy/u_resolution;
    vec3 color = gl_Color.rgb;

    float d = 1.0-distance(st,vec2(0.5));
    d = d* abs(sin(u_time*0.4))*3.14*2.0;
   
    // d = length( abs(st)-.7 );
    st *= 8.0;

    vec2 st_i = floor(st);
    
    if (mod(st_i.y,2.) == 1.) {
        st.x += 0.5;
    }
     

    vec2 st_f = fract(st);
    float pct = fractCircles(st_f, d*0.5);

    //original shape
    //float pct = fractCircles(st, 0.5);

    //float pct = inner(st_f,d*.5);
    color += pct;
    gl_FragColor = vec4(color,1.0);
}
