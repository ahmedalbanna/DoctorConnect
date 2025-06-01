import Link from 'next/link';
import { Stethoscope } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
      <Stethoscope className="h-8 w-8" />
      <span className="text-2xl font-bold font-headline text-foreground">DoctorConnect</span>
    </Link>
  );
}
