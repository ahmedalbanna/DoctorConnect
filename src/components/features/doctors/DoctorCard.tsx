import type { Doctor } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Star, MapPin, BriefcaseMedical, CheckCircle } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <CardHeader className="p-0 relative">
        <Image
          src={doctor.profilePictureUrl || `https://placehold.co/600x400.png?text=${doctor.name.split(' ')[0]}`}
          alt={doctor.name}
          width={600}
          height={400}
          className="w-full h-48 object-cover"
          data-ai-hint="doctor portrait"
        />
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-2xl mb-2 font-headline text-primary">{doctor.name}</CardTitle>
        <CardDescription className="text-lg text-foreground mb-1">{doctor.specialization}</CardDescription>
        <p className="text-sm text-muted-foreground mb-3">{doctor.experience} years of experience</p>
        
        <div className="flex items-center text-sm text-amber-500 mb-3">
          {doctor.averageRating ? (
            <>
              <Star className="w-5 h-5 fill-current mr-1" /> 
              <span>{doctor.averageRating.toFixed(1)} ({doctor.reviewsCount || 0} reviews)</span>
            </>
          ) : (
            <span className="text-muted-foreground">No reviews yet</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">{doctor.bio}</p>
      </CardContent>
      <CardFooter className="p-6 border-t border-border">
        <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href={`/doctors/${doctor.id}`}>View Profile & Book</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
