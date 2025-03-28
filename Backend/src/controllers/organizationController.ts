import { Request, Response } from "express";
import { prisma } from "../config/prismaClient";
import {
  validateOrganizationData,
  validateOrganizationDataForUpdate,
} from "../utils/organizationDetailsValidation";

// Create Organization Details
export const createOrganizationDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const validationResult = validateOrganizationData(req.body);
    if (!validationResult.success) {
      res.status(400).json({ errors: validationResult.error.format() });
      return;
    }

    const {
      userId,
      organizationName,
      registrationNumber,
      contactPerson,
      contactEmail,
      contactNumber,
      address,
      websiteURL,
      documentURL,
    } = validationResult.data;

    const existingDetails = await prisma.organizationDetails.findUnique({
      where: { userId },
    });

    if (existingDetails) {
      res
        .status(400)
        .json({ message: "Organization details already exist for this user." });
      return;
    }

    const newOrganization = await prisma.organizationDetails.create({
      data: {
        userId,
        organizationName,
        registrationNumber,
        contactPerson,
        contactEmail,
        contactNumber,
        address,
        websiteURL,
        documentURL,
      },
    });

    res.status(201).json(newOrganization);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update Organization Details
export const updateOrganizationDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const validationResult = validateOrganizationDataForUpdate(req.body);
    if (!validationResult.success) {
      res.status(400).json({ errors: validationResult.error.errors });
      return;
    }

    const organizationDetails = await prisma.organizationDetails.findUnique({
      where: { id },
    });

    if (!organizationDetails) {
      res.status(404).json({ message: "Organization details not found." });
      return;
    }

    const updatedOrganization = await prisma.organizationDetails.update({
      where: { id },
      data: { ...req.body, verifiedAt: req.body.verified ? new Date() : null },
    });

    res.json(updatedOrganization);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

// Get Organization Details
export const getOrganizationDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const organizationDetails = await prisma.organizationDetails.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!organizationDetails) {
      res.status(404).json({ message: "Organization details not found." });
      return;
    }

    res.json(organizationDetails);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Organization Details
export const deleteOrganizationDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const organizationDetails = await prisma.organizationDetails.findUnique({
      where: { id },
    });
    if (!organizationDetails) {
      res.status(404).json({ message: "Organization details not found." });
      return;
    }

    if (organizationDetails.userId !== (req as any).user.id) {
      res
        .status(403)
        .json({ message: "Not authorized to delete this organization." });
      return;
    }

    await prisma.organizationDetails.delete({ where: { id } });

    res.json({ message: "Organization details deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
