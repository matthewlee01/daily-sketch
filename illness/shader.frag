precision mediump float;

#pragma vscode_glsllint_stage: frag

uniform float u_time;
uniform sampler2D u_noise;

varying vec2 vTexCoord;

void main() {
    vec2 uv = vTexCoord; //+ vec2(cos(u_time* 0.33 ), sin(u_time *0.42)); 
    uv = uv * 2.0 - 1.0;
    float noise;
    vec4 color = vec4(0.5, 0.5, 0.5, 1.0) + noise;
    float amplitude = 1.;
    float frequency = 1.;
    float lacunarity = -u_time * 0.05;

    for (int i = 0; i < 8; i++) {
        noise = (
            texture2D(
                u_noise, 
                mod(uv * frequency, 1.0)
                ).r - 0.5) * amplitude;
        frequency *= lacunarity;
        color += vec4(noise/4.0, 0.01, noise/8.0, 1.0);
        
    }

    gl_FragColor = color;
}