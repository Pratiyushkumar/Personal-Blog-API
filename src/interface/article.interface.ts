export interface articleCreationBody {
  title: string;
  slug?: string;
  featured_img_url?: string;
  content: string;
  author_id: string;
  category_id?: string;
}

export interface articleUpdateBody {
  title?: string;
  featured_img_url?: string;
  content?: string;
}
