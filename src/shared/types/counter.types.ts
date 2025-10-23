type CounterType = {
    id: string;
    name: string;
    count: number;
};

type CounterCollectionType = {
    [id: string]: CounterType;
};
