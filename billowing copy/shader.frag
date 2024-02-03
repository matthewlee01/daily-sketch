precision mediump float;

#pragma vscode_glsllint_stage: frag

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;
uniform sampler2D u_tex;
uniform vec2 u_p0;
uniform vec2 u_p1;
uniform vec2 u_p2;
uniform vec2 u_p3;
uniform vec2 u_p4;
uniform vec2 u_p5;
uniform vec2 u_p6;
uniform vec2 u_p7;

varying vec2 vTexCoord;

void main() {
    vec2 uv = vTexCoord;
    float d = 1.0;

    vec2 ps[8];
    ps[0] = u_p0;
    ps[1] = u_p1;
    ps[2] = u_p2;
    ps[3] = u_p3;
    ps[4] = u_p4;
    ps[5] = u_p5;
    ps[6] = u_p6;
    ps[7] = u_p7;

    for (int i = 0; i < 8; i++) {
        d = min(d, distance(uv, ps[i]));
    }

    float noise = texture2D(u_tex, uv).r;
    gl_FragColor = vec4(d, d/4.+uv.x/2.+0.1, d/4.+uv.y/2.+0.1, 1.0);
}