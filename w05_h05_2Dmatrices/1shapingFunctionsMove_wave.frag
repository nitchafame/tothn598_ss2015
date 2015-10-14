// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

mat3 matrix = mat3(vec3(1.,0.,0.),
                   vec3(0.,1.,0.),
                   vec3(0.,0.,1.));

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}

float cross(inout vec2 _st, float _size){
    return  box(_st, vec2(_size,_size/4.)) + 
            box(_st, vec2(_size/4.,_size));
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

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
//     st *= 9.5;
//     st.x -= 2.5;
    vec3 pos = vec3(st,1.0);
    vec3 color = vec3(0.0);
   
    // To move the cross we move the space
    //vec2 translate = vec2(sin(u_time-6.),cos(u_time*6.0));
    vec2 translate = vec2(doubleCubicSeat(1.0,u_time-6.0,5.0),sin(u_time*4.0+6.0*st));
    
    st += translate*0.15;
//     st -= vec2(0.5);
//     st = rotate2d( sin(u_time*0.5)*PI ) * st;
//     st += vec2(0.5);
    //st.y += 0.2;
 pos = matrix * pos;
    // Show the coordinates of the space on the background
    color = vec3(st.x,st.y,1.0);

    // Add the shape on the foreground
    color += vec3(cross(st,0.15));

    gl_FragColor = vec4(color,1.0);
}