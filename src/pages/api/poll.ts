import { Pill } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export type PollRequest = {
  twitter: string;
  pill: Pill;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = req.body as PollRequest;
    if (!body.twitter) {
      return res.status(400).json({ message: "bad request" });
    }

    if (!body.pill) {
      return res.status(400).json({ message: "bad request" });
    }

    if (body.pill !== Pill.RED_PILL && body.pill !== Pill.BLUE_PILL) {
      return res.status(400).json({ message: "bad request" });
    }

    const existing = await prisma.pillChoice.findFirst({
      where: {
        twitterId: body.twitter,
      },
    });

    if (existing) {
      return res.status(409).json({ message: "twitter handel taken" });
    }

    await prisma.pillChoice.create({
      data: {
        twitterId: body.twitter,
        pill: body.pill,
      },
    });

    return res.status(200).json({ message: "ok" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
