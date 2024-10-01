export type Text = {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
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

export type InsightBrief = {
  id: string;
  srcPicture: string;
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

export type InsightFull = InsightBrief & {
  attributes: {
    content: DescriptonItem[];
  };
};
