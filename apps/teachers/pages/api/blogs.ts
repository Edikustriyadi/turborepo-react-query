// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { IBlog } from "ui";

const blogs: IBlog[] = [
  {
    id: 1,
    title: "title 1",
    body: "body 1",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  switch (req.method) {
    case "GET":
      res.status(200).json(blogs);
      break;
    case "POST":
      const newPost: IBlog = req.body;
      blogs.push(newPost);
      break;
    default:
      break;
  }
}
