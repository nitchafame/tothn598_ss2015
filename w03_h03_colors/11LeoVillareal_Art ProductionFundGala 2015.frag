#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorA = vec3(1.0,1.0,1.0);//white
vec3 colorB = vec3(0.7,0.2,0.1); //light pur
vec3 colorC = vec3(0.6117,0.2431,0.5254); //pur
vec3 colorD = vec3(0.2098,0.4098,0.2862); //blue
//te
float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) - 
          smoothstep( pct, pct+0.01, st.y);
}

// cosine based palette, 4 vec3 params by Iñigo Quílez
// http://www.iquilezles.org/www/articles/palettes/palettes.htm
vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}

float F(float x, float p, float w){
    return (smoothstep(p-w * 0.5, p,x) + smoothstep(p+w * 0.5,p,x))-1.0;

}

float exponentialInOut(float t) {
  return t == 0.0 || t == 1.0
    ? t
    : t < 0.5
      ? +0.5 * pow(2.0, (20.0 * t) - 10.0)
      : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    // shrink size and position
    st *= 6.0;
    st.x -= 3.0;
    st.y += 2.5;

    // Animate
    float t = u_time*0.04;
    vec3 pct = vec3(st.x) * t;
    
    vec3 color = palette(st.y,colorB, colorD, colorA, colorC);
    vec2 p = vec2(cos(u_time*0.1),sin(u_time*0.1))* 1.5+5.0 ;
    
    pct.r = 2.0;
    pct.r = F(p.x,st.y,4.0)*t;
    pct.r += F(p.y,st.y,5.0);
    
    pct.g = F(p.y,st.x,4.0);
    pct.b = mix(0.5*2.,1.5,st.x);
   // pct.b += F(st.y,st.x-8.0,7.5);

    color *= 0.7* mix(colorD, colorA, pct);

    gl_FragColor = vec4(color,1.0);
}