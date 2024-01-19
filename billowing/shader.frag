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
    uv.y = mod(u_time/8.0, 1.0);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float d = distance(st, vec2(uv.x, 0.5));
    float noise = texture2D(u_tex, uv).r;
    gl_FragColor = vec4(
        98.0/255.0 + step(0.58 + smoothstep(0.3, 0.4, d)/10.0, noise)/10.0,
        163.0/255.0,
        98.0/255.0 + noise,
        1.0
    );
}