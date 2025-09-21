// src/actions/experienceActions.js
'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

// --- CREATE ---
export async function createExperience(formData) {
  try {
    const descriptionText = formData.get('description');
    const descriptionArray = descriptionText.split('\n').filter(line => line.trim() !== '');
    
    await prisma.experience.create({
      data: {
        jobTitle: formData.get('jobTitle'),
        company: formData.get('company'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        description: descriptionArray,
      },
    });
    revalidatePath('/admin/experience');
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to create experience." };
  }
  redirect('/admin/experience');
}

// --- UPDATE ---
export async function updateExperience(id, formData) {
  try {
    const descriptionText = formData.get('description');
    const descriptionArray = descriptionText.split('\n').filter(line => line.trim() !== '');

    await prisma.experience.update({
      where: { id },
      data: {
        jobTitle: formData.get('jobTitle'),
        company: formData.get('company'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        description: descriptionArray,
      },
    });
    revalidatePath('/admin/experience');
    revalidatePath(`/admin/experience/edit/${id}`);
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update experience." };
  }
  redirect('/admin/experience');
}

// --- DELETE ---
export async function deleteExperience(id) {
  try {
    await prisma.experience.delete({ where: { id } });
    revalidatePath('/admin/experience');
  } catch (error) {
    console.error(error);
  }
}