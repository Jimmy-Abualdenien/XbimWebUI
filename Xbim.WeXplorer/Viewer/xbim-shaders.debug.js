/*
* This file has been generated by spacker.exe utility. Do not change this file manualy as your changes
* will get lost when the file is regenerated. Original content is located in *.c files.
*/
function xShaders() {
    var result = {};
    result.fragment_shader = " precision mediump float; uniform vec4 uClippingPlane; varying vec4 vFrontColor; varying vec4 vBackColor; varying vec3 vPosition; varying float vDiscard; void main(void) { if ( vDiscard > 0.001) discard; if (length(uClippingPlane) > 0.001) { vec4 p = uClippingPlane; vec3 x = vPosition; float distance = (dot(p.xyz, x) + p.w) / length(p.xyz); if (distance < 0.0){ discard; } } gl_FragColor = gl_FrontFacing ? vFrontColor : vBackColor; }";
    result.vertex_shader = " attribute highp float aVertexIndex; attribute highp float aTransformationIndex; attribute highp float aStyleIndex; attribute highp float aProduct; attribute highp vec2 aState; attribute highp vec2 aNormal; uniform mat4 uMVMatrix; uniform mat4 uPMatrix; uniform vec4 ulightA; uniform vec4 ulightB; uniform vec4 uHighlightColour; uniform float uMeter; uniform bool uColorCoding; uniform int uRenderingMode; uniform highp sampler2D uVertexSampler; uniform int uVertexTextureSize; uniform highp sampler2D uMatrixSampler; uniform int uMatrixTextureSize; uniform highp sampler2D uStyleSampler; uniform int uStyleTextureSize; uniform highp sampler2D uStateStyleSampler; varying vec4 vFrontColor; varying vec4 vBackColor; varying vec3 vPosition; varying float vDiscard; vec3 getNormal(){ float U = aNormal[0]; float V = aNormal[1]; float PI = 3.1415926535897932384626433832795; float lon = U / 252.0 * 2.0 * PI; float lat = V / 252.0 * PI; float x = sin(lon) * sin(lat); float z = cos(lon) * sin(lat); float y = cos(lat); return normalize(vec3(x, y, z)); } vec4 getIdColor(){ float product = floor(aProduct + 0.5); float B = floor (product/(256.0*256.0)); float G = floor((product  - B * 256.0*256.0)/256.0); float R = mod(product, 256.0); return vec4(R/255.0, G/255.0, B/255.0, 1.0); } vec2 getTextureCoordinates(int index, int size) { float x = float(index - (index / size) * size); float y = float(index / size); float pixelSize = 1.0 / float(size); return vec2((x + 0.5) * pixelSize, (y + 0.5) * pixelSize); } vec4 getColor(){ if (uRenderingMode == 2){ return vec4(0.0, 0.0, 0.3, 0.5); } int restyle = int(floor(aState[1] + 0.5)); if (restyle > 224){ int index = int (floor(aStyleIndex + 0.5)); vec2 coords = getTextureCoordinates(index, uStyleTextureSize); return texture2D(uStyleSampler, coords); } vec2 coords = getTextureCoordinates(restyle, 15); return texture2D(uStateStyleSampler, coords); } vec3 getVertexPosition(){ int index = int (floor(aVertexIndex +0.5)); vec2 coords = getTextureCoordinates(index, uVertexTextureSize); vec3 point = vec3(texture2D(uVertexSampler, coords)); int tIndex = int(floor(aTransformationIndex + 0.5)); if (tIndex != 65535) { tIndex *=4; mat4 transform = mat4( texture2D(uMatrixSampler, getTextureCoordinates(tIndex, uMatrixTextureSize)), texture2D(uMatrixSampler, getTextureCoordinates(tIndex+1, uMatrixTextureSize)), texture2D(uMatrixSampler, getTextureCoordinates(tIndex+2, uMatrixTextureSize)), texture2D(uMatrixSampler, getTextureCoordinates(tIndex+3, uMatrixTextureSize)) ); return vec3(transform * vec4(point, 1.0)); } return point; } void main(void) { vec3 vertex = getVertexPosition(); vec3 normal = getNormal(); vec3 backNormal = normal * -1.0; int state = int(floor(aState[0] + 0.5)); int restyle = int(floor(aState[1] + 0.5)); if (state == 254 || (uRenderingMode == 1 && !(state == 253 || state == 252)) || (uRenderingMode == 2 && (state == 253 || state == 252))) { vDiscard = 1.0; return; } else { vDiscard = 0.0; } if (uColorCoding){ vec4 idColor = getIdColor(); vFrontColor = idColor; vBackColor = idColor; } else{ float lightAIntensity = ulightA[3]; vec3 lightADirection = normalize(ulightA.xyz - vertex); float lightBIntensity = ulightB[3]; vec3 lightBDirection = normalize(ulightB.xyz - vertex); float lightWeightA = max(dot(normal, lightADirection ) * lightAIntensity, 0.0); float lightWeightB = max(dot(normal, lightBDirection ) * lightBIntensity, 0.0); float backLightWeightA = max(dot(backNormal, lightADirection) * lightAIntensity, 0.0); float backLightWeightB = max(dot(backNormal, lightBDirection) * lightBIntensity, 0.0); float lightWeighting = lightWeightA + lightWeightB + 0.4; float backLightWeighting = backLightWeightA + backLightWeightB + 0.4; vec4 baseColor = state == 253 ? uHighlightColour : getColor(); if (baseColor.a < 0.98 && uRenderingMode == 0) { mat4 transpose = mat4(1); vec3 trans = -0.002 * uMeter * normalize(normal); transpose[3] = vec4(trans,1.0); vertex = vec3(transpose * vec4(vertex, 1.0)); } vFrontColor = vec4(baseColor.rgb * lightWeighting, baseColor.a); vBackColor = vec4(baseColor.rgb * backLightWeighting, baseColor.a); } vPosition = vertex; gl_Position = uPMatrix * uMVMatrix * vec4(vertex, 1.0); }";
    result.vertex_shader_noFPT = " attribute highp float aVertexIndex; attribute highp float aTransformationIndex; attribute highp float aStyleIndex; attribute highp float aProduct; attribute highp float aState; attribute highp vec2 aNormal; uniform mat4 uMVMatrix; uniform mat4 uPMatrix; uniform vec4 ulightA; uniform vec4 ulightB; uniform bool uColorCoding; uniform bool uFloatingPoint; uniform highp sampler2D uVertexSampler; uniform int uVertexTextureSize; uniform highp sampler2D uMatrixSampler; uniform int uMatrixTextureSize; uniform highp sampler2D uStyleSampler; uniform int uStyleTextureSize; uniform highp sampler2D uStateStyleSampler; int stateStyleTextureSize = 15; varying vec4 vColor; varying vec3 vPosition; vec3 getNormal(){ float U = aNormal[0]; float V = aNormal[1]; float PI = 3.1415926535897932384626433832795; float u = ((U / 252.0) * (2.0 * PI)) - PI; float v = ((V / 252.0) * (2.0 * PI)) - PI; float x = sin(v) * cos(u); float y = sin(v) * sin(u); float z = cos(v); return normalize(vec3(x, y, z)); } vec4 getIdColor(){ float R = mod(aProduct, 256.0) / 255.0; float G = floor(aProduct/256.0) / 255.0; float B = floor (aProduct/(256.0*256.0)) / 255.0; return vec4(R, G, B, 1.0); } vec2 getVertexTextureCoordinates(int index, int size) { float x = float(index - (index / size) * size); float y = float(index / size); float pixelSize = 1.0 / float(size); return vec2((x + 0.5) * pixelSize, (y + 0.5) * pixelSize); } int getByteFromScale(float base) { float result = base * 255.0; int correction = fract(result) >= 0.5 ? 1 : 0; return int(result) + correction; } ivec4 getPixel(int index, sampler2D sampler, int size) { vec2 coords = getVertexTextureCoordinates(index, size); vec4 pixel = texture2D(sampler, coords); return ivec4( getByteFromScale(pixel.r), getByteFromScale(pixel.g), getByteFromScale(pixel.b), getByteFromScale(pixel.a) ); } void getBits(ivec4 pixel, out int result[32]) { for (int i = 0; i < 4; i++) { int actualByte = pixel[i]; for (int j = 0; j < 8; j++) { result[31 - (j + i * 8)] =  actualByte - (actualByte / 2) * 2; actualByte /= 2; } } } float getFloatFromPixel(ivec4 pixel) { int bits[32]; getBits(pixel, bits); float sign =  bits[0] == 0 ? 1.0 : -1.0; highp float fraction = 1.0; highp float exponent = 0.0; for (int i = 1; i < 9; i++) { exponent += float(bits[9 - i]) * exp2(float (i - 1)); } exponent -= 127.0; for (int i = 9; i < 32; i++) { fraction += float(bits[i]) * exp2(float((-1)*(i-8))); } return sign * fraction * exp2(exponent); } float getFloatFromPixel(int index, sampler2D sampler, int size) { ivec4 pixel = getPixel(index, sampler, size); return getFloatFromPixel(pixel); } vec4 getColor(){ if (floor(aState + 0.5) == 0.0){ int index = int (floor(aStyleIndex + 0.5)); vec2 coords = getVertexTextureCoordinates(index, uStyleTextureSize); return texture2D(uStyleSampler, coords); } else{ return vec4(1.0,1.0,1.0,1.0); } } vec3 getVertexPosition(){ int index = int (floor(aVertexIndex +0.5))* 3; vec3 position = vec3( getFloatFromPixel(index, uVertexSampler, uVertexTextureSize), getFloatFromPixel(index + 1, uVertexSampler, uVertexTextureSize), getFloatFromPixel(index + 2, uVertexSampler, uVertexTextureSize) ); int tIndex = int(floor(aTransformationIndex + 0.5)); if (tIndex != 65535) { tIndex *= 16; mat4 transform = mat4( getFloatFromPixel(tIndex + 0, uMatrixSampler, uMatrixTextureSize), getFloatFromPixel(tIndex + 1, uMatrixSampler, uMatrixTextureSize), getFloatFromPixel(tIndex + 2, uMatrixSampler, uMatrixTextureSize), getFloatFromPixel(tIndex + 3, uMatrixSampler, uMatrixTextureSize), getFloatFromPixel(tIndex + 4, uMatrixSampler, uMatrixTextureSize), getFloatFromPixel(tIndex + 5, uMatrixSampler, uMatrixTextureSize), getFloatFromPixel(tIndex + 6, uMatrixSampler, uMatrixTextureSize), getFloatFromPixel(tIndex + 7, uMatrixSampler, uMatrixTextureSize), getFloatFromPixel(tIndex + 8, uMatrixSampler, uMatrixTextureSize), getFloatFromPixel(tIndex + 9, uMatrixSampler, uMatrixTextureSize), getFloatFromPixel(tIndex + 10, uMatrixSampler, uMatrixTextureSize), getFloatFromPixel(tIndex + 11, uMatrixSampler, uMatrixTextureSize), getFloatFromPixel(tIndex + 12, uMatrixSampler, uMatrixTextureSize), getFloatFromPixel(tIndex + 13, uMatrixSampler, uMatrixTextureSize), getFloatFromPixel(tIndex + 14, uMatrixSampler, uMatrixTextureSize), getFloatFromPixel(tIndex + 15, uMatrixSampler, uMatrixTextureSize) ); vec4 transformedPosition = transform * vec4(position, 1.0); return vec3(transformedPosition); } return position; } void main(void) { vec3 vertex = getVertexPosition(); vPosition = vertex; gl_Position = uPMatrix * uMVMatrix * vec4(vertex, 1.0); if (uColorCoding){ vColor = getIdColor(); } else{ vec3 normal = getNormal(); float lightAIntensity = ulightA[3]; vec3 lightADirection = normalize(ulightA.xyz - vPosition); float lightBIntensity = ulightB[3]; vec3 lightBDirection = normalize(ulightB.xyz - vPosition); float lightWeightA = max(dot(normal, lightADirection ) * lightAIntensity, 0.0); float lightWeightB = max(dot(normal, lightBDirection ) * lightBIntensity, 0.0); float lightWeighting = lightWeightA + lightWeightB + 0.4; vec4 baseColor = getColor(); vColor = vec4(baseColor.rgb * lightWeighting, baseColor.a); } }";
    return result;
}
