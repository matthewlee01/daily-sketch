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
    float scan = 1.0 - 200.0*u_time/u_resolution.y;
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float d = distance(st, vec2(uv.x, 0.5));
    float noise = texture2D(u_noise, uv).r;
    vec4 color = scan * texture2D(u_tex, vec2(uv.x+(noise*noise*10.0 * u_time/16.0), uv.y+(noise * u_time/2.0)));
    if (u_time < 0.0) {
        color = texture2D(u_tex, uv);
    }
    gl_FragColor = vec4(color.rgb, 1.0);
}