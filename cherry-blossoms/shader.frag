precision mediump float;

#pragma vscode_glsllint_stage: frag

uniform float u_time;
uniform sampler2D u_noise;

varying vec2 vTexCoord;

void main() {
    vec2 uv = vTexCoord; //+ vec2(cos(u_time* 0.33 ), sin(u_time *0.42)); 
    uv = uv * 2.0 - 1.0 + u_time;
    float noise;
    vec4 color = vec4(0.5, 0.5, 0.5, 1.0);
    float amplitude = 1.;
    float frequency = 1. + u_time * 0.1;
    float lacunarity = -u_time * 0.03;

    for (int i = 0; i < 8; i++) {
        noise = (
            texture2D(
                u_noise, 
                mod(uv * frequency, 1.0)
                ).r - 0.5) * amplitude;
        frequency *= lacunarity;
        color += vec4(step(0.2, noise), 0.04, 1.0 - step(0.2, noise), 1.0);
        
    }

    gl_FragColor = color;
}