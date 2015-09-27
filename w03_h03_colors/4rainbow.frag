#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(1.00,1.00,1.0); //white
vec3 colorB = vec3(0.85,0.478,0.329); //salmon
vec3 colorC = vec3(0.203,0.125,0.121); //dark pink
vec3 colorD = vec3(0.545,0.415,0.38); //dull pink
vec3 colorE = vec3(0.04,0.647,1.0); //mint

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
    // shrink size
    st *= 7.0;
    
    vec3 color = palette(st.x,colorA, colorB, colorC, colorE);

    // float f = fract(st.y*4.0);
    // color *= 0.4+0.3* sqrt (1.5 * fract (4.0 - f));
    
    // Darker
    color *= 0.7* sqrt (1.2);

    gl_FragColor = vec4(color,1.0);
}