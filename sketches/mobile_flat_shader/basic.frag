
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; 
uniform vec2 u_time;

void main() {

  vec2 st = gl_FragCoord.xy/u_resolution.xy; 

  gl_FragColor = vec4(sin(u_time)*0.5+0.5,0.0,0.0,1.0); // R,G,B,A

}