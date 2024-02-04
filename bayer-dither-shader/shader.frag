precision mediump float;

#pragma vscode_glsllint_stage: frag

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;
uniform sampler2D u_tex;
uniform sampler2D u_noise;

mat4 bayer = mat4(
  0.0, 8.0, 2.0, 10.0,
  12.0, 4.0, 14.0, 6.0,
  3.0, 11.0, 1.0, 9.0,
  15.0, 7.0, 13.0, 5.0
);

varying vec2 vTexCoord;

void main() {
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;
    float noise = 0.5*texture2D(u_noise, uv).r;
    vec4 color = texture2D(u_tex, uv);
    int x = int(mod(gl_FragCoord.x, 4.0));
    float threshold = bayer[1][1]/16.0;
    gl_FragColor = vec4(
        step(0.6, color.r),
        step(0.4, color.g),
        step(0.2, color.b),
        1.0
    );
}