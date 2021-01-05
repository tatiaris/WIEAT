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
  page: string;
}

export interface PosterProps {
  content: any;
  colorDict: any;
}

export interface InputProps {
  visualizeFunc: any;
  colorUpdateFunc: any;
  colorDict: any;
}

export interface EpisodeProps {
  content: any;
  colorDict: any;
}

export interface InteractionContainerProps {
  interactionParts: any;
  colorDict: any;
}

export interface InteractionPartProps {
  interactions: any;
  colorDict: any;
}
export interface InteractionProps {
  details: any;
  colorDict: any;
}
export interface InputErrMsgProps {
  message: string;
}
export interface DashboardProps {
  data: any;
}
export interface WordCloudProps {
  interactions: any;
}