precision mediump float;

#pragma vscode_glsllint_stage: frag

uniform float u_time;
uniform sampler2D u_noise;
uniform sampler2D u_tex;

varying vec2 vTexCoord;

void main() {
    vec2 uv = vTexCoord; //+ vec2(cos(u_time* 0.33 ), sin(u_time *0.42)); 
    uv.y = 1.0 - uv.y;


    uv = uv * 2.0 - 1.0;
    uv.x += 0.25;
    uv.y += 0.12;

    float radius = 0.4;
    float thickness = 0.02;

    float dist = distance(uv, vec2(0.));

    vec2 unitVec = vec2(0., 1.);

    float actualAngle = acos(
        dot(unitVec, uv) / 
        (length(unitVec) * length(uv))
        ) /(3.14159265359*2.);

    if (uv.x < 0.) {
        actualAngle = 1. - actualAngle;
    }

    float noise = texture2D(
        u_noise, 
        vec2(actualAngle, sin(u_time/20.) * 0.5 + 0.5)).r / 3.;
    
    float noise2 = texture2D(
        u_noise,
        mod((uv+1.0)/2.0 + u_time/20., 1.0)
    ).r;

    float v = texture2D(u_tex, (uv+1.0)/2.).r;

    vec4 color = vec4(v, v, v, 1.0);
    if (dist < radius + noise + thickness && dist > radius + noise - thickness) {
        color = vec4(1., 1., 1., 1.) - color;
    }
    gl_FragColor = color;
}