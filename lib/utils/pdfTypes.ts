export interface DrawingPayload {
  x: number;
  y: number;
  width?: number;
  scale?: number;
}

export interface DrawingObject {
  id: number;
  path: string;
  type: string;
  x: number;
  y: number;
  originWidth: number;
  originHeight: number;
  width: number;
  scale: number;
}

export interface TouchEventDetails {
  x: number;
  y: number;
  target: EventTarget | null;
  currentTarget: HTMLElement | null;
}

export interface TouchMoveData {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

export interface PdfSignatureData {
  top: number;
  left: number;
  width: number;
  height: number;
  page: number;
}
