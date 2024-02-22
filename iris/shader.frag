precision mediump float;

#pragma vscode_glsllint_stage: frag

uniform float u_time;
uniform sampler2D u_noise;

varying vec2 vTexCoord;

void main() {
    vec2 uv = vTexCoord; 
    uv.y = 1.0 - uv.y;

    uv = uv * 2.0 - 1.0;

    float radius = 0.05;
    float thickness = 0.002;

    float dist = distance(uv, vec2(0.));

    vec2 unitVec = vec2(0., 1.);

    float actualAngle = acos(
        dot(unitVec, uv) / 
        (length(unitVec) * length(uv))
        ) /(3.14159265359*2.);

    if (uv.x < 0.) {
        actualAngle = 1. - actualAngle;
    }

    float noise;
    vec4 color = vec4(0., 0., 0., 1.0);
    float amplitude = 1.;
    float frequency = 1.;
    float lacunarity = 2.;
    for (int i = 0; i < 66; i++) {
        noise = texture2D(
            u_noise, 
            vec2(mod(actualAngle * frequency, 1.0), 
                        sin(u_time/80.) * 0.5 + 0.5)).r * amplitude;
        frequency *= lacunarity;
        if (dist < radius + noise + thickness && dist > radius + noise - thickness) {
            color += vec4(1./float(i), 0.6, 0.5, 0.);
        }
    }
    
    // if (dist > radius + noise + thickness || dist < radius + noise - thickness) {
        // discard;
    // }
    gl_FragColor = color;
}