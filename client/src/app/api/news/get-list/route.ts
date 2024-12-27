import { NEWS_LIST_LIMIT } from "@/_constants";
import { getNewsPosts } from "@/_libs/microcms";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    let page = parseInt(request.nextUrl.searchParams.get("page") || "1", 5);
    if (isNaN(page) || page < 1) {
      page = 1;
    }

    const data = await getNewsPosts({
      limit: NEWS_LIST_LIMIT,
      offset: NEWS_LIST_LIMIT * (page - 1),
    });

    return NextResponse.json(
      {
        status: "success",
        data: data,
      },
      {
        status: 200,
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        status: "error",
        message: err.message,
      },
      {
        status: 400,
      }
    );
  }
}
