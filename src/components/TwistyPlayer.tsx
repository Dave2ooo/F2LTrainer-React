import React, { useCallback, useEffect, useImperativeHandle, useRef } from "react";
// Importing registers the custom element globally
import "cubing/twisty";

/**
 * Public props for the React wrapper (camelCase & typed).
 * We'll map these to the underlying web component's properties.
 */
type ControlPanelOption = "auto" | "bottom-row" | "none";

interface TwistyPlayerProps {
  alg?: string;
  puzzle?: string;
  controlPanel?: ControlPanelOption;
  visualization?: string;
  background?: string;
  className?: string;
  style?: React.CSSProperties;
  experimentalStickering?: string;
  experimentalSetupAlg?: string;
}


/** Methods you might want to call imperatively via ref. */
export type TwistyPlayerHandle = {
  /** Get the underlying <twisty-player> element for advanced use. */
  getElement: () => TwistyPlayerElement | null;
};

const TwistyPlayer = React.forwardRef<TwistyPlayerHandle, TwistyPlayerProps>(
  (
    {
      alg,
      puzzle = "3x3x3",
      controlPanel = "auto",
      visualization,
      background,
      experimentalStickering,
      experimentalSetupAlg,
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

    // Keep web-component properties in sync with React props.
    useEffect(() => {
      const el = elRef.current;
      if (!el) return;
      if (alg !== undefined) el.alg = alg;
      if (puzzle !== undefined) el.puzzle = puzzle;
      if (controlPanel !== undefined) el.controlPanel = controlPanel;
      if (visualization !== undefined) el.visualization = visualization;
      if (background !== undefined) el.background = background;
      if (experimentalStickering !== undefined) el.experimentalStickering = experimentalStickering;
      if (experimentalSetupAlg !== undefined) el.experimentalSetupAlg = experimentalSetupAlg;
    }, [alg, puzzle, controlPanel, visualization, background, experimentalStickering, experimentalSetupAlg]);

    return (
      <twisty-player
        ref={handleElementRef}
        className={className}
        style={style}
      />
    );
  }
);

TwistyPlayer.displayName = "TwistyPlayer";
export default TwistyPlayer;
