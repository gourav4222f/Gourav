// src/app/admin/projects/page.jsx
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteProject } from '@/actions/projectActions';

const prisma = new PrismaClient();

// Delete Button needs to be a client component to use onClick
function DeleteButton({ id }) {
  return (
    <form action={async () => {
      if (confirm('Are you sure you want to delete this project?')) {
        await deleteProject(id);
      }
    }}>
      <Button variant="destructive" size="sm" type="submit">Delete</Button>
    </form>
  );
}

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <Button asChild><Link href="/admin/projects/new">Add New Project</Link></Button>
      </div>
      <Table>
        <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Created At</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.title}</TableCell>
              <TableCell>{new Date(project.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button asChild variant="outline" size="sm"><Link href={`/admin/projects/edit/${project.id}`}>Edit</Link></Button>
                <DeleteButton id={project.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}