import { getNewsPosts } from "@/_libs/microcms";
import { NEWS_LIST_LIMIT } from "@/_constants";
import NewsPost from "@/components/NewsPost";

export default async function News() {
  const posts = await getNewsPosts({
    limit: NEWS_LIST_LIMIT,
  });
  return <NewsPost data={posts.contents} page={1} limit={NEWS_LIST_LIMIT} totalCount={posts.totalCount} />;
}
