import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import classnames from "classnames";
import axios from "axios";
import { motion } from "framer-motion";
import useBreakpoint from "../hooks/useBreakpoint";
import { BlogResponse, Blog } from "../types/insights";
import PageLayout from "../components/PageLayout";
import Section from "../components/Section";

const INSIGHTS_PER_PAGE = 9;
const STRAPI_API_TOKEN = "539df41bf60b7b7e2546945300657057a1253115c8e9d79395464c6d6c6afa5cba108a1753345adfdfcd4011ccb21bd96c165a9a99e23b069c9c01d6e53bd594778a9f7317df9cd4524b272cfd9b9504f25bdfb5f389c905a9a711b1ef6c44908d8f476035448b4b7824838dd4b0d9448163234bd830b3bfde05e7546d340196";

const Card: React.FC<{ blog: Blog }> = ({ blog }) => {
  return (<a key={blog.attributes.slug} href={`/insights/${blog.attributes.slug}`}>
    <motion.div className="flex flex-col bg-gradient-to-r from-transparent to-[#202020] rounded-xl hover:text-white"
      whileHover={{ scale: 1.02 }}
      transition={{ ease: "easeIn", duration: 0.3 }}>
      <img src={`http://localhost:1337${blog.attributes.logo.data.attributes.url}`}></img>
      <div className="p-6">
        <div className="text-2xs font-semibold w-fit mb-4 border border-white border-solid rounded-xl px-2 py-1">{blog.attributes.category}</div>
        <div className="text-sm font-semibold mb-4">{blog.attributes.title}</div>
        <div className="text-2xs mb-4">{blog.attributes.abstract}</div>
        <div className="text-2xs font-bold">Read more</div>
      </div>
    </motion.div>
  </a>);
}

const Insights: React.FC = () => {
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchParams, _] = useSearchParams();
  const { isLg } = useBreakpoint();

  const page = parseInt(searchParams.get("page") ?? "") || 1;

  useEffect(() => {
    axios.get<BlogResponse>("http://localhost:1337/api/blogs?populate=logo", { headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` } })
      .then(({ data }) => {
        setAllBlogs(new Array(30).fill(data.data[0]));
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setTotalPages(isLg ? allBlogs.length / INSIGHTS_PER_PAGE + 1 : 0);
    setBlogs(isLg ? allBlogs.slice(INSIGHTS_PER_PAGE * (page - 1), INSIGHTS_PER_PAGE * page) : allBlogs);
  }, [allBlogs, isLg])

  return (
    <PageLayout>
      <Section title="INSIGHTS">
        The latest trends and expert analysis in decentralised technologies. Stay ahead with in-depth content on blockchain, digital assets, and the future of the internet.
      </Section>

      {blogs && <div className="flex flex-col items-center">
        <div className="grid-card gap-6 py-4">
          {blogs.map((blog) => <Card blog={blog} />)}
        </div>
        {(totalPages > 0) && <div className="flex pb-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(i => {
            const href = `/insights` + ((i == 1) ? `` : `?page=${i}`);
            return (<a href={href} className={classnames("page-marker", { "text-white border-white": page == i })}>{i}</a>)
          })}
        </div>}
      </div>}
    </PageLayout>
  );
};

export default Insights;