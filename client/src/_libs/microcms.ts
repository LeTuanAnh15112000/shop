import { createClient, MicroCMSQueries } from "microcms-js-sdk";
import { notFound } from "next/navigation";

// 環境変数にMICROCMS_SERVICE_DOMAINが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

// 環境変数にMICROCMS_API_KEYが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

// Client SDKの初期化を行う
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export type NewsProps = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  eyecatch: {
    url: string;
  };
  categories: { nameID: string };
};

export type NewsPropsArray = NewsProps[];

export const getNewsPosts = async (queries?: MicroCMSQueries) => {
  const data = await client
    .get({
      endpoint: "news",
      queries,
    })
    .catch(notFound);
  return data;
};

export const getNewsDetailPost = async (id?: string) => {
  const data = await client
    .get({
      endpoint: `news/${id}`,
    })
    .catch(notFound);
  return data;
};
