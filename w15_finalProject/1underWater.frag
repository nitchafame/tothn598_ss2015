// Author_ Nitcha Tothong 
// http://nitchafa.me


#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (vec2 st) { 
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))* 
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + 
            (c - a)* u.y * (1.0 - u.x) + 
            (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 5

float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), 
                    -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st = rot * _st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

float pcurve( float x, float a, float b )
{
    float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));
    return k * pow( x, a ) * pow( 1.0-x, b );
}



mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}


float fractCircles(in vec2 pos, float size) {
  float scale = 6.0;
  pos *= scale;
  float pct = fract(length(pos/size));
  return  step(0.35, pct) - step(0.5, pct);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x += 0.6;
    vec3 pct = vec3(0.0);
    vec4 color = vec4(0.0);
    vec2 offset = vec2(0.0);
    
    vec2 q = vec2(0.0);
    q.x = fbm( st + 0.00*u_time);
    q.y = fbm( st + vec2(1.0));

    vec2 r = vec2(0.0);
    r.x = fbm( st + 1.0*q + vec2(1.9,9.2)+ 0.15*u_time );
    r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.15*u_time);

    float f = fbm(st+r);
   
    pct = mix(vec3(0.101961,0.619608,0.666667),
                vec3(0.666667,0.666667,0.498039),
                clamp((f*f)*4.0,0.0,1.0));

    pct = mix(pct,
                vec3(0,0,0.164706),
                clamp(length(q),0.0,1.0));

    pct = mix(pct,
                vec3(0.666667,1,1),
                clamp(length(r.x),0.0,1.0));

    offset.x = float(pct);
    color = texture2D (u_tex0, st + offset);

//line texture
    vec2 pos = st.xy * vec2(5.0,10.0);
    float pattern = pos.x;
    pos = rotate2d( noise(pos) ) * pos;
    pattern = fractCircles(pos + offset,0.03);
    color += color*pattern;

    gl_FragColor = vec4 (color);
}