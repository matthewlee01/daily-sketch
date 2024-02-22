precision mediump float;

#pragma vscode_glsllint_stage: frag

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;
uniform sampler2D u_tex;
uniform sampler2D u_noise;

varying vec2 vTexCoord;

void main() {
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;
    vec4 c = texture2D(u_tex, uv);
    float value = c.r;
    uv.x = fract(uv.x * u_resolution.x);
    uv.y = abs(fract(uv.y * u_resolution.y) * 2. - 1.);
    float final = 1. - step(value * 0.87, uv.y);
    gl_FragColor = vec4(final);
}