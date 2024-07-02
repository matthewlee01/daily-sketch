precision mediump float;

#pragma vscode_glsllint_stage: frag

uniform sampler2D u_tex;
uniform vec2 u_resolution;

varying vec2 vTexCoord;

void main() {
    vec2 px = 1.0 / u_resolution;
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;
    float center = texture2D(u_tex, uv).r;

    float t = texture2D(u_tex, uv + vec2(0.0, -px.x)).r;
    float b = texture2D(u_tex, uv + vec2(0.0, px.x)).r;
    float l = texture2D(u_tex, uv + vec2(-px.x, 0.0)).r;
    float r = texture2D(u_tex, uv + vec2(px.x, 0.0)).r;
    float tl = texture2D(u_tex, uv + vec2(-px.x, -px.x)).r;
    float tr = texture2D(u_tex, uv + vec2(px.x, -px.x)).r;
    float bl = texture2D(u_tex, uv + vec2(-px.x, px.x)).r;
    float br = texture2D(u_tex, uv + vec2(px.x, px.x)).r;

    int alive = int(t + b + l + r + tl + tr + bl + br);

    float v = alive == 3 || (alive == 2 && center > 0.0) ? 1.0 : 0.0;

    vec3 c = vec3(v);
    gl_FragColor = vec4(c, 1.0);
}