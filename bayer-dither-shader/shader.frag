precision mediump float;

#pragma vscode_glsllint_stage: frag

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;
uniform sampler2D u_tex;

varying vec2 vTexCoord;

void main() {
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float d = distance(st, vec2(0.5, 0.5));
    gl_FragColor = vec4(
        0.8, 
        sin(st.x+u_time*1.3)/2.0 + 0.5, 
        cos(st.y+u_time*1.7)/2.0 + 0.5,
        sin(d+u_time*4.0)/4.0 + 0.75
    );
}