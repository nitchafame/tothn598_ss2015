/// Nitcha Tothong - nitchafa.me

#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.1415
uniform vec2 u_resolution;
uniform float u_time;


mat3 matrix = mat3(vec3(1.,0.,0.),
                   vec3(0.,1.,0.),
                   vec3(0.,0.,1.));

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
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
    * 1.0-smoothstep(0.1 ,0.6,1.0-dot(st,st)*2.);
}


vec2 symmetry(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.x,3.0) > 1.0) {
       float patternDistance = 0.1;
       st.x = -st.x ;
    }

    if (mod(st_i.y,3.0) > 1.0) {
       float patternDistance = 0.1;
       st.y = -st.y ;
    }
    return st;
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);
    vec3 pos = vec3(st,1.0);
    float d = 0.0;
    
    d = length(abs(st)-0.3);
    st *= 6.0;
    //st = st *2.0-8.0;
    st = rotate2d( sin(0.70) ) * st;

    rotate(0.9);    
    vec2 st_i = floor(st);
   
    if (mod(st_i.y,2.0) == 1.0) {
      //  float pct = inner(st_f,1.1);
        float patternDistance = 0.3;
        st.x = -st.x + patternDistance;
    }

    if (mod(st_i.y,2.0) > 1.0) {
      //  float pct = inner(st_f,1.1);
        float patternDistance = 0.9;
        st.y = -st.y + patternDistance;
    }

    vec2 st_f = fract(st);
    float pct = inner(st_f,1.3);

   // float pct = circle(st_f,1.1);
    color += pct;
    //color += pct* vec3(pos.xy, 0.5);

	gl_FragColor = vec4(vec3(color),1.0);
}
