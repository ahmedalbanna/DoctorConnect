import { DoctorProfileDisplay } from '@/components/features/profiles/DoctorProfileDisplay';
import type { Doctor, Review } from '@/types';
import { notFound } from 'next/navigation';

// Mock data - in a real app, this would come from a database/API
const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Alice Smith',
    specialization: 'Cardiology',
    experience: 15,
    bio: 'Dr. Alice Smith is a board-certified cardiologist with over 15 years of experience in diagnosing and treating a wide range of cardiovascular diseases. She is known for her compassionate patient care and commitment to utilizing the latest advancements in cardiac medicine. Dr. Smith is an advocate for preventative heart health and works closely with her patients to develop personalized treatment plans.',
    profilePictureUrl: 'https://placehold.co/400x400.png',
    availability: [
      { day: 'Monday', slots: ['09:00 AM', '10:00 AM', '02:00 PM'] },
      { day: 'Wednesday', slots: ['11:00 AM', '12:00 PM'] },
      { day: 'Friday', slots: ['09:00 AM', '03:00 PM'] },
    ],
    averageRating: 4.8,
    reviewsCount: 120,
    email: "alice.smith@clinic.com",
    phone: "555-0101"
  },
  {
    id: '2',
    name: 'Dr. Bob Johnson',
    specialization: 'Pediatrics',
    experience: 10,
    bio: 'Dr. Bob Johnson is a dedicated pediatrician passionate about childrens health from infancy through adolescence. He believes in a holistic approach to pediatric care, focusing on both physical and emotional well-being. Dr. Johnson is praised by parents for his friendly demeanor and ability to connect with young patients.',
    profilePictureUrl: 'https://placehold.co/400x400.png',
    availability: [
      { day: 'Tuesday', slots: ['10:00 AM', '11:00 AM', '03:00 PM', '04:00 PM'] },
      { day: 'Thursday', slots: ['09:00 AM', '10:00 AM'] },
    ],
    averageRating: 4.9,
    reviewsCount: 95,
    email: "bob.johnson@clinic.com",
    phone: "555-0102"
  },
   {
    id: '3',
    name: 'Dr. Carol Williams',
    specialization: 'Dermatology',
    experience: 8,
    bio: 'Dr. Carol Williams specializes in both medical and cosmetic dermatology. She offers a wide range of services, from treating common skin conditions like acne and eczema to performing advanced cosmetic procedures. Dr. Williams is committed to helping her patients achieve and maintain healthy, radiant skin.',
    profilePictureUrl: 'https://placehold.co/400x400.png',
    availability: [
      { day: 'Monday', slots: ['01:00 PM', '02:00 PM'] },
      { day: 'Wednesday', slots: ['09:00 AM', '10:00 AM', '11:00 AM'] },
      { day: 'Friday', slots: ['02:00 PM'] },
    ],
    averageRating: 4.7,
    reviewsCount: 78,
    email: "carol.williams@clinic.com",
    phone: "555-0103"
  },
   {
    id: '4',
    name: 'Dr. David Brown',
    specialization: 'Orthopedics',
    experience: 12,
    bio: 'Dr. David Brown is an orthopedic surgeon with expertise in sports medicine and joint replacement. He is dedicated to helping patients regain mobility and improve their quality of life through both surgical and non-surgical treatments. Dr. Brown is also involved in research to advance orthopedic care.',
    profilePictureUrl: 'https://placehold.co/400x400.png',
    availability: [
      { day: 'Tuesday', slots: ['08:00 AM', '09:00 AM'] },
      { day: 'Thursday', slots: ['01:00 PM', '02:00 PM', '03:00 PM'] },
    ],
    averageRating: 4.6,
    reviewsCount: 102,
    email: "david.brown@clinic.com",
    phone: "555-0104"
  },
];

const mockReviews: Review[] = [
    { id: 'r1', doctorId: '1', patientId: 'p1', patientName: 'Jane Doe', rating: 5, comment: 'Dr. Smith was fantastic! Very knowledgeable and caring.', date: '2023-10-15' },
    { id: 'r2', doctorId: '1', patientId: 'p2', patientName: 'John Q.', rating: 4, comment: 'Good experience overall. Wait time was a bit long.', date: '2023-10-20' },
    { id: 'r3', doctorId: '2', patientId: 'p3', patientName: 'Sarah K.', rating: 5, comment: 'Dr. Johnson is great with kids. Highly recommend!', date: '2023-11-01' },
    { id: 'r4', doctorId: '3', patientId: 'p4', patientName: 'Mike L.', rating: 5, comment: 'Very happy with the results from Dr. Williams.', date: '2023-09-05' },
];

async function getDoctorData(id: string): Promise<{ doctor: Doctor | undefined; reviews: Review[] }> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
  const doctor = mockDoctors.find(d => d.id === id);
  const reviews = mockReviews.filter(r => r.doctorId === id);
  return { doctor, reviews };
}

interface DoctorPageProps {
  params: { id: string };
}

export default async function DoctorPage({ params }: DoctorPageProps) {
  const { doctor, reviews } = await getDoctorData(params.id);

  if (!doctor) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <DoctorProfileDisplay doctor={doctor} reviews={reviews} />
    </div>
  );
}

// Optional: Generate static paths if you know all doctor IDs at build time
// export async function generateStaticParams() {
//   return mockDoctors.map(doctor => ({
//     id: doctor.id,
//   }));
// }
