// import { client, urlFor } from "@/app/lib/client";
// import BlogDetailClient from "../blog/[slug]/page";

// async function getData(slug: string) {
//   const query = `*[_type == 'blog' && slug.current == '${slug}']{
//     _id,
//     title,
//     content,
//     image,
//     comments[]->{name, content, createdAt}
//   }[0]`;

//   const data = await client.fetch(query);
//   return data;
// }

// export const revalidate = 10;

// const BlogDetail = async ({ params }: { params: { slug: string } }) => {
//   const data = await getData(params.slug);

//   if (!data) {
//     return <div className="text-center mt-10">Blog not found.</div>;
//   }

//   return <BlogDetailClient data={data} />;
// };

// export default BlogDetail;
