// src/app/admin/projects/edit/[id]/page.jsx
import { PrismaClient } from '@prisma/client';
import { updateProject } from '@/actions/projectActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const prisma = new PrismaClient();

export default async function EditProjectPage({ params }) {
  const { id } = params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) {
    return <div>Project not found.</div>;
  }
  
  // Bind the id to the server action
  const updateProjectWithId = updateProject.bind(null, id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Project</h1>
      <form action={updateProjectWithId} className="space-y-6 max-w-lg">
        <div className="space-y-2">
          <Label htmlFor="title">Project Title</Label>
          <Input id="title" name="title" required defaultValue={project.title} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shortDescription">Short Description</Label>
          <Textarea id="shortDescription" name="shortDescription" required defaultValue={project.shortDescription} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="thumbnailUrl">Thumbnail Image URL</Label>
          <Input id="thumbnailUrl" name="thumbnailUrl" type="url" required defaultValue={project.thumbnailUrl} />
        </div>
        <Button type="submit">Update Project</Button>
      </form>
    </div>
  );
}