// SSR Debug utilities
export function isServerSide(): boolean {
  return typeof window === 'undefined';
}

export function logSSR(message: string, data?: any): void {
  if (isServerSide()) {
    console.log(`[SSR-SERVER] ${message}`, data ? data : '');
  } else {
    console.log(`[SSR-CLIENT] ${message}`, data ? data : '');
  }
}

export function logSSRTiming(label: string): void {
  if (isServerSide()) {
    console.time(`[SSR-TIMING] ${label}`);
  }
}

export function logSSRTimingEnd(label: string): void {
  if (isServerSide()) {
    console.timeEnd(`[SSR-TIMING] ${label}`);
  }
}
