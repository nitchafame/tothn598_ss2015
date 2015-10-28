/// Nitcha Tothong - nitchafa.me

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;


float inner(vec2 st, float radius){
    st -= 0.5;
    st.x -= 0.5;
    return 1.0-step(radius * 0.8,dot(st,st)*2.)
    * 1.0-smoothstep(0.1 ,0.75,1.0-dot(st,st)*2.);
}


void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    float d = distance(st,vec2(0.5));
    d =  1.0-length(max(abs(st-0.5)-.15*(cos(u_time)*.5),0.1));
    st *= 1.0;
    
    vec2 st_i = floor(st);

    vec2 st_f = fract(st);
    float pct = inner(st,1.0);

   // float pct = circle(st_f,1.1);
    color += pct;
        
	gl_FragColor = vec4(color,1.0);
}
