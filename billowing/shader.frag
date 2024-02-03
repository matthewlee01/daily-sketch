precision mediump float;

#pragma vscode_glsllint_stage: frag

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;
uniform sampler2D u_tex;

varying vec2 vTexCoord;

void main() {
    vec2 uv = vTexCoord;
    uv.y = uv.y*0.9 + 0.05 * uv.x;
    uv.x = mod(u_time/16.0, 1.0);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float d = distance(st, vec2(uv.y, 0.5));
    float noise = texture2D(u_tex, uv).r;
    gl_FragColor = vec4(
        98.0/255.0 + noise,
        98.0/255.0 + step(0.52 + smoothstep(0.4, 0.5, d)/10.0, noise)/10.0,
        163.0/255.0,
        0.9
    );
}