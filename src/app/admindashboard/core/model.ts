export type bookM = {
    id: number | undefined;
    name: string;
    price: string;
    type: string;
    language: string;
    authorId: authorM | number | undefined;
};

export type authorM = {
    id: number | undefined;
    name: string;
};
