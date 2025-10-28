type CounterType = {
    id: string;
    name: string;
    count: number;
    color: string;
    defaultCount: number;
    defaultStep: number;
    dateCreated: string;
    dateModified: string;
};

type CounterCollectionType = {
    [id: string]: CounterType;
};
