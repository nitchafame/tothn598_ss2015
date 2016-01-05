#version 120

/// Nitcha Tothong - nitchafa.me
uniform vec2 u_resolution;
uniform float u_time;

varying vec3 v_normal;

float inner(vec2 st, float radius){
    st -= 0.5;
    st.x -= 0.5;
    return 1.0-step(radius * 0.8,dot(st,st)*2.)
    * 1.0-smoothstep(0.1 ,0.7,1.0-dot(st,st)*2.);
}

float outer(vec2 st, float radius){
    st -= 0.5;
    st.x -= 0.5;
    float blkCircle = 1.0- step(0.8,dot(st,st)*2.);
    return 1.0-smoothstep(0.2 ,1.15,dot(st,st)*1.0) / 
    1.0-step(1.1*0.5,dot(st,st)*0.2) - blkCircle;
    st *= 10.;
}

void main() {
	vec2 st = gl_TexCoord[0].st; // gl_FragCoord.xy/u_resolution;
    vec3 color =  gl_Color.rgb;

    float d = distance(st,vec2(0.9));
    d =  1.0-length(max(abs(st-0.5)-.15*(cos(u_time)*.5),0.1));
  
    st *= 8.0;
    
    vec2 st_i = floor(st);
    float motion = abs(sin(u_time)*0.5);

    if (mod(st_i.y,2.0) == 1.0) {
        float patternDistance = 0.65;
        st.x = -st.x + patternDistance * motion;
    }
    vec2 st_f = fract(st);
    float pct = inner(st_f,d*1.1);
    color += pct;
        
	gl_FragColor = vec4(color,1.0);
}
