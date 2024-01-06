// pages/api/increment-view.js
import { getSession } from "next-auth/react";
import prisma from "@/utils/prismaConnect"; // Asegúrate de que esta ruta sea correcta

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "No autorizado" });
  }

  const userEmail = session.user.email;
  const { slug } = req.query;

  try {
    const viewExists = await prisma.postView.findUnique({
      where: {
        postSlug_userEmail: {
          postSlug: slug,
          userEmail: userEmail,
        },
      },
    });

    if (!viewExists) {
      await prisma.post.update({
        where: { slug },
        data: { views: { increment: 1 } },
      });

      await prisma.postView.create({
        data: {
          postSlug: slug,
          userEmail: userEmail,
        },
      });
    }

    res.status(200).json({ message: "Vista actualizada correctamente" });
  } catch (error) {
    console.error("Error en la API increment-view:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
