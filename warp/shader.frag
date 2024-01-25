precision mediump float;

#pragma vscode_glsllint_stage: frag

uniform vec2 u_resolution;
uniform vec2 u_coords;
uniform vec3 u_mouse;
uniform float u_time;
uniform sampler2D u_tex;

varying vec2 vTexCoord;

void main() {
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float d = distance(st, vec2(0.5, 0.5));
    float color = texture2D(u_tex, uv).r;
    gl_FragColor = color * vec4((u_coords.x+u_coords.y)/2.0, (uv.x+uv.y)/2.0, 1.0-(u_coords.x+u_coords.y)/2.0, 1.0);
}