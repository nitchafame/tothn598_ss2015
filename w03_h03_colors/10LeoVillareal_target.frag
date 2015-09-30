#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorA = vec3(1.0,1.0,1.0);//white
vec3 colorB = vec3(0.53137,0.5411,0.921); //light pur
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

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    // shrink size and position
    st *= 3.0;
    st.x -= 1.5;
    st.y -= 1.5;

    // Round it up
    float r = length(st); // radius
    float a = atan(st.y,st.x)/PI;
    a = a*0.5+0.5;
    st = vec2(a,r);

    vec3 color = palette(st.y,colorB, colorD, colorA, colorC);
    
    // Animate
    float t = u_time*0.04;
    vec3 pct = vec3(st.y) * t;
    
    pct.r = 2.0;
    pct.g = 0.2;
    pct.b = mix(1.5,1.5,st.x);

    color *= 0.7* mix(colorC, colorA, pct);
  
   // Plot transition lines for each channel
    // color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
    // color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
    // color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));

    gl_FragColor = vec4(color,1.0);
}