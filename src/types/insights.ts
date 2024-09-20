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

export type InsightShort = {
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

export type InsightDetail = InsightShort & {
  attributes: {
    content: DescriptonItem[];
  };
};

export type InsightsResponse = {
  data: InsightShort[];
};

export type InsightsDetailResponse = {
  data: InsightDetail[];
};
