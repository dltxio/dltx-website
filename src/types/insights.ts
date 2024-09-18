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

export type Blog = {
  id: string;
  attributes: {
    slug: string;
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
