#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

float F(float x, float p, float w){
	return (smoothstep(p-w * 0.5, p,x) + smoothstep(p+w * 0.5,p,x))-1.0;

}

void main() {
    
  	vec2 st = gl_FragCoord.xy/u_resolution.xy; // normalize
  	vec3 color = vec3(0.0);
  	float t = 2.0;

//speed , 
	vec2 p = vec2(cos(u_time*0.3),sin(u_time*0.9))* 0.1+0.5 ;
	

	float pct = F(st.x,p.x,0.5);
	pct += F(st.y,p.y,0.1);
	
	color = vec3(step(1.55, pct*1.5));
	gl_FragColor = vec4(color, 1.0);
  
 
}