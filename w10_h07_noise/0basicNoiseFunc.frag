#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

float random(in float x){
    return fract(sin(x)*43758.5453);
}

float random(in vec2 st){
    return fract(sin(dot(st.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float noise(float x){
    float i = floor(x);  // integer
    float f = fract(x);  // fraction
    return mix(random(i), random(i + 1.0), smoothstep(0.,1.,f));

}

vec2 truchetPattern(in vec2 _st, in float _index){
    _index = fract(((_index-0.1*noise(u_time))*2.0));
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
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= 25.0;
    
    float pct = 0.0;
    vec3 color = vec3(0.0);

    pct = circles(st,noise(0.7),0.0);
    

    color += pct;
    gl_FragColor = vec4(vec3(color),1.0);
}