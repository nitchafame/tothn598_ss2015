#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 _st) { 
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))* 
        43758.5453123);
}

vec2 truchetPattern(in vec2 _st, in float _index){
    _index = fract(((_index-0.1*u_time)*2.0));
    if (_index > 0.4) {
        _st = vec2(1.0) - _st;
    } else if (_index > 0.) {
        _st = vec2(1.0-_st.x,_st.y);
    } else if (_index > 0.) {
        _st = 1.0-vec2(1.0-_st.x,_st.y);
    }
    return _st;
}

float circles(vec2 st, float x, float y){
	vec2 ipos = floor(st);  // integer
    vec2 fpos = fract(st);  // fraction
	vec2 tile = truchetPattern(fpos, random(ipos));
	
	return (step(length(tile),x) - step(length(tile),y) ) +
    (step(length(tile-vec2(1.)),x) - step(length(tile-vec2(1.)),y));
}

float fractCircles(vec2 st, float size) {
    vec2 ipos = floor(st);  // integer
    vec2 fpos = fract(st);  // fraction
    vec2 tile = truchetPattern(fpos, random(ipos));
    float pct = fract(0.2-length(tile));
    return  step(0.8, pct) - step(0.2, pct);
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= 15.0;
    // st = (st-vec2(5.0))*(abs(sin(u_time*0.2))*5.);
    // st.x += u_time*3.0;
    float pct = 0.0;
    vec3 color = vec3(0.0);

    //pct = circles(st,0.6,0.4);
     pct = circles(st,0.7,0.0);
    //pct = fractCircles (st,0.5);

    color += pct+vec3(0.3,0.4,0.15);
    gl_FragColor = vec4(vec3(color),1.0);
}