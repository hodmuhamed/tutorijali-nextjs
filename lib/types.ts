export interface WPImage {
  mediaItemUrl: string;
  altText?: string;
  mediaDetails?: {
    width: number;
    height: number;
  };
}

export interface WPCategory {
  id: string;
  databaseId: number; // ← KLJUČNO
  name: string;
  slug: string;
  uri: string;
  count?: number;
}

export interface WPTag {
  id: string;
  name: string;
  slug: string;
  uri: string;
  count?: number;
}

export interface WPSeoFields {
  title?: string;
  metaDesc?: string;
  canonical?: string;
  opengraphTitle?: string;
  opengraphDescription?: string;
  opengraphImage?: {
    sourceUrl?: string;
  };
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: {
    sourceUrl?: string;
  };
}

export interface WPPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  date: string;
  modified: string;
  featuredImage?: {
    node: WPImage;
  };
  categories?: {
    nodes: WPCategory[];
  };
  tags?: {
    nodes: WPTag[];
  };
  seo?: WPSeoFields;
  commentCount?: number;
  uri: string;
}

export interface WPPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface WPPostEdge {
  node: WPPost;
  cursor: string;
}

export interface WPPostConnection {
  edges: WPPostEdge[];
  pageInfo: WPPageInfo;
  nodes: WPPost[];
}

export interface WPCategoryWithPosts extends WPCategory {
  posts?: WPPostConnection;
  description?: string;
}

export interface WPTagWithPosts extends WPTag {
  posts?: WPPostConnection;
  description?: string;
}

