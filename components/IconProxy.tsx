import React from 'react';
import * as LucideIcons from 'lucide-react';

export const GraduationCap = (props: any) => {
  const C = (LucideIcons as any)['GraduationCap'];
  return C ? <C {...props} /> : null;
};

export default GraduationCap;
