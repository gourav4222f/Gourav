// src/app/admin/projects/new/page.jsx
'use client';

import { useState } from 'react';
import { createProject } from '@/actions/projectActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

export default function NewProjectPage() {
  const router = useRouter();
  // State to hold form submission feedback
  const [feedback, setFeedback] = useState({ message: '', isError: false });

  async function handleSubmit(formData) {
    const result = await createProject(formData);

    if (result.success) {
      // Set a success message
      setFeedback({ message: result.message, isError: false });
      
      // Redirect back to the projects list after a short delay
      setTimeout(() => {
        router.push('/admin/projects');
      }, 1500); // 1.5 seconds

    } else {
      // Set an error message
      setFeedback({ message: result.message, isError: true });
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Project</h1>
      <form action={handleSubmit} className="space-y-6 max-w-lg">
        <div className="space-y-2">
          <Label htmlFor="title">Project Title</Label>
          <Input id="title" name="title" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="shortDescription">Short Description</Label>
          <Textarea id="shortDescription" name="shortDescription" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="thumbnailUrl">Thumbnail Image URL</Label>
          <Input id="thumbnailUrl" name="thumbnailUrl" type="url" placeholder="https://..." required />
        </div>

        <Button type="submit">Create Project</Button>

        {/* Feedback Message Display */}
        {feedback.message && (
          <p className={`text-sm mt-4 ${feedback.isError ? 'text-red-500' : 'text-green-500'}`}>
            {feedback.message}
          </p>
        )}
      </form>
    </div>
  );
}