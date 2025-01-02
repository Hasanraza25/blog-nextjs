import { Card, CardContent } from "@/components/ui/card";
import { client, urlFor } from "./lib/client";
import { blogCard } from "./lib/interface";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData() {
  const query = `*[_type == 'blog'] | order(_createdAt desc){
    title,
      description,
      "currentSlug": slug.current,
      image
}`;

  const data = await client.fetch(query);
  return data;
}
export default async function Home() {
  const data: blogCard[] = await getData();
  console.log(data);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20 gap-5">
        {data.map((post, i) => {
          return (
            <Card key={i}>
              <Image
                src={urlFor(post.image).url()}
                alt="Blog Image"
                width={500}
                height={500}
                className="rounded-t-lg w-full h-[200px] object-cover"
              />
              <CardContent className="mt-5">
                <Link href={`/blog/${post.currentSlug}`}>
                  <h3 className="text-2xl font-bold line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="line-clamp-3 mt-3 text-gray-600 dark:text-gray-400">
                    {post.description}
                  </p>
                </Link>
                  <Button asChild className="w-full mt-7">
                    <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
                  </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
