type CounterType = {
    name: string;
    count: number;
    color: string;
    defaultCount: number;
    defaultStep: number;
    dateCreated: number;
    dateModified: number;
};

type CounterTypeModifiable = Partial<
    Omit<CounterType, "dateCreated" | "dateModified">
>;

type CounterCompleteType = {
    id: string;
    data: CounterType;
};

type CounterCollectionType = {
    [id: string]: CounterCompleteType;
};
