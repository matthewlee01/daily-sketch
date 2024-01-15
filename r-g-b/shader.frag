precision mediump float;

#pragma vscode_glsllint_stage: frag

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;
uniform sampler2D u_tex;
uniform sampler2D u_noise1;
uniform sampler2D u_noise2;

varying vec2 vTexCoord;

void main() {
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float d = distance(st, vec2(0.5, 0.5));
    vec4 color = texture2D(u_tex, uv);
    float noise1 = 0.4*texture2D(u_noise1, uv).r;
    float noise2 = 0.4*texture2D(u_noise2, uv).r;
    float value = min(step(noise2, color.r), step(noise1, color.r)); 
    gl_FragColor = vec4(value);
}