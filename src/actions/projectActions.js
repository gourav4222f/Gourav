// src/actions/projectActions.js
'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

// --- CREATE ---
export async function createProject(formData) {
  try {
    const data = {
      title: formData.get('title'),
      shortDescription: formData.get('shortDescription'),
      thumbnailUrl: formData.get('thumbnailUrl'),
    };
    const slug = data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    await prisma.project.create({
      data: { ...data, slug, content: "Edit me.", tags: ["new"] },
    });
    revalidatePath('/admin/projects');
    return { success: true, message: "Project created successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to create project." };
  }
}

// --- UPDATE ---
export async function updateProject(id, formData) {
  try {
    const data = {
      title: formData.get('title'),
      shortDescription: formData.get('shortDescription'),
      thumbnailUrl: formData.get('thumbnailUrl'),
    };
    const slug = data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    await prisma.project.update({
      where: { id },
      data: { ...data, slug },
    });
    revalidatePath('/admin/projects');
    revalidatePath(`/admin/projects/edit/${id}`);
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update project." };
  }
  redirect('/admin/projects');
}

// --- DELETE ---
export async function deleteProject(id) {
  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath('/admin/projects');
    return { success: true, message: "Project deleted." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete project." };
  }
}