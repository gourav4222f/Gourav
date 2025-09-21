// src/app/admin/experience/edit/[id]/page.jsx
import { PrismaClient } from '@prisma/client';
import { updateExperience } from '@/actions/experienceActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const prisma = new PrismaClient();

export default async function EditExperiencePage({ params }) {
  const { id } = params;
  const experience = await prisma.experience.findUnique({ where: { id } });

  if (!experience) return <div>Experience not found.</div>;
  
  const updateExperienceWithId = updateExperience.bind(null, id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Experience</h1>
      <form action={updateExperienceWithId} className="space-y-6 max-w-lg">
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label htmlFor="jobTitle">Job Title</Label><Input id="jobTitle" name="jobTitle" required defaultValue={experience.jobTitle}/></div>
            <div className="space-y-2"><Label htmlFor="company">Company</Label><Input id="company" name="company" required defaultValue={experience.company}/></div>
            <div className="space-y-2"><Label htmlFor="startDate">Start Date</Label><Input id="startDate" name="startDate" required defaultValue={experience.startDate}/></div>
            <div className="space-y-2"><Label htmlFor="endDate">End Date</Label><Input id="endDate" name="endDate" required defaultValue={experience.endDate}/></div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="description">Description (One bullet point per line)</Label>
            <Textarea id="description" name="description" required rows={5} defaultValue={experience.description.join('\n')}/>
        </div>
        <Button type="submit">Update Experience</Button>
      </form>
    </div>
  );
}