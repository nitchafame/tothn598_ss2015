#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorA = vec3(0.5,0.5,0.5); 
vec3 colorB = vec3(1.0,0.7,0.4); 
vec3 colorC = vec3(0.0,0.15,0.2); 

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) - 
          smoothstep( pct, pct+0.01, st.y);
}

// cosine based palette, 4 vec3 params by Iñigo Quílez
// http://www.iquilezles.org/www/articles/palettes/palettes.html
vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    // Move to - 
    st.x += 0.40*u_time;
    
    vec3 color = palette(st.x,colorA, colorC, colorB, colorC)* 1.0;
    // if( st.y > (1.0/3.0) ) 
    // color = palette(st.x,colorA, colorC, colorB, colorC)* 2.0;
    // if( st.y > (2.0/3.0) ) 
    // color = palette(st.x,colorA, colorC, colorB, colorC)* 3.0;

    // float f = fract(st.y*3.0);
    // color *= 0.4+0.3* sqrt (1.5 * fract (6.0 - f));
    
    // Darker
    color *= 0.7* sqrt (1.2);

    gl_FragColor = vec4(color,1.0);
}