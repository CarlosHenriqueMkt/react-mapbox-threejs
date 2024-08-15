// Custom SketchEffect Created by Anderson Mancini
// All rights reserved
// https://andersonmancini.com
// If you want to use this code, please give credit to Anderson Mancini

import { useFrame, useThree } from '@react-three/fiber'
import { BlendFunction, Effect } from 'postprocessing'
import { useRef, useMemo, useEffect, forwardRef, useLayoutEffect } from 'react'
import { Uniform } from 'three'

const SketchShader = {
  fragmentShader: /* glsl */ `
    uniform float iTime;
    uniform vec2 iResolution;

    vec3 rgbToHsv(vec3 rgb){
        vec3 hsv = vec3(0.);
        float cmax = max(max(rgb.x, rgb.y), rgb.z);
        float delta = cmax - min(min(rgb.x, rgb.y), rgb.z);
        if(delta != 0.){
            if(cmax == rgb.x)
                hsv.x = mod((rgb.y - rgb.z) / delta , 6.);
            if(cmax == rgb.y)
                hsv.x = (rgb.z - rgb.x) / delta + 2.;
            if(cmax == rgb.z)
                hsv.x = (rgb.x - rgb.y) / delta + 4.;
        }
        hsv.x /= 6.;
        if(cmax != 0.)
            hsv.y = delta / cmax;
        hsv.z = cmax;
        return hsv;
    }

    vec3 hsvToRgb(vec3 hsv){
        vec3 rgb = vec3(0.);
        vec3 t = vec3(hsv.y * hsv.z, 0., 0.);
        t.y = t.x * (1. - abs(mod(hsv.x * 6., 2.) - 1.));
        switch (int(floor(hsv.x * 6.))){
        case 0:
            rgb = t;
            break;
        case 1:
            rgb = t.yxz;
            break;
        case 2:
            rgb = t.zxy;
            break;
        case 3:
            rgb = t.zyx;
            break;
        case 4:
            rgb = t.yzx;
            break;
        case 5:
            rgb = t.xzy;
        }
        rgb += hsv.z - t.x;
        return rgb;
    }

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
      vec3 col = inputColor.xyz;
      float noise = 50.;
      int range = 15;
      for (int i = -range; i <= range; i++) {
          for (int j = -range; j <= range; j++) {
              vec2 offset = vec2(i, j) / iResolution * 0.004;
              float dx = float(i) / iResolution.x;
              float dy = float(j) / iResolution.y;
              vec3 neighborColor = texture2D(inputBuffer, uv + offset).xyz;
              noise += pow(col.x - neighborColor.x, 2.0) + pow(col.y - neighborColor.y, 2.0) + pow(col.z - neighborColor.z, 2.0);
          }
      }
      noise /= float((2 * range + 1) * (2 * range + 1));
      vec3 sketchEffect = 1.0 - (2.0 * vec3(noise)) / vec3(0.25);
      outputColor = vec4(clamp(sketchEffect, 0.0, 1.0), 1.0);
  }
  `,
}

class SketchEffect extends Effect {
  constructor({
    blendFunction = BlendFunction.NORMAL,
    iResolution = [0, 0],
  } = {}) {
    super('SketchEffect', SketchShader.fragmentShader, {
      blendFunction,
      uniforms: new Map([
        ['iTime', new Uniform(0)],
        ['iResolution', new Uniform(iResolution)],
      ]),
    })
  }

  update(renderer, inputBuffer, deltaTime) {
    this.uniforms.get('iTime').value += deltaTime
  }
}

const wrapEffect = (effectImpl, defaultBlendMode = BlendFunction.NORMAL) =>
  forwardRef(({ blendFunction, opacity, ...props }, ref) => {
    const invalidate = useThree((state) => state.invalidate)
    const effect = useMemo(() => new effectImpl(props), [props])

    useLayoutEffect(() => {
      effect.blendMode.blendFunction =
        !blendFunction && blendFunction !== 0 ? defaultBlendMode : blendFunction
      if (opacity !== undefined) effect.blendMode.opacity.value = opacity
      invalidate()
    }, [blendFunction, effect.blendMode, opacity])
    return <primitive object={effect} ref={ref} dispose={null} />
  })

const Sketch = wrapEffect(SketchEffect)

function Effects({ blendFunction = BlendFunction.NORMAL, opacity = 1 }) {
  const sketchRef = useRef()
  const { viewport } = useThree()

  useEffect(() => {
    sketchRef.current.uniforms.get('iResolution').value.x = viewport.width
    sketchRef.current.uniforms.get('iResolution').value.y = viewport.height
  }, [viewport])

  return useMemo(
    () => (
      <Sketch
        ref={sketchRef}
        iResolution={{ x: viewport.width, y: viewport.height }}
        blendFunction={blendFunction}
        opacity={opacity}
      />
    ),
    [blendFunction, viewport.width, viewport.height]
  )
}

export default Effects
