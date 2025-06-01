import { DoctorCard } from '@/components/features/doctors/DoctorCard';
import type { Doctor } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

// Mock data for doctors
const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Alice Smith',
    specialization: 'Cardiology',
    experience: 15,
    bio: 'Dedicated cardiologist with extensive experience in treating heart conditions. Passionate about patient education and preventative care.',
    profilePictureUrl: 'https://placehold.co/300x300.png',
    availability: [{ day: 'Monday', slots: ['09:00-10:00'] }],
    averageRating: 4.8,
    reviewsCount: 120,
  },
  {
    id: '2',
    name: 'Dr. Bob Johnson',
    specialization: 'Pediatrics',
    experience: 10,
    bio: 'Friendly and experienced pediatrician committed to providing comprehensive care for children of all ages.',
    profilePictureUrl: 'https://placehold.co/300x300.png',
    availability: [{ day: 'Tuesday', slots: ['14:00-15:00'] }],
    averageRating: 4.9,
    reviewsCount: 95,
  },
  {
    id: '3',
    name: 'Dr. Carol Williams',
    specialization: 'Dermatology',
    experience: 8,
    bio: 'Specializing in medical and cosmetic dermatology. Helping patients achieve healthy, beautiful skin.',
    profilePictureUrl: 'https://placehold.co/300x300.png',
    availability: [{ day: 'Wednesday', slots: ['11:00-12:00'] }],
    averageRating: 4.7,
    reviewsCount: 78,
  },
   {
    id: '4',
    name: 'Dr. David Brown',
    specialization: 'Orthopedics',
    experience: 12,
    bio: 'Expert in musculoskeletal conditions, sports injuries, and joint replacement surgeries.',
    profilePictureUrl: 'https://placehold.co/300x300.png',
    availability: [{ day: 'Thursday', slots: ['16:00-17:00'] }],
    averageRating: 4.6,
    reviewsCount: 102,
  },
];

export default function DoctorsPage() {
  // TODO: Implement actual search and filtering logic
  // For now, this is just a placeholder UI

  return (
    <div className="container mx-auto py-12 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Find Your Doctor</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse through our list of qualified medical professionals. Filter by specialty, location, or availability to find the perfect match for your needs.
        </p>
      </header>

      {/* Search and Filter Bar */}
      <div className="mb-10 p-6 bg-card rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="lg:col-span-2">
            <label htmlFor="search-doctor" className="block text-sm font-medium text-foreground mb-1">
              Search by Name or Keyword
            </label>
            <div className="relative">
              <Input id="search-doctor" type="text" placeholder="e.g., Dr. Smith, Cardiology" className="pl-10" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div>
            <label htmlFor="filter-specialty" className="block text-sm font-medium text-foreground mb-1">
              Specialty
            </label>
            <Select>
              <SelectTrigger id="filter-specialty">
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="pediatrics">Pediatrics</SelectItem>
                <SelectItem value="dermatology">Dermatology</SelectItem>
                <SelectItem value="orthopedics">Orthopedics</SelectItem>
                {/* Add more specialties */}
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
            <Filter className="mr-2 h-5 w-5" /> Apply Filters
          </Button>
        </div>
      </div>

      {/* Doctors Grid */}
      {mockDoctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {mockDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No doctors found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
