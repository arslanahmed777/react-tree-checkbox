export const basicNodes = [
  {
    value: "animals",
    text: "Animals",
    id: 1,
    status: false,
    nodes: [
      {
        value: "mammals",
        text: "Mammals",
        status: false,
        id: 2,
        nodes: [
          {
            value: "cat",
            text: "Cat",
            status: false,
            nodes: [],
            id: 3,
          },
          {
            value: "dog",
            text: "Dog",
            status: false,
            nodes: [],
            id: 4,
          },
        ],
      },
      {
        value: "birds",
        text: "Birds",
        status: false,
        id: 5,
        nodes: [
          {
            value: "parrot",
            text: "Parrot",
            status: false,
            nodes: [],
            id: 6,
          },
        ],
      },
    ],
  },
  {
    value: "plants",
    text: "Plants",
    status: true,
    nodes: [],
    id: 7,
  },
];
