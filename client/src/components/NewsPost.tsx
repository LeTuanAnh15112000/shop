"use client";
import { NewsProps } from "@/_libs/microcms";
import styles from "../app/app.module.scss";
import dayjs from "dayjs";
import { useState } from "react";

export default function NewsPost({
  data,
  page,
  limit,
  totalCount = 0,
}: {
  data: NewsProps;
  page: number;
  limit: number;
  totalCount: number;
}) {
  const [posts, setPosts] = useState(data);
  const [newPage, setNewPage] = useState(page + 1);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const handleLoadMore = async () => {
    try {
      let res = await fetch("/api/news/get-list?page=" + newPage);
      res = await res.json();
      if (res) {
        console.log(res);
      }
    } catch (error) {
      throw Error("Lỗi khi get api Next server");
    }
  };
  return (
    <div className={styles.news}>
      <ul className={styles.news_list}>
        {posts &&
          posts.map((post: any) => (
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
