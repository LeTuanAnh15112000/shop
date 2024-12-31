"use client";
import { NewsProps, NewsPropsArray } from "@/_libs/microcms";
import styles from "../app/app.module.scss";
import dayjs from "dayjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NewsPost({
  data,
  page,
  limit,
  totalCount,
}: {
  data: NewsPropsArray;
  page: number;
  limit: number;
  totalCount: number;
}) {
  const [posts, setPosts] = useState(data);
  const [newPage, setNewPage] = useState(page + 1);
  const [isLoadMore, setIsLoadMore] = useState(true);
  console.log(totalCount / limit);
  const handleLoadMore = async () => {
    try {
      let res = await fetch("/api/news/get-list?page=" + newPage);
      res = await res.json();
      if (res?.data?.contents) {
        console.log(res);
        setPosts((prev) => {
          return [...prev, ...res?.data?.contents];
        });
        setNewPage((prev) => prev + 1);
        if (totalCount / limit <= newPage) {
          setIsLoadMore(false);
        }
      }
    } catch {
      throw Error("Lỗi khi get api Next server");
    }
  };
  return (
    <div className={styles.news}>
      <ul className={styles.news_list}>
        {posts &&
          posts.map((post: NewsProps) => (
            <li key={post.id} className={styles.news_item}>
              <div className={styles.news_block}>
                <span className={styles.news_cat}>
                  {post.categories.nameID}
                </span>
                <span className={styles.news_date}>
                  {dayjs(post.publishedAt).format("YY.MM.DD")}
                </span>
              </div>
              <div
                className={styles.news_title}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <Link href={`/news/${post.id}`}>
                <Button>Xem chi tiết</Button>
              </Link>
            </li>
          ))}
      </ul>
      {isLoadMore && (
        <p className={styles.btn_loadmore}>
          <span onClick={handleLoadMore}>LOAD MORE</span>
        </p>
      )}
    </div>
  );
}
