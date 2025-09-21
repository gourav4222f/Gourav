// src/actions/skillActions.js
'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function createSkill(formData) {
  try {
    const data = {
      name: formData.get('name'),
      category: formData.get('category'),
      icon: formData.get('icon') || null, // Icon is optional
    };

    if (!data.name || !data.category) {
        return { success: false, message: "Name and Category are required." };
    }

    await prisma.skill.create({ data });

    revalidatePath('/admin/skills');

    return { success: true, message: "Skill added successfully!" };

  } catch (error) {
    console.error("Failed to create skill:", error);
    return { success: false, message: "Failed to create skill." };
  }
}