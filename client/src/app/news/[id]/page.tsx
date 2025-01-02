import { getNewsDetailPost, getNewsPosts, NewsProps } from "@/_libs/microcms";
import style from "../../app.module.scss";
import Image from "next/image";

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const post: NewsProps = await getNewsDetailPost(id);
  return (
    <div className={style.post_detail}>
      <h3 className={style.post_title}>{post.title}</h3>
      <figure className={style.post_image}>
        <Image
          src={post.eyecatch.url}
          alt={post.title}
          height={360}
          width={480}
        />
      </figure>
      <div
        className={style.post_content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}

export async function generateStaticParams() {
  const data: any = await getNewsPosts();
  return data.contents.map((post: any) => ({
    id: post.id,
  }));
}
