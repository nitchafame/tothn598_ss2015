
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
   // st += 0.05* abs(sin(u_time)*2.)*5.;
   st += 0.5;
    st -= 0.6;
    return 1.0-step(radius * 0.5,dot(st,st)*1.5)
    + 1.0-smoothstep(0.1 ,0.6,1.0-dot(st,st)*1.7);
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

    vec2 st_f = fract(st);

    //color.rg = st_f;
    float pct = circle(st_f,1.2);
    pct *= innerGradient(st_f,1.2);
    color += pct;
    
    
	gl_FragColor = vec4(color,1.0);
}
