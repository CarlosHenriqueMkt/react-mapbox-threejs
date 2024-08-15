import { useEffect, useRef, useState } from "react";
import {
	EffectComposer,
	Bloom,
	TiltShift2,
	N8AO,
	SMAA,
	FXAA,
	ToneMapping,
} from "@react-three/postprocessing";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { SMAAPreset } from "postprocessing";
import { easing } from "maath";
import SketchPass from "./CustomPasses/SketchPass";
import { useSnapshot } from "valtio";
import { floorState } from "../../store/floorState";

export default function Effects({ isEffectsOff }) {
	const { set, gl, setFrameloop, setDpr } = useThree();
	const { qualitySettings, renderMode } = useSnapshot(floorState);

	const aoRef = useRef();
	const composerRef = useRef();
	const bloomRef = useRef();
	const [effectsState, setEffectsState] = useState(true);

	const [shouldRenderSketchPass, setShouldRenderSketchPass] = useState(
		renderMode === "sketch"
	);

	useEffect(() => {
		setFrameloop("always");
		const timeout = setTimeout(() => {
			setFrameloop("demand");
		}, 2000);
		return () => {
			clearTimeout(timeout);
		};
	}, [effectsState]);

	useEffect(() => {
		setShouldRenderSketchPass(renderMode === "sketch");
	}, [renderMode]);

	useEffect(() => {
		setEffectsState(qualitySettings === "maximum");
	}, [qualitySettings]);

	useFrame((state, delta) => {
		aoRef.current.configuration.renderMode =
			state.performance.current < 1 ? 2 : 0;

		easing.damp(
			aoRef.current.configuration,
			"intensity",
			state.performance.current < 1 ? 0 : 1.5,
			0.9,
			delta
		);

		easing.damp(
			bloomRef.current,
			"intensity",
			state.performance.current < 1 ? 0 : 0.85,
			0.6,
			delta
		);
	});

	return (
		<EffectComposer
			ref={composerRef}
			multisampling={0}
			disableNormalPass
			stencilBuffer={false}
			autoClear={false}
			enabled={effectsState}
		>
			<SMAA edgeDetectionMode={1} preset={SMAAPreset.ULTRA} />
			<N8AO
				aoRadius={50.25}
				intensity={1}
				halfRes
				screenSpaceRadius={true}
				distanceFalloff={1.5}
				quality="performance"
				ref={aoRef}
			/>

			<Bloom
				luminanceThreshold={0.89}
				intensity={0.3}
				levels={9}
				// radius={1}
				mipmapBlur
				ref={bloomRef}
				luminanceSmoothing={0.8}
			/>

			<TiltShift2 taper={1.3} blur={0.25} />

			<ToneMapping mode={1} />
			{shouldRenderSketchPass && <SketchPass />}
		</EffectComposer>
	);
}
