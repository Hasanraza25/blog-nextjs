import { StaticImageData } from "next/image";

export interface blogCard {
  title: string;
  description: string;
  currentSlug: string;
  image: StaticImageData;
}

export interface blogDetail {
  currentSlug: string;
  title: string;
  content: any;
  image: StaticImageData;
}
