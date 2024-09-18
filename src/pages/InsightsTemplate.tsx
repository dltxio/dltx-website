import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classnames from "classnames";
import axios from "axios";
import PageLayout from "../components/PageLayout";
import { BlogResponse, Blog } from "../types/insights";

const STRAPI_BLOG_URL = "http://localhost:1337"

const InsightsTemplate: React.FC = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios
      // Add bearer token to get past CORS
      .get<BlogResponse>(
        `${STRAPI_BLOG_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=logo`,
        {
          headers: {
            Authorization: `Bearer 539df41bf60b7b7e2546945300657057a1253115c8e9d79395464c6d6c6afa5cba108a1753345adfdfcd4011ccb21bd96c165a9a99e23b069c9c01d6e53bd594778a9f7317df9cd4524b272cfd9b9504f25bdfb5f389c905a9a711b1ef6c44908d8f476035448b4b7824838dd4b0d9448163234bd830b3bfde05e7546d340196`
          }
        }
      )
      .then(({ data }) => {
        setBlog(data.data[0]);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  return (
    <PageLayout>
      {blog && <img className="py-6 w-full" src={`http://localhost:1337${blog?.attributes.logo.data.attributes.url}`}></img>}

      {blog && <div className="flex flex-col lg:flex-row py-6">
        <div className="flex-[0_0_20%]">
          <div className="text-2xs font-semibold w-fit border border-white border-solid rounded-xl px-2 py-1 mt-1 mb-4 mr-2">{blog.attributes.category}</div>
        </div>
        <div className="grid-blog">
          <div className="text-2xl font-semibold pb-6">{blog.attributes.title}</div>
          <div className="col-start-1 row-start-2 blog-paragraph">{blog.attributes.abstract}</div>
          <div className="col-start-1 row-start-3 col-span-2 border-b border-[#818181] my-6"></div>
          {<div className="col-start-1 row-start-4 flex-col">
            {blog.attributes.description.map((d, i) => <div key={i} className={classnames({ "blog-subheading": d.type == "heading" }, { "blog-paragraph": d.type == "paragraph" })}>{d.children[0].text}</div>)}
          </div>}
        </div>
      </div>}
    </PageLayout>
  );
};

export default InsightsTemplate;