precision mediump float;

#pragma vscode_glsllint_stage: frag

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;
uniform sampler2D u_tex;

varying vec2 vTexCoord;

void main() {
    vec2 uv = vTexCoord;
    uv.x = uv.x*0.9 + 0.05 * uv.y;
    uv.y = mod(u_time, 1.0);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float d = distance(st, vec2(0.5, 0.5));
    vec4 noise = texture2D(u_tex, uv);
    gl_FragColor = noise;
}