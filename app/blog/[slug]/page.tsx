import { client, urlFor } from "@/app/lib/client";
import { blogDetail } from "@/app/lib/interface";
import CommentSection from "@/components/ui/CommentSection";
import { PortableText, PortableTextComponents } from "next-sanity";
import Image from "next/image";
import React from "react";

export const revalidate = 10;

async function getData(slug: string) {
  const query = `*[_type == 'blog' && slug.current == '${slug}']{
    "currentSlug": slug.current,
    title,
    content,
    image
  }[0]`;

  const data = await client.fetch(query);
  return data;
}

const BlogDetail = async ({ params }: { params: { slug: string } }) => {
  const data: blogDetail = await getData(params.slug);
  console.log(data);

  // Define custom serializers
  const components: PortableTextComponents = {
    types: {
      image: ({ value }: any) => (
        <Image
          src={urlFor(value).url()}
          alt={value.alt || "Blog Image"}
          width={600}
          height={600}
          className="rounded-lg  mx-auto"
        />
      ),
    },
  };

  return (
    <div className="mt-2">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          Written by Hasan Raza
        </span>
        <span className="block mt-2 text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>
      <Image
        src={urlFor(data.image).url()}
        alt={data.title}
        width={800}
        height={600}
        priority
        className="mx-auto rounded-lg mt-5 border"
      />
      <div className="mt-10 mb-10 mx-auto w-full max-w-full prose prose-blue prose-xl md:prose-headings:text-4xl dark:prose-invert prose-li:marker:text-primary">
        <PortableText value={data.content} components={components} />
      </div>

      <CommentSection slug={params.slug} />
    </div>
  );
};

export default BlogDetail;
