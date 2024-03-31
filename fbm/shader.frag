precision mediump float;

#pragma vscode_glsllint_stage: frag

uniform float u_time;
uniform sampler2D u_noise;

varying vec2 vTexCoord;

void main() {
    vec2 uv = vTexCoord; 
    uv.y = 1.0 - uv.y;

    float thickness = 0.01;

    float dist = distance(uv, vec2(0.));

    float noise;

    vec4 color = vec4(0., 0., 0., 1.0);

    float amplitude = 1.;
    float frequency = 0.1;
    float lacunarity = 1.5;
    for (int i = 0; i < 8; i++) {
        noise = texture2D(
            u_noise, 
            vec2(fract((uv.x + 0.05) * frequency), fract(u_time/50.0))).r;
        frequency *= lacunarity;
        if (abs(noise - uv.y) < thickness) {
            color = vec4(1., 1., 1., 1.0);
        }
    }

    gl_FragColor = color;
}