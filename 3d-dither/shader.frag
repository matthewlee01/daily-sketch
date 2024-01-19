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
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float d = distance(st, vec2(0.5, 0.5));
    float color = texture2D(u_tex, uv).r;
    float noise = 1.0 - texture2D(u_noise, uv).r;
    gl_FragColor = vec4(
        step(0.5 * noise, color),
        step(0.66 * noise, color),
        step(0.33 * noise, color),
        1.0
    );
}