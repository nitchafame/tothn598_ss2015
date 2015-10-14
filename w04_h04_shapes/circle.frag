#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// This one take some time to see the tranforming

vec3 colorA = vec3(1.0,1.0,1.0);
vec3 colorB = vec3(0.0,0.0,0.0); 
vec3 colorC = vec3(0.203,0.125,0.121); 
vec3 colorD = vec3(0.545,0.415,0.38); 

float plot (vec2 st, float pct){
  return  step( pct-0.01,st.y) - 
          step( pct, st.y);
}

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
    a = a*0.5;
    st = vec2(a,r);

    vec3 color = palette(st.x,colorA, colorB, colorC, colorD);
    
    //Animate
    float t = u_time*0.06;
    vec3 pct = vec3(st.y);
    
    // pct.r = smoothstep(3.1,2.0, st.x);
    // pct.g = clamp(pct.g, 0.1,0.9);
    // pct.b = st.y;

    color = mix(colorA, colorB, pct);

    gl_FragColor = vec4(color,1.0);
}