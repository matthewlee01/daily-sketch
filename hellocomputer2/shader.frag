precision mediump float;

#pragma vscode_glsllint_stage: frag

uniform float u_time;
uniform sampler2D u_noise;

varying vec2 vTexCoord;

void main() {
    vec2 uv = vTexCoord; //+ vec2(cos(u_time* 0.33 ), sin(u_time *0.42)); 


    uv = uv * 2.0 - 1.0;

    float radius = 0.2;
    float thickness = 0.01;

    float dist = distance(uv, vec2(0.));

    

    vec2 unitVec = vec2(0., 1.);

    float angle = acos(
        dot(unitVec, uv) / 
        (length(unitVec) * length(uv))
        ) /3.14159265359 * 2.;

    if (uv.x < 0.) {
        angle = angle + u_time * 0.1;

    } else {
        angle = angle - u_time * 0.1;
    }
    float t = floor(angle);
    angle = angle - t;
    angle = abs(angle - 0.5) * 2.0;

    float noise = texture2D(
        u_noise, 
        vec2(angle/2., sin(u_time/10.) * 0.5 + 0.5)).r / 2.;

    if (dist > radius + noise + thickness || dist < radius + noise - thickness) {
        discard;
    }
    gl_FragColor = vec4(angle, noise * 2., 0., 1.0);
}