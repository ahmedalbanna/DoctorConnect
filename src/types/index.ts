export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number; // years
  bio: string;
  email: string;
  phone?: string;
  profilePictureUrl?: string;
  availability: { day: string, slots: string[] }[]; // Example: { day: "Monday", slots: ["09:00-10:00", "10:00-11:00"] }
  averageRating?: number;
  reviewsCount?: number;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  medicalHistory?: string; // Simplified
  profilePictureUrl?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string; // ISO string or Date object
  time: string; // e.g., "10:00 AM"
  status: 'scheduled' | 'completed' | 'cancelled';
  consultationType: 'virtual' | 'in-person'; // Example
  notes?: string;
}

export interface Review {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO string or Date object
}
