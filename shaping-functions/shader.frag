precision mediump float;

#pragma vscode_glsllint_stage: frag

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct) {
    return smoothstep(pct-0.02,pct,st.y) -
           smoothstep(pct,pct+0.02,st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    float y = sqrt(st.x);

    vec3 color = vec3(y);

    float pct = plot(st, y);
    color = (1.0-pct)*color + pct*vec3(0.0,  1.1, 0.0);

    gl_FragColor = vec4(color, 1.0);
}