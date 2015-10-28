#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0);
  float d = .3+u_time;

  st = st *2.-1.;

  // Make the distance field
  d = length( abs(st)-.1 );
  d = length( min(abs(st)-.4,0.) );
  d = length( max(abs(st)-.1,0.) );

  // Visualize the distance field
  gl_FragColor = vec4(vec3(fract(d*10.0)),1.0);

  // Drawing with the distance field
  gl_FragColor = vec4(vec3( step(.8,d) ),1.0);
  gl_FragColor = vec4(vec3( step(.1,d) * step(d,.8)),1.0);
  gl_FragColor = vec4(vec3( smoothstep(.3,.4,d)* smoothstep(.6,.5,d)) ,1.0);
}