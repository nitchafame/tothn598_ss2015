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

float exponentialInOut(float t) {
  return t == 0.0 || t == 1.0
    ? t
    : t < 0.5
      ? +0.5 * pow(2.0, (20.0 * t) - 10.0)
      : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    // shrink size
    st *= 4.0;
    vec3 color = vec3(0.0);
    vec3 sunrise = vec3(0.0);
    //vec3 nightSky = vec3(0.0);
    vec3 sunset = vec3(0.0);

    float t = u_time*0.06;
    float sinTime = exponentialInOut( abs(fract(t)*2.0-1.) );
    
    vec2 p = vec2(cos(u_time*2.0),sin(u_time*2.1))* 0.05+1.5 ;
    vec3 pct = vec3(st.y)*t;
    
    pct.r = smoothstep(5.0, 0.05,sin(st.y *PI)+2.0);
    pct.g = smoothstep(2.5, 0.05,sin(st.y *PI)+1.5);

    pct.b = exponentialInOut( abs(fract(t)*2.0-1.) );
    
    //color = mix(colorA, colorC, pct);

    sunrise = mix(colorA, colorC, pct);
    sunset = mix(colorB, colorA, pct);

    color = mix(sunrise, sunset, sinTime);

   // Plot transition lines for each channel
    color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
    color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
    color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));

    gl_FragColor = vec4(color,1.0);
}