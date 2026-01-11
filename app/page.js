"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-toastify";
import { ArrowUpRight, Loader } from "lucide-react";
import { BubbleBackground } from "@/components/ui/shadcn-io/bubble-background";


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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success(result.message);
      setFormData({
        name: "",
        email: "",
        phone: "",
        section: "",
        roll_number: "",
        hall_number: "",
        performance: "",
      });
    } else {
      toast.error(result.error || "Submission failed");
    }

    setIsSubmitting(false);
  };

  return (
    <BubbleBackground className="min-h-screen w-full">
    

    <div className="relative z-10 isolate flex items-center justify-center min-h-screen px-4">
    <div className="w-full max-w-xl text-white">

    <h1 className="text-3xl font-bold font-orbitron tracking-wider mb-4 text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"> Exordium 2026 </h1>


        <form onSubmit={handleSubmit} className="space-y-3">
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

          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <Label>Email</Label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                type="tel"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <Label>Section</Label>
              <Input
                name="section"
                value={formData.section}
                onChange={handleChange}
                required
                placeholder="Enter your section"
              />
            </div>
            <div>
              <Label>Roll number</Label>
              <Input
                name="roll_number"
                value={formData.roll_number}
                onChange={handleChange}
                required
                placeholder="Enter your roll number"
              />
            </div>
          </div>

          <div>
            <Label>Hall Number</Label>
            <Input
              name="hall_number"
              value={formData.hall_number}
              onChange={handleChange}
              required
              type="number"
              placeholder="Enter your hall number"
            />
          </div>

          <div>
            <Label>
              Willing to stage any performance, if yes, then what?
            </Label>
            <Textarea
              name="performance"
              value={formData.performance}
              onChange={handleChange}
              placeholder="Enter your answer"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-sky-600 to-indigo-400 text-white rounded-full py-3 px-6 hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <Loader className="animate-spin" />
            ) : (
              <>
                Submit <ArrowUpRight />
              </>
            )}
          </Button>
        </form>
        </div>
  </div>
</BubbleBackground>


  );
}
