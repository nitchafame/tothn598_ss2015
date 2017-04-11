#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 color1 = vec3(0.212,0.282,0.302);
vec3 color2 = vec3(0.965,0.541,0.231);
vec3 color3 = vec3(0.365,0.141,0.937);
vec3 color4 = vec3(0.816,0.129,0.580);

//  Function from Iñigo Quiles 
//  www.iquilezles.org/www/articles/functions/functions.htm
float pcurve( float x, float a, float b ){
    float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));
    return k * pow( x, a ) * pow( 1.0-x, b );
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    float left = pcurve(st.x-0.5,5.,1.0);
    float right = pcurve(.5-st.x,5.,1.0);
    float base = pcurve(st.y,1.0,1.0+abs(sin(u_time/10.))*5.0);
    float move = pcurve(.4-st.y,0.2+abs(cos(u_time/10.))*5.,1.0);
    float move2 = pcurve(.4-st.y,0.7+abs(sin(u_time/5.))*4.,1.0);
    vec3 color = vec3(base);
    
    color = mix(color2, color4, base); 
    color = mix(color, color4, move);
    color = mix(color, color2, move2);
    color = mix(color, color1, left);
    color = mix(color, color3, right);

    gl_FragColor = vec4(color,1.0);
}