// Author_ Nitcha Tothong (nitchafa.me)

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float random (in float x) {
    return fract(sin(x)*1e4);
}

float pcurve( float x, float a, float b )
{
    float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));
    return k * pow( x, a ) * pow( 1.0-x, b );
}

void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec4 color = vec4(st.x,st.y,0.0,1.0);

    vec2 offset = vec2(0.);
    

    vec2 st_f = fract(st);
    vec2 st_i = floor(st*100.);
    
    offset.x = abs(sin(u_time))*random(st_i.x);
    color.r = texture2D(u_tex0,st+offset).r;
    offset.x = abs(tan(u_time))*0.999*random(st_i.x);
    color.g = texture2D(u_tex0,st+offset).g;
    offset.x = abs(cos(u_time))*0.99*random(st_i.x);
    color.b = texture2D(u_tex0,st+offset).b;

    gl_FragColor = color;
}