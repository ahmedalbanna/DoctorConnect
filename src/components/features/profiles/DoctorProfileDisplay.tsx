import type { Doctor, Review } from '@/types';
import Image from 'next/image';
import { Star, BriefcaseMedical, CalendarDays, Award, MessageSquare, Users, MapPin, Phone, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AddReviewForm } from '@/components/features/reviews/AddReviewForm';
import { ReviewCard } from '@/components/features/reviews/ReviewCard';
import { BookingCalendar } from '@/components/features/appointments/BookingCalendar';


interface DoctorProfileDisplayProps {
  doctor: Doctor;
  reviews: Review[]; // Pass reviews for this doctor
}

export function DoctorProfileDisplay({ doctor, reviews }: DoctorProfileDisplayProps) {
  return (
    <div className="space-y-10">
      {/* Profile Header */}
      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-0 md:p-8 md:flex md:gap-8 items-start">
          <div className="md:w-1/3 relative">
            <Image
              src={doctor.profilePictureUrl || `https://placehold.co/400x400.png?text=${doctor.name.split(' ')[0]}`}
              alt={doctor.name}
              width={400}
              height={400}
              className="w-full h-auto md:rounded-lg object-cover"
              data-ai-hint="doctor portrait professional"
            />
          </div>
          <div className="md:w-2/3 p-6 md:p-0">
            <h1 className="text-4xl font-bold font-headline text-primary mb-2">{doctor.name}</h1>
            <p className="text-xl text-foreground mb-1">{doctor.specialization}</p>
            <div className="flex items-center text-amber-500 mb-4">
              {doctor.averageRating ? (
                <>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-6 h-6 ${i < Math.round(doctor.averageRating || 0) ? 'fill-current' : 'text-muted-foreground opacity-50'}`} />
                  ))}
                  <span className="ml-2 text-lg text-foreground">({doctor.averageRating.toFixed(1)} from {doctor.reviewsCount || 0} reviews)</span>
                </>
              ) : (
                <span className="text-muted-foreground">No reviews yet</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="text-sm py-1 px-3"><BriefcaseMedical className="w-4 h-4 mr-1.5" /> {doctor.experience} yrs experience</Badge>
              {/* Example badges - replace with real data */}
              <Badge variant="secondary" className="text-sm py-1 px-3"><Award className="w-4 h-4 mr-1.5" /> Board Certified</Badge>
              <Badge variant="secondary" className="text-sm py-1 px-3"><MessageSquare className="w-4 h-4 mr-1.5" /> Speaks English, Spanish</Badge>
            </div>
            <p className="text-muted-foreground leading-relaxed">{doctor.bio}</p>
            
            <div className="mt-6 space-y-2 text-sm text-foreground">
              {doctor.email && <p className="flex items-center"><Mail className="w-4 h-4 mr-2 text-primary" /> {doctor.email}</p>}
              {doctor.phone && <p className="flex items-center"><Phone className="w-4 h-4 mr-2 text-primary" /> {doctor.phone}</p>}
              {/* Add location if available */}
              {/* <p className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-primary" /> 123 Health St, MedCity</p> */}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">About Dr. {doctor.name.split(' ').pop()}</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground">
          <p>{doctor.bio || "No detailed biography provided."}</p>
          {/* Add more sections like Education, Certifications, etc. */}
          <h3 className="font-semibold text-foreground mt-4">Specializations</h3>
          <ul>
            <li>{doctor.specialization}</li>
            {/* List more if applicable */}
          </ul>
           <h3 className="font-semibold text-foreground mt-4">Experience</h3>
          <p>{doctor.experience} years in practice.</p>
        </CardContent>
      </Card>

      {/* Appointment Booking Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center">
            <CalendarDays className="w-7 h-7 mr-3 text-primary" /> Book an Appointment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BookingCalendar availability={doctor.availability} doctorId={doctor.id} />
        </CardContent>
      </Card>

      {/* Reviews Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center">
            <Star className="w-7 h-7 mr-3 text-primary" /> Patient Reviews & Ratings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 font-headline">Leave a Review</h3>
            <AddReviewForm doctorId={doctor.id} />
          </div>
          <Separator className="my-8" />
          <div>
            <h3 className="text-xl font-semibold mb-6 font-headline">What Patients Are Saying ({reviews.length})</h3>
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No reviews yet for Dr. {doctor.name.split(' ').pop()}. Be the first to share your experience!</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
