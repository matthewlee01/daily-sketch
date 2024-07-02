precision mediump float;

#pragma vscode_glsllint_stage: frag

uniform float u_time;
uniform sampler2D u_noise;

varying vec2 vTexCoord;

void main() {
    vec2 uv = vTexCoord; 
    uv.y = 1.0 - uv.y;

    float thickness = 0.001;

    float dist = distance(uv, vec2(0.));

    float noise;

    vec4 color = vec4(0., 0., 0., 1.0);

    float amplitude = .2;
    float frequency = 0.1 * (sin(u_time/4.) * 0.2 + 0.3);
    float lacunarity = 1.5;
    float gain = 0.8;
    float yy = 0.;

    for (int i = 0; i < 24; i++) {

        noise = texture2D(
            u_noise, 
            vec2(fract((uv.x + 0.05) * frequency), fract(u_time/100.0))).r;
        frequency *= lacunarity;

        yy += noise * amplitude;
        amplitude *= gain;

    }
    if (uv.y < yy) {
        float w = 1. - (yy - uv.y) / yy;
        color = vec4(w, w, w, 1.0);
    } else {
        float w = 1. - (uv.y - yy) / (1. - yy);
        color = vec4(w, w, w, 1.0);
    }
    gl_FragColor = color;
}