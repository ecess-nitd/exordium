"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ArrowUpRight, Loader, User, Mail, Phone, Users, IdCard, Building, Sparkles, Star } from "lucide-react";
import { StarryNightBackground } from "@/components/ui/shadcn-io/starry-night-background";
import { StarryLoader } from "@/components/ui/starry-loader";
import { StarryProgressBar } from "@/components/ui/starry-progress-bar";
import { SuccessDialog } from "@/components/ui/success-dialog";


export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    section: "",
    roll_number: "",
    hall_number: "",
    performance: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  useEffect(() => {
    // Simulate page loading with progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        setLoadingProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      } else {
        setLoadingProgress(progress);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate phone number
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitProgress(0);

    // Simulate progress during submission
    const progressInterval = setInterval(() => {
      setSubmitProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 20;
      });
    }, 100);

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // Complete the progress
      setSubmitProgress(100);
      clearInterval(progressInterval);

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          section: "",
          roll_number: "",
          hall_number: "",
          performance: "",
        });
        // Show success dialog
        setTimeout(() => {
          setShowSuccessDialog(true);
        }, 300);
      } else {
        toast.error(result.error || "Submission failed");
      }
    } catch (error) {
      clearInterval(progressInterval);
      setSubmitProgress(0);
      toast.error("An error occurred. Please try again.");
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitProgress(0);
      }, 500);
    }
  };

  if (isLoading) {
    return (
      <StarryNightBackground className="min-h-screen w-full">
        <div className="relative z-10 isolate flex items-center justify-center min-h-screen px-4">
          <div className="text-center space-y-8 w-full max-w-md mx-auto">
            {/* Loader */}
            {/* <div className="flex justify-center mb-4">
              <StarryLoader size="large" />
            </div> */}

            <div className="space-y-2">
              <h1 
                className="text-5xl md:text-6xl font-bold font-orbitron tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 drop-shadow-[0_0_40px_rgba(129,140,248,0.9)]"
                style={{
                  animationName: 'titleGlow',
                  animationDuration: '3s',
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  backgroundSize: '200% 200%',
                }}
              >
                EXORDIUM 3.0
              </h1>
            
            </div>

            {/* Progress Section */}
            <div className="space-y-3 pt-4">
              <div className="flex justify-center">
                <StarryProgressBar progress={loadingProgress} className="w-full max-w-sm" />
              </div>
              
              {/* Percentage with enhanced styling */}
              <div className="space-y-1">
                <p 
                  className="text-3xl md:text-4xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-[0_0_20px_rgba(129,140,248,0.8)]"
                  style={{
                    animationName: 'numberPulse',
                    animationDuration: '1.5s',
                    animationTimingFunction: 'ease-in-out',
                    animationIterationCount: 'infinite',
                  }}
                >
                  {Math.round(loadingProgress)}%
                </p>
                <p className="text-sm text-slate-400 font-electrolize tracking-wide">
                  Loading...
                </p>
              </div>
            </div>

            {/* CSS Animations */}
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes titleGlow {
                0%, 100% {
                  filter: brightness(1) drop-shadow(0 0 30px rgba(129, 140, 248, 0.6));
                  background-position: 0% 50%;
                }
                50% {
                  filter: brightness(1.3) drop-shadow(0 0 50px rgba(168, 85, 247, 0.9));
                  background-position: 100% 50%;
                }
              }
              
              @keyframes numberPulse {
                0%, 100% {
                  transform: scale(1);
                  opacity: 0.9;
                }
                50% {
                  transform: scale(1.05);
                  opacity: 1;
                }
              }
            `}} />
          </div>
        </div>
      </StarryNightBackground>
    );
  }

  return (
    <StarryNightBackground className="min-h-screen w-full">
    

    <div className="relative z-10 isolate flex items-center justify-center min-h-screen px-4 py-12">
    <div className="w-full max-w-2xl mx-auto">

      {/* Header Section */}
      <div className="text-center mb-8 space-y-4">
        <div className="flex justify-center animate-star-twinkle">
          {/* <Star className="w-12 h-12 text-yellow-300 mx-auto drop-shadow-[0_0_20px_rgba(253,224,71,0.9)] fill-yellow-300" /> */}
        </div>
        <h1 className="text-5xl md:text-6xl font-bold font-orbitron tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 drop-shadow-[0_0_30px_rgba(129,140,248,0.8)]">
          EXORDIUM 3.0
        </h1>
        <p className="text-lg md:text-xl text-slate-200 font-electrolize tracking-wide drop-shadow-lg">
          Kickstart Your ECE Journey at NIT Durgapur
        </p>
      </div>

      {/* Glassmorphism Card */}
      <div className="relative backdrop-blur-2xl bg-slate-900/30 rounded-3xl shadow-2xl border border-indigo-400/40 p-8 md:p-10 overflow-hidden">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 rounded-3xl pointer-events-none" />
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
          <div>
            <Label>Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                type="email"
                placeholder="your.email@example.com"
                className="hover:border-indigo-400 transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white font-medium flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                className="hover:border-indigo-400 transition-all"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                Section
              </Label>
              <Input
                name="section"
                value={formData.section}
                onChange={handleChange}
                required
                placeholder="e.g., A, B, C"
                className="hover:border-indigo-400 transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white font-medium flex items-center gap-2">
                <IdCard className="w-4 h-4" />
                Roll Number
              </Label>
              <Input
                name="roll_number"
                value={formData.roll_number}
                onChange={handleChange}
                required
                placeholder="Your roll number"
                className="hover:border-indigo-400 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white font-medium flex items-center gap-2">
              <Building className="w-4 h-4" />
              Hall Number
            </Label>
            <Input
              name="hall_number"
              value={formData.hall_number}
              onChange={handleChange}
              required
              type="number"
              placeholder="Your hostel hall number"
                className="hover:border-indigo-400 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Performance Interest
            </Label>
            <p className="text-sm text-slate-300/80">
              Would you like to showcase any performance? (e.g., dance, music, poetry)
            </p>
            <Textarea
              name="performance"
              value={formData.performance}
              onChange={handleChange}
              placeholder="Describe what you'd like to perform..."
              className="min-h-[100px] hover:border-indigo-400 transition-all resize-none"
            />
          </div>

          {isSubmitting && (
            <div className="space-y-2">
              <StarryProgressBar progress={submitProgress} className="w-full" />
              <p className="text-center text-slate-400 font-electrolize text-sm">
                {Math.round(submitProgress)}% complete
              </p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl py-6 px-8 font-semibold text-lg hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(129,140,248,0.8)] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <>
                <StarryLoader size="small" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Submit Registration</span>
                <ArrowUpRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Footer Text */}
      <p className="text-center text-slate-300/70 text-sm mt-6">
        Organized by ECESS, NIT Durgapur
      </p>
    </div>
  </div>

      {/* Success Dialog */}
      <SuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
      />
</StarryNightBackground>


  );
}
