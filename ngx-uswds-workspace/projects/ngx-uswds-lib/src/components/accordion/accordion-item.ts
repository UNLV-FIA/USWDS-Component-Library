export interface AccordionItem {
  heading: string;
  content: string;
  expandedByDefault?: boolean;
}

export type AccordionVariant = 'borderless' | 'bordered';