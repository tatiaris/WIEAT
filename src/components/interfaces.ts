export interface MyComponentProps {
  info: MyComponentInfo;
}

export interface MyComponentInfo {
  name: string;
  age?: number;
}

export interface MheaderProps {
  title: string;
}

export interface MnavbarProps {
  theme: "light" | "dark";
}

export interface PosterProps {
  content: any;
}

export interface InputProps {
  visualizeFunc: any;
}

export interface EpisodeProps {
  content: any;
}

export interface InteractionContainerProps {
  interactionParts: any;
}

export interface InteractionPartProps {
  interactions: any;
}
export interface InteractionProps {
  details: any;
}
