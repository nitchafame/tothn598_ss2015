#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorA = vec3(1.0,1.0,1.0);//whtie
vec3 colorB = vec3(0.83137,0.7411,0.9921); //light pur
vec3 colorC = vec3(0.4117,0.2431,0.7254); //pur
vec3 colorD = vec3(0.3098,0.3098,0.8862); //blue

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
    st -= 1.5;

    // Round it up
    float r = length(st); // radius
    float a = atan(st.y,st.x)/PI;
    a = a*0.5 + 0.5;
    st = vec2(a,r);

    vec3 color = palette(st.x,colorB, colorD, colorA, colorC);
    
    // Animate
    //float t = u_time*0.04;
    float t = u_time* 5.0;
    vec3 pct = vec3(st.x) * t;
    
    pct.r = smoothstep(3.1,2.0, st.y);
    pct.g = clamp(pct.g, 0.1,0.9);
    pct.b = st.y;

    color *= 0.8* log(3.2);
    //color = mix(colorA, colorB, pct);
    //color = palette(1.5,colorA,colorB,colorC,colorD);

   // Plot transition lines for each channel
    // color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
    // color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
    // color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));

    gl_FragColor = vec4(color,1.0);
}