// Author_ Nitcha Tothong (nitchafa.me)

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

float doubleCubicSeat (float x, float a, float b){
  float y = 0.0;
  if (x <= a){
    y = b - b*pow(1.0-x/a, 3.0);
  } else {
    y = b + (1.0-b)*pow((x-a)/(1.0-a), 3.0);
  }
  return y;
}

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i); // Avoid truncation effects in permutation
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
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




void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    //st.x += 0.6;
    st *= 0.8;
    vec3 pct = vec3(0.0);
    vec4 color = vec4(0.0);
    float offset = float (0.0);
    vec2 vel = vec2(0.0);
    vec2 pos = st.xy * pow(1.0,2.0);
    //vec2 pos = st.xy * pow(1.7,1.7);
    float pattern = pos.x;
    //pos = rotate2d(noise(pos)) * pos;

    //
    float DF = 0.0;
    // Add a random position
    float a = 0.0;
    //vec2 vel = vec2(u_time*.02);

    DF += snoise(pos+vel)*0.1+ 0.3;

    // Add a random position
    a = snoise(pos*vec2(cos(u_time*0.5),sin(u_time*0.6))*0.1)*3.1415;
    vel = vec2(cos(a),sin(a));
   // vel = vec2 (doubleCubicSeat(st.y * abs(sin(u_time)), 5.0, st.x * u_time));
    DF += snoise(pos+vel)*0.15+0.25;

    offset = smoothstep(0.5,.75,fract(DF));
    // vec2 q = vec2(0.0);
    // q.x = fbm( st + 0.00*u_time);
    // q.y = fbm( st + vec2(1.0));

    // vec2 r = vec2(0.0);
    // r.x = fbm( st + 1.0*q + vec2(1.9,9.2)+ 0.15*u_time );
    // r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.15*u_time);

    // float f = fbm(st+r);
   
    // pct = mix(vec3(0.101961,0.619608,0.666667),
    //             vec3(0.666667,0.666667,0.498039),
    //             clamp((f*f)*4.0,0.0,1.0));

    // pct = mix(pct,
    //             vec3(0,0,0.164706),
    //             clamp(length(q),0.0,1.0));

    // pct = mix(pct,
    //             vec3(0.666667,1,1),
    //             clamp(length(r.x),0.0,1.0));

    // offset.x = float(pct);
    color = texture2D (u_tex0, st + offset);
    color *= color * offset;


//line texture
 
   // pattern = fractCircles(pos + offset,0.03);
//color += color*pattern;


    gl_FragColor = vec4 (color);
}