import { ReactNode } from "react";

export interface IFeedCard {
    title: string;
    description: string;
    slug: string;
    image: string;
}

export interface INavProps {
    name: string;
    icon: ReactNode;
    path: string;
}
