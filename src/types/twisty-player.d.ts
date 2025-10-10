declare global {
  interface TwistyPlayerElement extends HTMLElement {
    alg?: string;
    puzzle?: string;
    controlPanel?: string;
    visualization?: string;
    background?: string;
    experimentalStickering?: string;
    experimentalSetupAlg?: string;
  }

  namespace JSX {
    interface IntrinsicElements {
      "twisty-player": import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<TwistyPlayerElement>,
        TwistyPlayerElement
      >;
    }
  }

  namespace React.JSX {
    interface IntrinsicElements {
      "twisty-player": import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<TwistyPlayerElement>,
        TwistyPlayerElement
      >;
    }
  }
}

export {};
