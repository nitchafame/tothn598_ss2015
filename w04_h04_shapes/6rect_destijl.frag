#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 grid(vec2 st, float x, float y, float w, float h, float a){
    
    float horizonal = step(x ,st.x) - step(x + w, st.x); 
    float vertical = step( y ,st.y) - step(y + h , st.y);
    vec3 pct = vec3(a) * horizonal * vertical;

    return pct; 
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 pct = vec3(0.0);

    //white bg
    pct = mix(pct, vec3(0.9), grid(st, 0.0, 0.0, 1.0, 1.0, 1.0));

    //color block
    pct = mix(pct, vec3(0.3, 0.3, 1.0), grid(st,0.75, 0.0 , 0.8 , 0.1 , 1.0));//blue
    pct = mix(pct, vec3(0.93, 0.78, 0.266), grid(st,0.95, 0.7, 0.2 , 0.3 , 1.0));//yellow
    pct = mix(pct, vec3(0.7, 0.1 ,0.1 ), grid(st,0.0, 0.7, 0.2, 0.3, 1.0));//red

    //line horizon
    pct = mix(pct, vec3(0.0), grid(st, 0.07 , 0.7, 0.02, 1.0, 1.0));
    pct = mix(pct, vec3(0.0), grid(st, 0.2 , 0.0, 0.02, 1.0, 1.0));
    pct = mix(pct, vec3(0.0), grid(st, 0.75, 0.0, 0.02, 1.0 , 1.0));
    pct = mix(pct, vec3(0.0), grid(st, 0.93 , 0.0, 0.02, 1.0, 1.0));
    //line verticle
    pct = mix(pct, vec3(0.0), grid(st, 0.0, 0.7, 1.0 , 0.02, 1.0));
    pct = mix(pct, vec3(0.0), grid(st, 0.0, 0.85, 1.0 , 0.02, 1.0));
    pct = mix(pct, vec3(0.0), grid(st, 0.2, 0.1 , 1.0, 0.02, 1.0)); 

    gl_FragColor = vec4(pct,1.0);
}