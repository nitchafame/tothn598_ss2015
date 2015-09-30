#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;


//  Function from Iñigo Quiles 
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*5.0 + vec3(0.0,1.0,2.0),
                             3.0)-3.0)-1.0,0.2,1.0 );
    
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * step(vec3(0.5), rgb);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    st += 2.0;
    vec3 color = vec3(0.0);
    color = hsb2rgb(vec3(st.y,1.0,1.0));

    gl_FragColor = vec4(color,1.0);
}
