#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265

uniform float u_time;
uniform vec2 u_resolution;

float F(float x, float p, float w){
	return (smoothstep(p-w * 0.5, p,x) + smoothstep(p+w * 0.5,p,x))-1.0;

}

float motion (float con, float x, float power){

    return pow(cos(PI * x / 5.0), power);
}

void main() {
    
  	vec2 st = gl_FragCoord.xy/u_resolution.xy; // normalize
  	vec3 color = vec3(0.0);
  	float t = 2.0;

//speed , 
	vec2 p = vec2(cos(u_time*7.0),sin(u_time*0.1))* 0.1+0.5 ;
	
	p.y = motion(0.01, -40.0 * p.x, 5.0)* 0.01+ 0.5;


	float pct = F(st.x,p.x,0.3);
	pct += F(st.y,p.y,0.05);
	
	color = vec3(step(1.5, pct));
	gl_FragColor = vec4(color.x*t, color.y, color.z,1.0);
  
 
}