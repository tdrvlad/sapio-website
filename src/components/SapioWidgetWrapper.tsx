"use client";

import { SapioWidget } from 'sapio-widget';

interface SapioWidgetWrapperProps {
  apiKey: string;
}

export function SapioWidgetWrapper({ apiKey }: SapioWidgetWrapperProps) {
  return <SapioWidget apiKey={apiKey} />;
}
