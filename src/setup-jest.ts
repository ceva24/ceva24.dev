interface Global extends NodeJS.Global {
    ___loader: { enqueue(): void };
}

declare const global: Global;

global.___loader = {
    enqueue: jest.fn(),
};

export {};
