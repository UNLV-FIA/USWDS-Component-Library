export type MediaCardFormat =
  | 'None'
  | 'MediaWHeader'
  | 'Inset'
  | 'Exdent'
  | 'FlagDefault'
  | 'FlagRightInset';

type BreakPoint =
  | 'mobile'
  | 'mobile-lg'
  | 'tablet'
  | 'tablet-lg'
  | 'desktop'
  | 'desktop-lg'
  | 'widescreen';

type GridCol =
  | 'grid-col-1'
  | 'grid-col-2'
  | 'grid-col-3'
  | 'grid-col-4'
  | 'grid-col-5'
  | 'grid-col-6'
  | 'grid-col-7'
  | 'grid-col-8'
  | 'grid-col-9'
  | 'grid-col-10'
  | 'grid-col-11'
  | 'grid-col-12'
  | 'grid-col-auto'
  | 'grid-col-fill'
  | 'grid-col-fit';

type GridFormat = `${BreakPoint}:${GridCol}`;
export type GridFormats = GridFormat[];
