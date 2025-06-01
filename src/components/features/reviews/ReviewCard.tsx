import type { Review } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { format } from 'date-fns';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const patientInitials = review.patientName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="bg-secondary/50 shadow">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <Avatar>
          {/* In a real app, you might have patient profile pictures */}
          <AvatarImage src={`https://placehold.co/40x40.png?text=${patientInitials}`} alt={review.patientName} data-ai-hint="person avatar" />
          <AvatarFallback>{patientInitials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-foreground">{review.patientName}</p>
          <p className="text-xs text-muted-foreground">
            {format(new Date(review.date), 'MMMM d, yyyy')}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground opacity-50'}`}
            />
          ))}
        </div>
        <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
      </CardContent>
    </Card>
  );
}
