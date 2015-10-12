#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st *= 1.5;
    st -= 1.2;
    st.x += 0.2;
    float m = abs(sin(u_time*0.5));
    float n = abs(cos(u_time*0.9));
    st = floor(st.x-m) * st ;

    float pct = 0.0;
    vec3 color = vec3(0.0);
 
	pct = min((smoothstep (0.0, 1.5,st.x) - smoothstep (0.4, 0.9,st.x)),
	(step (0.2,st.y) - step(0.9,st.y)));
   
    color = mix(vec3(0.0), vec3(0.1*n,0.3*m,0.2*m), vec3(pct)*u_time*20.0); 


    gl_FragColor = vec4(color,1.0);
}
