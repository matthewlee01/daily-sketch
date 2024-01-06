precision mediump float;

#pragma vscode_glsllint_stage: frag

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    float pct = (sin(u_time*PI)+1.0)/2.0;

    vec3 color1 = vec3(83.0/255.0, 145.0/255.0, 126.0/255.0);
    vec3 color2 = vec3(191.0/255.0, 78.0/255.0, 34.0/255.0);

    vec3 color = mix(color1, color2, pct);

    gl_FragColor = vec4(color, 1.0);
}
