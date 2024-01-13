precision mediump float;

#pragma vscode_glsllint_stage: frag

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;
uniform sampler2D u_tex;

varying vec2 vTexCoord;

void main() {
    vec2 uv = vTexCoord;
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float d = distance(st, vec2(0.5, 0.5));
    float noise_a = texture2D(u_tex, uv).r;
    float noise_b = texture2D(u_tex, vec2(uv.y, uv.x)).r;
    gl_FragColor = vec4(
        0.0,
        0.0,
        0.0,
        step(0.45, (sin(d*88.0 + u_time)*0.5 + 0.5) * noise_b)
    );
}