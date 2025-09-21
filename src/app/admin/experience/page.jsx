// src/app/admin/experience/page.jsx
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteExperience } from '@/actions/experienceActions';

const prisma = new PrismaClient();

function DeleteButton({ id }) {
  return (
    <form action={async () => { if (confirm('Delete this experience?')) await deleteExperience(id); }}>
      <Button variant="destructive" size="sm" type="submit">Delete</Button>
    </form>
  );
}

export default async function ExperiencePage() {
  const experiences = await prisma.experience.findMany({ orderBy: { startDate: 'desc' } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Experience</h1>
        <Button asChild><Link href="/admin/experience/new">Add Experience</Link></Button>
      </div>
      <Table>
        <TableHeader><TableRow><TableHead>Job Title</TableHead><TableHead>Company</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
        <TableBody>
          {experiences.map((exp) => (
            <TableRow key={exp.id}>
              <TableCell className="font-medium">{exp.jobTitle}</TableCell>
              <TableCell>{exp.company}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button asChild variant="outline" size="sm"><Link href={`/admin/experience/edit/${exp.id}`}>Edit</Link></Button>
                <DeleteButton id={exp.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}