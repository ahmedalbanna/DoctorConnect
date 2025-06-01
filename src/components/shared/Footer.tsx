export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-secondary text-secondary-foreground py-8 border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {currentYear} DoctorConnect. All rights reserved.</p>
        <p className="text-sm mt-2">
          <a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a> | 
          <a href="/terms-of-service" className="hover:text-primary transition-colors ml-2">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}
