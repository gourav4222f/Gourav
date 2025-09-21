// src/app/admin/skills/new/page.jsx
'use client';

import { useState } from 'react';
import { createSkill } from '@/actions/skillActions';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewSkillPage() {
  const router = useRouter();
  const [feedback, setFeedback] = useState({ message: '', isError: false });
  const [category, setCategory] = useState('');

  // We need to handle the form submission slightly differently
  // because the Select component is not a standard input.
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.set('category', category); // Add category from state to formData

    const result = await createSkill(formData);

    if (result.success) {
      setFeedback({ message: result.message, isError: false });
      setTimeout(() => router.push('/admin/skills'), 1500);
    } else {
      setFeedback({ message: result.message, isError: true });
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Skill</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <div className="space-y-2">
          <Label htmlFor="name">Skill Name</Label>
          <Input id="name" name="name" placeholder="e.g., React" required />
        </div>
        
        <div className="space-y-2">
          <Label>Category</Label>
          <Select onValueChange={setCategory} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="frontend">Frontend</SelectItem>
              <SelectItem value="backend">Backend/DB</SelectItem>
              <SelectItem value="concepts">Concepts</SelectItem>
              <SelectItem value="tools">Tools</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="icon">Icon (Optional)</Label>
          <Input id="icon" name="icon" placeholder="e.g., react-icon.svg" />
        </div>

        <Button type="submit">Add Skill</Button>

        {feedback.message && (
          <p className={`text-sm mt-4 ${feedback.isError ? 'text-red-500' : 'text-green-500'}`}>
            {feedback.message}
          </p>
        )}
      </form>
    </div>
  );
}