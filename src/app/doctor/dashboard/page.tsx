
"use client";

import type { Doctor, Appointment } from '@/types';
import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { User, Briefcase, CalendarClock, Settings, Edit3, Clock, PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';

// Mock Data
const mockDoctorDetails: Doctor = {
  id: 'doc001',
  name: 'Dr. Emily Carter',
  specialization: 'General Medicine',
  experience: 12,
  bio: 'Dr. Emily Carter is a dedicated general practitioner with 12 years of experience providing comprehensive healthcare to patients of all ages. She is passionate about preventative medicine and building long-term relationships with her patients to manage their overall well-being.',
  profilePictureUrl: 'https://placehold.co/150x150.png',
  availability: [
    { day: 'Monday', slots: ['09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM'] },
    { day: 'Wednesday', slots: ['09:00 AM', '11:00 AM'] },
    { day: 'Friday', slots: ['10:00 AM', '02:00 PM'] },
  ],
  averageRating: 4.7,
  reviewsCount: 85,
  email: "emily.carter@clinic.com",
  phone: "555-0201"
};

const mockDoctorAppointments: Appointment[] = [
  { id: 'appDoc1', patientId: 'p123', patientName: 'John Patient', doctorId: 'doc001', doctorName: 'Dr. Emily Carter', date: '2024-08-20', time: '10:00 AM', status: 'scheduled', consultationType: 'virtual' },
  { id: 'appDoc2', patientId: 'p456', patientName: 'Jane Smith', doctorId: 'doc001', doctorName: 'Dr. Emily Carter', date: '2024-08-22', time: '02:30 PM', status: 'scheduled', consultationType: 'in-person' },
  { id: 'appDoc3', patientId: 'p789', patientName: 'Michael Lee', doctorId: 'doc001', doctorName: 'Dr. Emily Carter', date: '2024-07-15', time: '09:00 AM', status: 'completed', consultationType: 'virtual' },
];

type AvailabilitySlot = { day: string; slots: string[] };

export default function DoctorDashboardPage() {
  const [doctor, setDoctor] = useState<Doctor>(mockDoctorDetails);
  const [appointments, setAppointments] = useState<Appointment[]>(mockDoctorAppointments);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [currentAvailability, setCurrentAvailability] = useState<AvailabilitySlot[]>(doctor.availability);
  const [editingSlotDay, setEditingSlotDay] = useState<string | null>(null);
  const [newSlotTime, setNewSlotTime] = useState('');

  const router = useRouter();

  useEffect(() => {
    // Mock auth check - in a real app, verify doctor's session
    if (localStorage.getItem('isLoggedIn') !== 'true' || localStorage.getItem('userRole') !== 'doctor') {
      // router.push('/login'); // Assuming a general login page for all roles
    }
  }, [router]);

  const handleProfileUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditingProfile(false);
    const formData = new FormData(e.currentTarget);
    setDoctor(prev => ({
        ...prev,
        name: formData.get('name') as string || prev.name,
        email: formData.get('email') as string || prev.email,
        phone: formData.get('phone') as string || prev.phone,
        specialization: formData.get('specialization') as string || prev.specialization,
        experience: parseInt(formData.get('experience') as string, 10) || prev.experience,
        bio: formData.get('bio') as string || prev.bio,
    }));
    alert("Doctor profile updated (mock)");
  };

  const handleAddSlot = (day: string) => {
    if (!newSlotTime) return;
    setCurrentAvailability(prev =>
      prev.map(avail =>
        avail.day === day
          ? { ...avail, slots: [...avail.slots, newSlotTime].sort() }
          : avail
      )
    );
    setNewSlotTime('');
    setEditingSlotDay(null);
  };

  const handleRemoveSlot = (day: string, slotToRemove: string) => {
    setCurrentAvailability(prev =>
      prev.map(avail =>
        avail.day === day
          ? { ...avail, slots: avail.slots.filter(slot => slot !== slotToRemove) }
          : avail
      )
    );
  };
  
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


  return (
    <div className="container mx-auto py-10 px-4">
      <header className="mb-10">
        <h1 className="text-4xl font-bold font-headline">Doctor Dashboard</h1>
        <p className="text-muted-foreground">Manage your profile, appointments, and availability.</p>
      </header>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6">
          <TabsTrigger value="profile" className="py-3 text-base">
            <User className="mr-2 h-5 w-5 text-primary" /> My Profile
          </TabsTrigger>
          <TabsTrigger value="appointments" className="py-3 text-base">
            <CalendarClock className="mr-2 h-5 w-5 text-primary" /> Appointments
          </TabsTrigger>
          <TabsTrigger value="availability" className="py-3 text-base">
            <Settings className="mr-2 h-5 w-5 text-primary" /> Availability
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-headline">Your Professional Profile</CardTitle>
                <CardDescription>View and update your professional information.</CardDescription>
              </div>
              <Button variant="outline" onClick={() => setIsEditingProfile(!isEditingProfile)} className="text-primary border-primary hover:bg-primary/10">
                <Edit3 className="mr-2 h-4 w-4" /> {isEditingProfile ? 'Cancel' : 'Edit Profile'}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6 mb-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={doctor.profilePictureUrl} alt={doctor.name} data-ai-hint="doctor avatar" />
                  <AvatarFallback>{doctor.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-semibold">{doctor.name}</h2>
                  <p className="text-muted-foreground">{doctor.email}</p>
                </div>
              </div>
              
              {isEditingProfile ? (
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" defaultValue={doctor.name} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" defaultValue={doctor.email} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" defaultValue={doctor.phone} />
                    </div>
                     <div>
                      <Label htmlFor="specialization">Specialization</Label>
                      <Input id="specialization" name="specialization" defaultValue={doctor.specialization} />
                    </div>
                    <div>
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input id="experience" name="experience" type="number" defaultValue={doctor.experience} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Biography</Label>
                    <Textarea id="bio" name="bio" rows={5} defaultValue={doctor.bio} />
                  </div>
                  <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <p><strong className="text-foreground">Full Name:</strong> {doctor.name}</p>
                    <p><strong className="text-foreground">Email:</strong> {doctor.email}</p>
                    <p><strong className="text-foreground">Phone:</strong> {doctor.phone || 'N/A'}</p>
                    <p><strong className="text-foreground">Specialization:</strong> {doctor.specialization}</p>
                    <p><strong className="text-foreground">Experience:</strong> {doctor.experience} years</p>
                  </div>
                  <div>
                     <strong className="text-foreground block mb-1">Biography:</strong>
                     <p className="text-muted-foreground whitespace-pre-wrap">{doctor.bio}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Scheduled Appointments</CardTitle>
              <CardDescription>View upcoming and past appointments with patients.</CardDescription>
            </CardHeader>
            <CardContent>
              {appointments.length > 0 ? (
                <ul className="space-y-4">
                  {appointments.map(app => (
                    <li key={app.id} className="p-4 border rounded-lg bg-secondary/30">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">Patient: {app.patientName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(app.date).toLocaleDateString()} at {app.time}
                          </p>
                           <p className="text-sm text-muted-foreground mt-1">Type: {app.consultationType}</p>
                        </div>
                        <Badge 
                          variant={app.status === 'scheduled' ? 'default' : app.status === 'completed' ? 'secondary' : 'destructive'}
                          className={`${
                            app.status === 'scheduled' ? 'bg-blue-500 text-white' : 
                            app.status === 'completed' ? 'bg-green-500 text-white' : 
                            'bg-red-500 text-white'
                          } py-1 px-3`}
                        >
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </Badge>
                      </div>
                       {app.status === 'scheduled' && (
                        <div className="mt-3 space-x-2">
                          <Button size="sm" variant="outline" className="text-primary border-primary hover:bg-primary/10">
                             Mark as Completed
                          </Button>
                          <Button size="sm" variant="destructive">
                            Cancel Appointment
                          </Button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">You have no appointments scheduled.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Manage Your Availability</CardTitle>
              <CardDescription>Set and update your available time slots for consultations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {daysOfWeek.map(day => {
                const dayAvailability = currentAvailability.find(avail => avail.day === day) || { day, slots: [] };
                return (
                  <div key={day} className="p-4 border rounded-lg bg-card">
                    <h4 className="font-semibold text-lg mb-3 text-foreground">{day}</h4>
                    {dayAvailability.slots.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {dayAvailability.slots.map(slot => (
                          <Badge key={slot} variant="secondary" className="py-1 px-3 text-sm">
                            {slot}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-1 h-4 w-4 text-muted-foreground hover:text-destructive"
                              onClick={() => handleRemoveSlot(day, slot)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground mb-3">No slots scheduled for {day}.</p>
                    )}
                    
                    {editingSlotDay === day ? (
                      <div className="flex items-center gap-2 mt-2">
                        <Input 
                          type="time" 
                          value={newSlotTime} 
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewSlotTime(e.target.value)}
                          className="w-auto"
                        />
                        <Button size="sm" onClick={() => handleAddSlot(day)} className="bg-primary text-primary-foreground">Add Slot</Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingSlotDay(null)}>Cancel</Button>
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => { setEditingSlotDay(day); setNewSlotTime(''); }}
                        className="text-primary border-primary hover:bg-primary/10"
                      >
                        <PlusCircle className="mr-2 h-4 w-4" /> Add New Slot
                      </Button>
                    )}
                  </div>
                );
              })}
              <CardFooter className="mt-6 p-0">
                 <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => {
                     setDoctor(prev => ({...prev, availability: currentAvailability}));
                     alert("Availability updated (mock)!");
                 }}>
                    Save Availability Changes
                 </Button>
              </CardFooter>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


    