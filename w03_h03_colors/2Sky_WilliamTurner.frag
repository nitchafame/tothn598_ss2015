#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) - 
          smoothstep( pct, pct+0.01, st.y);
}

float F(float x, float p, float w){
    return (smoothstep(p-w * 0.5, p,x) + smoothstep(p+w * 0.5,p,x))-1.0;

}

vec3 colorA = vec3(0.117,0.52,0.92); //turquise
vec3 colorB = vec3(0.945,0.89,0.235); //Yellow
vec3 colorC = vec3(0.952,0.533,0.145); //orange
vec3 colorD = vec3(0.01,0.0,01.20); //orange

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    // shrink size
    st *= 12.0;
    st.x -= 4.0;
   
    vec3 color = vec3(0.0);
    vec3 sunset = vec3(0.0);
    vec3 pct = vec3(st.y);
    vec2 p = vec2(cos(7.0),sin(u_time*0.1))* 0.05+3.5 ;
    float t = 2.0;
    // Shape colors
    pct.r = F(p.y,st.x,4.5);
    pct.r += F(p.y,st.y,7.0);
    pct.r += F(p.x,st.y-3.2,7.0);
    
    pct.g += pow(st.y,1.4);

    pct.b = pow(st.x,0.1)*0.005;
    pct.b += F(p.x,st.y-3.0,9.5);
    //Mix it
    color = mix(colorA, colorC, pct);

    // Darker
    color *= 0.8* sqrt (0.4);
    //Mix it
    sunset = mix(color, colorB, pct.b);
    gl_FragColor = vec4(sunset,1.0);
}