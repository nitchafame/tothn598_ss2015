#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.85,0.478,0.329); //salmon
vec3 colorB = vec3(0.545,0.415,0.38); //dull pink
vec3 colorC = vec3(0.203,0.125,0.121); //dark pink

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) - 
          smoothstep( pct, pct+0.01, st.y);
}

float circularInOut(float t) {
  return t < 0.5
    ? 0.5 * (1.0 - sqrt(1.0 - 4.0 * t * t))
    : 0.5 * (sqrt((3.0 - 2.0 * t) * (2.0 * t - 1.0)) + 1.0);
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    // shrink size
    st *= 1.5;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.y);
    float t = u_time*0.5;

    //pct.r = circularInOut(0.2*t);
    pct.g = pow(st.y*abs(sin(t)), 2.0);
    pct.b = pow(st.x*abs(cos(t)), 2.0);
    // pct.b = tan(u_time * st.y * 7.5);

    color = mix(colorA, colorB / colorC, pct);
    
   // Plot transition lines for each channel
    // color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
    // color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
    // color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));

    gl_FragColor = vec4(color,1.0);
}