
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define steps 2.0

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;
uniform vec2  u_resolution;          
uniform float u_time;        
//uniform float iChannelTime[4];       // channel playback time (in seconds)
//uniform vec3  iChannelResolution[4]; // channel resolution (in pixels)
uniform vec2  u_mouse;                // mouse pixel coords. xy: current (if MLB down), zw: click
//uniform samplerXX iChannel0..3;          // input channel. XX = 2D/Cube
// uniform vec4      iDate;                 // (year, month, day, time in seconds)
// uniform float     iSampleRate;           // sound sample rate (i.e., 44100)

void main(){

	vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec4 color = vec4(0.0);
    vec4 c = texture2D(u_tex0,st);

   // float g = 1.0;
    float g = max(c.r,max(c.g,c.b))*steps;
    float effect = 3.678 + u_mouse.y/u_resolution.x;
    float f = mod((st.x+st.y+500.)* effect, 1.0);
    if(mod(g,1.0)>f)
        c.r = ceil(g);
    else
        c.r = floor(g);
    c.r = steps;
    gl_FragColor = color;
}