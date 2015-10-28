/// Nitcha Tothong - nitchafa.me

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define sinAT abs(sin(u_time*0.1))


mat3 matrix = mat3(vec3(1.,0.,0.),
                   vec3(0.,1.,0.),
                   vec3(0.,0.,1.));

mat3 scaleMatrix(vec2 f) {
    return mat3(vec3(f.x,0.0,0.0),
                vec3(0.0,f.y,0.0),
                vec3(0.0,0.0,1.0));
}

void scale(in vec2 f) {
    matrix = scaleMatrix(f) * matrix;
}

mat3 translationMatrix(vec2 f) {
    return mat3(vec3(1.0,0.0,0.0),
                vec3(0.0,1.0,0.0),
                vec3(f.x,f.y,1.0));
}

void translate(vec2 f) {
    matrix = translationMatrix(f) * matrix;
}

mat3 rotationMatrix(float a) {
    return mat3(vec3(cos(a),-sin(a),0.0),
                vec3(sin(a),cos(a),0.0),
                vec3(0.0,0.0,1.0));
}

void rotate(float a) {
    matrix = rotationMatrix(a) * matrix;
}

float inner(vec2 st, float radius){
    st -= 0.5;
    st.x -= 0.5;
    return 1.0-step(radius * 0.8,dot(st,st)*2.)
    * 1.0-smoothstep(0.1 ,0.7,1.0-dot(st,st)*2.);
}

float blurry(vec2 st, float radius){
    st -= 0.5;
    st.x -= 0.5;
    float blkCircle = 1.0- smoothstep(0.01,1.8,dot(st,st)*2.);
    return 1.0-smoothstep(0.1 ,3.15,dot(st,st)*1.0) / 
    1.0-step(1.1*0.5,dot(st,st)*0.2)-blkCircle;
    st *= 10.;
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);
    //float d = distance(st,vec2(0.9));
    //d =  1.0-length(max(abs(st-0.5)-.3*(cos(u_time)*.5),0.1));
    //d = d *3.14 *2.0;
    // float inner = 1.0-step(1.1*0.8,dot(st,st)*2.)*1.0-smoothstep(0.1 ,0.9,1.0-dot(st,st)*2.);
    // float circle = 1.0- step(0.8,dot(st,st)*2.);
    // float outer = 1.0-smoothstep(0.1 ,0.9,dot(st,st)*1.0) / 1.0-step(1.1*0.8,dot(st,st)*0.2) - circle ;
    
    st *= 8.0;
   
    vec2 st_i = floor(st);
    float motion = abs(sin(u_time)*0.2);

    if (mod(st_i.y,2.0) == 1.0) {
    //float patternDistance = 0.35;
    st.x = -st.x;
    }

    if (mod(st_i.x,2.0) == 1.0) {
    //float patternDistance = 0.65;
    st.x = -st.x;
    }
   
   
    // translate(vec2(-0.3));
    scale(vec2(cos(u_time)*sinAT)-0.5);
    // rotate(u_time*-0.6);

   // float pct = circle(st_f,1.1);
    vec2 st_f = fract(st);
    vec3 pos = vec3(st_f,1.0);
    pos = matrix * pos;

    float pct = blurry(pos.xy,1.1);
    color += pct;
        
	gl_FragColor = vec4(color,1.0);
}
