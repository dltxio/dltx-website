import React, { useEffect, useState } from "react";
import classnames from "classnames";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import axios from "axios";

type Text = {
  type: "text";
  text: string;
}

type Paragraph = {
  type: "paragraph"
  children: Text[];
}

type Heading = {
  type: "heading";
  level: number;
  children: Text[];
}

type DescriptonItem = Paragraph | Heading;

type Blog = {
  id: string;
  attributes: {
    category: string;
    title: string;
    abstract: string;
    logo: {
      data: {
        attributes: {
          url: string;
        }
      }
    }
    description: DescriptonItem[];
  };
};

export type BlogResponse = {
  data: Blog[];
};

const Insights: React.FC = () => {
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios
      // Add bearer token to get past CORS
      .get<BlogResponse>(
        "http://localhost:1337/api/blogs?populate=logo",
        {
          headers: {
            Authorization: `Bearer 539df41bf60b7b7e2546945300657057a1253115c8e9d79395464c6d6c6afa5cba108a1753345adfdfcd4011ccb21bd96c165a9a99e23b069c9c01d6e53bd594778a9f7317df9cd4524b272cfd9b9504f25bdfb5f389c905a9a711b1ef6c44908d8f476035448b4b7824838dd4b0d9448163234bd830b3bfde05e7546d340196`
          }
        }
      )
      .then(({ data }) => {
        setBlog(data.data[0]);
        console.log(data)
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  return (
    <PageLayout>
      <div className="divide-y divide-[#818181]">
        <Header />

        <Section title="INSIGHTS">
          The latest trends and expert analysis in decentralised technologies. Stay ahead with in-depth content on blockchain, digital assets, and the future of the internet.
        </Section>

        <img className="py-6 w-full" src={`http://localhost:1337${blog?.attributes.logo.data.attributes.url}`}></img>

        {blog && <div className="flex flex-col lg:flex-row py-6">
          <div className="flex-[0_0_20%]">
            <div className="text-2xs font-semibold w-fit border border-white border-solid rounded-xl px-2 py-1 mt-1 mb-4 mr-2">{blog.attributes.category}</div>
          </div>
          <div className="grid-blog">
            <div className="text-2xl font-semibold pb-6">{blog.attributes.title}</div>
            <div className="col-start-1 row-start-2 blog-paragraph">{blog.attributes.abstract}</div>
            <div className="col-start-1 row-start-3 col-span-2 border-b border-[#818181] my-6"></div>
            <div className="col-start-1 row-start-4 flex-flex-col">
              {blog.attributes.description.map((d, i) => <div key={i} className={classnames({ "blog-subheading": d.type == "heading" }, { "blog-paragraph": d.type == "paragraph" })}>{d.children[0].text}</div>)}
            </div>
          </div>
        </div>}

        <Footer />
      </div>
    </PageLayout>
  );
};

export default Insights;

