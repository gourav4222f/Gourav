// src/app/admin/experience/new/page.jsx
import { createExperience } from '@/actions/experienceActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function NewExperiencePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Experience</h1>
      <form action={createExperience} className="space-y-6 max-w-lg">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label htmlFor="jobTitle">Job Title</Label><Input id="jobTitle" name="jobTitle" required /></div>
          <div className="space-y-2"><Label htmlFor="company">Company</Label><Input id="company" name="company" required /></div>
          <div className="space-y-2"><Label htmlFor="startDate">Start Date</Label><Input id="startDate" name="startDate" placeholder="e.g., Jan 2024" required /></div>
          <div className="space-y-2"><Label htmlFor="endDate">End Date</Label><Input id="endDate" name="endDate" placeholder="e.g., Present" required /></div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description (One bullet point per line)</Label>
          <Textarea id="description" name="description" required rows={5} />
        </div>
        <Button type="submit">Add Experience</Button>
      </form>
    </div>
  );
}