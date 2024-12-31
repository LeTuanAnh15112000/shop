import { getNewsDetailPost, getNewsPosts, NewsProps } from "@/_libs/microcms";

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const post: NewsProps = await getNewsDetailPost(id);
  return <h1>{post.title}</h1>;
}

export async function generateStaticParams() {
  const data: any = await getNewsPosts();
  return data.contents.map((post: any) => ({
    id: post.id,
  }));
}
