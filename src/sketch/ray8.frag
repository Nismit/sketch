precision highp float;
uniform float pixelRatio;
uniform vec2 resolution;
uniform float time;

#define PI 3.14159265359

vec3 rotate(vec3 p, float angle, vec3 axis) {
  vec3 a = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float r = 1.0 - c;
  mat3 m = mat3(
      a.x * a.x * r + c,
      a.y * a.x * r + a.z * s,
      a.z * a.x * r - a.y * s,
      a.x * a.y * r - a.z * s,
      a.y * a.y * r + c,
      a.z * a.y * r + a.x * s,
      a.x * a.z * r + a.y * s,
      a.y * a.z * r - a.x * s,
      a.z * a.z * r + c
  );
  return m * p;
}

float sphere(vec3 p, float size) {
  return length(p) - size;
}

float sdBox(vec3 p, vec3 b) {
  vec3 q = abs(p) - b;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float getDistance(vec3 p, float size) {
  vec3 q = rotate(p, (2.0 * PI * (time/400.0)), vec3(0., 1.0, 0.));
  float d = 0.;
  // vec4 s = vec4(0.5, 0.35, 0., 0.);
  // float sphereDist = sphere(p - s.xyz, size) - s.w;
  // d = sphereDist;
  float boxDist = sdBox(q , vec3(0.3, 0.3, 0.3));
  d = boxDist;
  // float planeDist = p.y;
  // d = min(d, planeDist);
  return d;
}

vec3 getNormal(vec3 p, float size) {
  float d = getDistance(p, size);
  vec2 e = vec2(.001, 0); // e === delta
  // float delta = 0.0001;
  vec3 n = d - vec3(
    getDistance(p - e.xyy, size),
    getDistance(p - e.yxy, size),
    getDistance(p - e.yyx, size)
  );

  return normalize(n);
}

float rayMarch(vec3 ro, vec3 rd) {
  float size = 0.3;
  float d = 0.;
  // marching loop
  for(int i = 0; i < 16; i++) {
    vec3 p = ro + rd * d;
    float ds = getDistance(p, size);
    d += ds;
    if (d > 99. || ds < 0.01) {
      break;
    }
  }

  return d;
}

float getLight(vec3 p) {
  float size = 0.3;
  // * sin(PI * (time/300.0))
  // Light
  vec3 lightPos = vec3(5.0, 3.5, 3.0);
  vec3 lightDirection = normalize(lightPos - p);
  vec3 n = getNormal(p, size);

  float diff = dot(n, lightDirection);
  diff = clamp(diff, 0., 1.);

  // Shadow ray march starts from light direction
  float shadow = rayMarch(p + n*0.01*1.1, lightDirection);
  if (shadow < length(lightPos - p)) diff *= .1;
  return diff;
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
  vec3 col = vec3(0.);

  // ro: ray origin
  vec3 ro = vec3(0, 0.7, 3.0);
  // rd: ray direction
  vec3 rd = normalize(vec3(uv, 0) - ro);

  float d = rayMarch(ro, rd);
  vec3 p = ro + rd * d;
  float diff = getLight(p);
  // d *= .2;

  col = vec3(diff);

  gl_FragColor = vec4(col, 1.);
}
