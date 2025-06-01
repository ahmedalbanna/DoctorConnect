"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CalendarDays, UserCircle, FileText, Edit3, LogOut } from 'lucide-react';
import type { Patient, Appointment } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock Data
const mockPatient: Patient = {
  id: 'p123',
  name: 'John Patient',
  email: 'john.patient@example.com',
  dateOfBirth: '1985-07-20',
  phone: '555-123-4567',
  medicalHistory: 'Mild asthma, seasonal allergies. No major surgeries. Takes Ventolin as needed.',
  profilePictureUrl: 'https://placehold.co/150x150.png',
};

const mockAppointments: Appointment[] = [
  { id: 'app1', patientId: 'p123', patientName: 'John Patient', doctorId: '1', doctorName: 'Dr. Alice Smith', date: '2024-08-15', time: '10:00 AM', status: 'scheduled', consultationType: 'virtual' },
  { id: 'app2', patientId: 'p123', patientName: 'John Patient', doctorId: '2', doctorName: 'Dr. Bob Johnson', date: '2024-07-22', time: '02:30 PM', status: 'completed', consultationType: 'in-person' },
];


export default function PatientDashboardPage() {
  const [patient, setPatient] = useState<Patient>(mockPatient);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in (mock)
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      router.push('/login');
    }
  }, [router]);


  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, send updated data to backend
    setIsEditingProfile(false);
    // For demo, update state directly
    const formData = new FormData(e.currentTarget);
    setPatient(prev => ({
        ...prev,
        name: formData.get('name') as string || prev.name,
        email: formData.get('email') as string || prev.email,
        phone: formData.get('phone') as string || prev.phone,
        dateOfBirth: formData.get('dateOfBirth') as string || prev.dateOfBirth,
    }));
    alert("Profile updated (mock)");
  };

  const handleMedicalHistoryUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setPatient(prev => ({
        ...prev,
        medicalHistory: formData.get('medicalHistory') as string || prev.medicalHistory
    }));
    alert("Medical history updated (mock)");
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <header className="mb-10">
        <h1 className="text-4xl font-bold font-headline">Patient Dashboard</h1>
        <p className="text-muted-foreground">Manage your profile, appointments, and health information.</p>
      </header>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6">
          <TabsTrigger value="profile" className="py-3 text-base">
            <UserCircle className="mr-2 h-5 w-5 text-primary" /> My Profile
          </TabsTrigger>
          <TabsTrigger value="appointments" className="py-3 text-base">
            <CalendarDays className="mr-2 h-5 w-5 text-primary" /> Appointments
          </TabsTrigger>
          <TabsTrigger value="medical-history" className="py-3 text-base">
            <FileText className="mr-2 h-5 w-5 text-primary" /> Medical History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-headline">Your Profile</CardTitle>
                <CardDescription>View and update your personal information.</CardDescription>
              </div>
              <Button variant="outline" onClick={() => setIsEditingProfile(!isEditingProfile)} className="text-primary border-primary hover:bg-primary/10">
                <Edit3 className="mr-2 h-4 w-4" /> {isEditingProfile ? 'Cancel' : 'Edit Profile'}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6 mb-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={patient.profilePictureUrl} alt={patient.name} data-ai-hint="person avatar" />
                  <AvatarFallback>{patient.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-semibold">{patient.name}</h2>
                  <p className="text-muted-foreground">{patient.email}</p>
                </div>
              </div>
              
              {isEditingProfile ? (
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" defaultValue={patient.name} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" defaultValue={patient.email} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" defaultValue={patient.phone} />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input id="dateOfBirth" name="dateOfBirth" type="date" defaultValue={patient.dateOfBirth} />
                  </div>
                  <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <p><strong className="text-foreground">Full Name:</strong> {patient.name}</p>
                  <p><strong className="text-foreground">Email:</strong> {patient.email}</p>
                  <p><strong className="text-foreground">Phone:</strong> {patient.phone || 'N/A'}</p>
                  <p><strong className="text-foreground">Date of Birth:</strong> {patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Your Appointments</CardTitle>
              <CardDescription>View your upcoming and past appointments.</CardDescription>
            </CardHeader>
            <CardContent>
              {appointments.length > 0 ? (
                <ul className="space-y-4">
                  {appointments.map(app => (
                    <li key={app.id} className="p-4 border rounded-lg bg-secondary/30">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">With {app.doctorName}</h3>
                          <p className="text-sm text-muted-foreground">{new Date(app.date).toLocaleDateString()} at {app.time}</p>
                        </div>
                        <Badge variant={app.status === 'scheduled' ? 'default' : app.status === 'completed' ? 'secondary' : 'destructive'}
                          className={app.status === 'scheduled' ? 'bg-green-500 text-white' : ''}
                        >
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm mt-1">Type: {app.consultationType}</p>
                      {app.status === 'scheduled' && (
                        <div className="mt-2 space-x-2">
                          <Button size="sm" variant="outline" className="text-primary border-primary hover:bg-primary/10">Reschedule</Button>
                          <Button size="sm" variant="destructive">Cancel</Button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">You have no appointments scheduled.</p>
              )}
              <Button asChild className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/doctors">Book New Appointment</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical-history">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Medical History</CardTitle>
              <CardDescription>Update and review your medical information.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleMedicalHistoryUpdate} className="space-y-4">
                <div>
                  <Label htmlFor="medicalHistory">Summary</Label>
                  <Textarea id="medicalHistory" name="medicalHistory" rows={8} defaultValue={patient.medicalHistory} className="mt-1" />
                </div>
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">Save Medical History</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
