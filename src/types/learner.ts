export type Learner = {
    id: number;
    type: string;
    attributes: {
        name: string;
        accept_terms: boolean;
        parish_name: string;
        role: string;
        diocese_name: string;
    };
}