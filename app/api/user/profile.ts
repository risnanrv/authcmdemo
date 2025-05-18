// import type { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from "../../../lib/mongodb";
// import { getSession } from "next-auth/react";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "PUT") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   const session = await getSession({ req });

//   if (!session?.user?.email) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const { name } = req.body;
//   if (!name || typeof name !== "string") {
//     return res.status(400).json({ message: "Invalid name" });
//   }

//   try {
//     const client = await clientPromise;
//     const db = client.db();

//     // Update user by email
//     const result = await db.collection("users").updateOne(
//       { email: session.user.email },
//       { $set: { name } }
//     );

//     if (result.modifiedCount === 1) {
//       return res.status(200).json({ message: "Name updated" });
//     } else {
//       return res.status(404).json({ message: "User not found or name unchanged" });
//     }
//   } catch (error) {
//     console.error("DB update error:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// }
