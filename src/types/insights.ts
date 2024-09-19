export type Text = {
  type: "text";
  text: string;
}

export type Paragraph = {
  type: "paragraph"
  children: Text[];
}

export type Heading = {
  type: "heading";
  level: number;
  children: Text[];
}

export type DescriptonItem = Paragraph | Heading;

export type BlogShort = {
  id: string;
  attributes: {
    publishedAt: Date;
    slug: string;
    category: string;
    title: string;
    abstract: string;
    picture: {
      data: {
        attributes: {
          url: string;
        }
      }
    }
  };
}

export type BlogDetail = BlogShort & {
  attributes: {
    content: DescriptonItem[];
  };
};

export type BlogsResponse = {
  data: BlogShort[];
};

export type BlogsDetailResponse = {
  data: BlogDetail[];
};
