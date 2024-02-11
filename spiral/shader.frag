precision mediump float;

#pragma vscode_glsllint_stage: frag

uniform float u_time;
uniform sampler2D u_noise;

varying vec2 vTexCoord;

void main() {
    vec2 uv = vTexCoord; //+ vec2(cos(u_time* 0.33 ), sin(u_time *0.42)); 
    uv = uv * 2.0 - 1.0;

    float dist = distance(uv, vec2(0.));

    vec2 unitVec = vec2(0., 1.);

    float angle = acos(
        dot(unitVec, uv) / 
        (length(unitVec) * length(uv))
        ) /3.14159265359 + cos(u_time);
    
    float a1 = angle + dist;
    float a2 = angle - dist;

    float noise1 = texture2D(
        u_noise, 
        vec2(a1, a1 + sin(dist * 88. + u_time * 2.)/77.)).r;

    float noise2 = texture2D(
        u_noise, 
        vec2(a2, a2 + sin(dist * 88. + u_time * 2.)/77.)).r;
    gl_FragColor = vec4(1. - step(0.585, noise1) - noise2/4., 1. - step(0.585, noise2) - noise1/3., 0.4,  0.5);
}