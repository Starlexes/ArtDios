
export interface Link {
    link?: string | undefined,
    children?: string | undefined,
    type: 'main' | 'social',
    className?: string | undefined,
    isText?: boolean | undefined
    id: number;
}

export interface NavigationListProps {
    className?: string | undefined,
    links: Link[]
}