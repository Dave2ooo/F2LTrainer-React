import React, { useCallback, useEffect, useImperativeHandle, useRef } from "react";

let twistyImportPromise: Promise<unknown> | null = null;

const ensureTwistyModule = () => {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (!twistyImportPromise) {
    twistyImportPromise = import("cubing/twisty");
  }

  return twistyImportPromise;
};

interface Props {
  experimentalSetupAlg?: string;
  alg?: string;
  cameraLongitude?: number;
  cameraLatitude?: number;
  experimentalStickering?: string;
  controlPanel?: "auto" | "bottom-row" | "none";
  experimentalDragInput?: "auto" | "none";
  background?: "none" | "checkered" | "checkered-transparent";
  className?: string;
  style?: React.CSSProperties;
}

/** Methods you might want to call imperatively via ref. */
export type TwistyPlayerHandle = {
  /** Get the underlying <twisty-player> element for advanced use. */
  getElement: () => TwistyPlayerElement | null;
};

const TwistyPlayer = React.forwardRef<TwistyPlayerHandle, Props>(
  (
    {
      experimentalSetupAlg = "z2 y'",
      alg,
      cameraLongitude = 25,
      cameraLatitude = 25,
      experimentalStickering = "EDGES:------------,CORNERS:--------,CENTERS:------`;",
      controlPanel = "auto",
      experimentalDragInput = "auto",
      background = "none",
      className,
      style,
    },
    ref
  ) => {
    const elRef = useRef<TwistyPlayerElement | null>(null);

    const handleElementRef = useCallback((node: TwistyPlayerElement | null) => {
      elRef.current = node;
    }, []);

    useImperativeHandle(ref, () => ({
      getElement: () => elRef.current,
    }));

    useEffect(() => {
      void ensureTwistyModule();
    }, []);

    // Keep web-component properties in sync with React props.
    useEffect(() => {
      const el = elRef.current;
      if (!el) return;

      el.puzzle = "3x3x3";
      el.hintFacelets = "none";

      if (experimentalSetupAlg !== undefined) el.experimentalSetupAlg = experimentalSetupAlg;
      if (alg !== undefined) el.alg = alg;
      if (cameraLongitude !== undefined) el.cameraLongitude = cameraLongitude;
      if (cameraLatitude !== undefined) el.cameraLatitude = cameraLatitude;
      if (experimentalStickering !== undefined) el.experimentalStickeringMaskOrbits = experimentalStickering;
      if (controlPanel !== undefined) el.controlPanel = controlPanel;
      if (experimentalDragInput !== undefined) el.experimentalDragInput = experimentalDragInput;
      if (background !== undefined) el.background = background;
      // el.timestamp = 0;
      // el.jumpToStart?.();
      // el.flash?.();
    }, [
      experimentalSetupAlg,
      alg,
      cameraLongitude,
      cameraLatitude,
      experimentalStickering,
      controlPanel,
      experimentalDragInput,
      background,
    ]);

    return <twisty-player ref={handleElementRef} className={className} style={style} />;
  }
);

TwistyPlayer.displayName = "TwistyPlayer";
export default TwistyPlayer;
