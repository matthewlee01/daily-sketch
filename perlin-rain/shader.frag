precision mediump float;

#pragma vscode_glsllint_stage: frag

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;
uniform sampler2D u_tex;

varying vec2 vTexCoord;

void main() {
    vec2 uv = vTexCoord;
    uv.y = mod(u_time + uv.y, 1.0);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float noise = texture2D(u_tex, uv).r;
    gl_FragColor = vec4(
        0.0,
        0.0,
        98.0/255.0 * noise,
        1.0
    );
}