const uniqueId = (length = 16) => {
  return parseInt(
    Math.ceil(Math.random() * Date.now())
      .toPrecision(length)
      .toString()
      .replace('.', '')
  );
};
const nodes = [
  {
    value: 'Animals',
    text: 'animals',
    status: false,
    id: uniqueId(),
    nodes: [
      {
        value: 'vertibrates',
        text: 'vertibrates',
        status: false,
        id: uniqueId(),
        nodes: [
          {
            value: 'warmblooded',
            text: 'warmblooded',
            status: false,
            id: uniqueId(),
            nodes: [
              {
                value: 'mammals',
                text: 'mammals',
                status: false,
                id: uniqueId(),
                nodes: [
                  {
                    value: 'bear',
                    text: 'bear',
                    status: false,
                    id: uniqueId(),
                    nodes: [],
                  },
                  {
                    value: 'tiger',
                    text: 'tiger',
                    status: false,
                    nodes: [],
                    id: uniqueId(),
                  },
                ],
              },
              {
                value: 'birds',
                text: 'birds',
                status: false,
                id: uniqueId(),
                nodes: [
                  {
                    value: 'sparrow',
                    text: 'sparrow',
                    status: false,
                    nodes: [],
                    id: uniqueId(),
                  },
                  {
                    value: 'parrot',
                    text: 'parrot',
                    status: false,
                    nodes: [],
                    id: uniqueId(),
                  },
                ],
              },
            ],
          },
          {
            value: 'coldblooded',
            text: 'coldblooded',
            status: false,
            id: uniqueId(),
            nodes: [
              {
                value: 'fish',
                text: 'fish',
                status: false,
                id: uniqueId(),
                nodes: [
                  {
                    value: 'salmon',
                    text: 'salmon',
                    status: false,
                    id: uniqueId(),
                    nodes: [],
                  },
                  {
                    value: 'guppy',
                    text: 'guppy',
                    status: false,
                    id: uniqueId(),
                    nodes: [],
                  },
                ],
              },
              {
                value: 'reptiles',
                text: 'reptiles',
                status: false,
                id: uniqueId(),
                nodes: [
                  {
                    value: 'turtle',
                    text: 'turtle',
                    status: false,
                    id: uniqueId(),
                    nodes: [],
                  },
                  {
                    value: 'lizard',
                    text: 'lizard',
                    status: false,
                    id: uniqueId(),
                    nodes: [],
                  },
                ],
              },
              {
                value: 'amphibions',
                text: 'amphibions',
                status: false,
                id: uniqueId(),
                nodes: [
                  {
                    value: 'frog',
                    text: 'frog',
                    status: false,
                    id: uniqueId(),
                    nodes: [],
                  },
                  {
                    value: 'toad',
                    text: 'toad',
                    status: false,
                    id: uniqueId(),
                    nodes: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        value: 'invertibrates',
        text: 'invertibrates',
        status: false,
        id: uniqueId(),
        nodes: [
          {
            value: 'withlegs',
            text: 'withlegs',
            status: false,
            id: uniqueId(),
            nodes: [
              {
                value: 'withthreepair',
                text: 'withthreepair',
                status: false,
                id: uniqueId(),
                nodes: [
                  {
                    value: 'ant',
                    text: 'ant',
                    status: false,
                    id: uniqueId(),
                    nodes: [],
                  },
                  {
                    value: 'ladybird',
                    text: 'ladybird',
                    status: false,
                    id: uniqueId(),
                    nodes: [],
                  },
                ],
              },
              {
                value: 'morethreepair',
                text: 'morethreepair',
                status: false,
                id: uniqueId(),
                nodes: [
                  {
                    value: 'spider',
                    text: 'spider',
                    status: false,
                    id: uniqueId(),
                    nodes: [],
                  },
                  {
                    value: 'scorpion',
                    text: 'scorpion',
                    status: false,
                    id: uniqueId(),
                    nodes: [],
                  },
                ],
              },
            ],
          },
          {
            value: 'withoutlegs',
            text: 'withoutlegs',
            status: false,
            id: uniqueId(),
            nodes: [
              {
                value: 'wormlike',
                text: 'wormlike',
                status: false,
                id: uniqueId(),
                nodes: [
                  {
                    value: 'earthworm',
                    text: 'earthworm',
                    status: false,
                    id: uniqueId(),
                    nodes: [],
                  },
                  {
                    value: 'leech',
                    text: 'leech',
                    status: false,
                    id: uniqueId(),
                    nodes: [],
                  },
                ],
              },
              {
                value: 'notwormlike',
                text: 'notwormlike',
                status: false,
                id: uniqueId(),
                nodes: [
                  {
                    value: 'fluke',
                    text: 'fluke',
                    status: false,
                    id: uniqueId(),
                    nodes: [],
                  },
                  {
                    value: 'tapeworm',
                    text: 'tapeworm',
                    status: false,
                    id: uniqueId(),
                    nodes: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    value: 'plants',
    text: 'plants',
    status: false,
    id: uniqueId(),
    nodes: [
      {
        value: 'seedmakers',
        text: 'Seed Makers',
        status: false,
        id: uniqueId(),
        nodes: [
          {
            value: 'flowering',
            text: 'Flowering',
            status: false,
            id: uniqueId(),
            nodes: [
              {
                value: 'sunflowers',
                text: 'Sunflowers',
                status: false,
                id: uniqueId(),
                nodes: [],
              },
            ],
          },
          {
            value: 'nonflowering',
            text: 'Non Flowering',
            status: false,
            id: uniqueId(),
            nodes: [
              {
                value: 'conifers',
                text: 'Conifers',
                status: false,
                id: uniqueId(),
                nodes: [],
              },
            ],
          },
        ],
      },
      {
        value: 'nonseedmakers',
        text: 'Non Seed Makers',
        status: false,
        id: uniqueId(),
        nodes: [],
      },
    ],
  },
  {
    value: 'cars',
    text: 'cars',
    status: false,
    id: uniqueId(),
    nodes: [
      {
        value: 'toyota',
        text: 'toyota',
        status: false,
        id: uniqueId(),
        nodes: [
          {
            value: 'Avalon',
            text: 'Avalon',
            status: false,
            id: uniqueId(),
            nodes: [],
          },
          {
            value: 'Camry',
            text: 'Camry',
            status: false,
            id: uniqueId(),
            nodes: [],
          },
          {
            value: 'Corolla',
            text: 'Corolla',
            status: false,
            id: uniqueId(),
            nodes: [],
          },
        ],
      },
      {
        value: 'honda',
        text: 'honda',
        status: false,
        id: uniqueId(),
        nodes: [
          {
            value: 'Passport',
            text: 'Passport',
            status: false,
            id: uniqueId(),
            nodes: [],
          },
          {
            value: 'City',
            text: 'City',
            status: false,
            id: uniqueId(),
            nodes: [],
          },
        ],
      },
      {
        value: 'Kia',
        text: 'Kia',
        status: false,
        id: uniqueId(),
        nodes: [
          {
            value: 'Sportage',
            text: 'Sportage',
            status: false,
            id: uniqueId(),
            nodes: [],
          },
          {
            value: 'Soul',
            text: 'Soul',
            status: false,
            id: uniqueId(),
            nodes: [],
          },
        ],
      },
    ],
  },
  {
    value: 'Generarions',
    text: 'Generarions',
    status: false,
    id: uniqueId(),
    nodes: [
      {
        value: 'uniqueId()st generation',
        text: 'uniqueId()st generation',
        status: false,
        id: uniqueId(),
        nodes: [],
      },
      {
        value: '2nd generation',
        text: '2nd generation',
        status: false,
        id: uniqueId(),
        nodes: [],
      },
      {
        value: '3rd generation',
        text: '3rd generation',
        status: false,
        id: uniqueId(),
        nodes: [],
      },
      {
        value: '4th generation',
        text: '4th generation',
        status: false,
        id: uniqueId(),
        nodes: [],
      },
      {
        value: '5th generation',
        text: '5th generation',
        status: false,
        id: uniqueId(),
        nodes: [],
      },
    ],
  },

  {
    value: 'trignometery',
    text: 'trignometery',
    status: false,
    id: uniqueId(),
    nodes: [
      {
        value: 'Sinθ',
        text: 'Sinθ',
        status: false,
        id: uniqueId(),
        nodes: [],
      },
      {
        value: 'Cosθ',
        text: 'Cosθ',
        status: false,
        id: uniqueId(),
        nodes: [],
      },
      {
        value: 'Tanθ',
        text: 'Sinθ',
        status: false,
        id: uniqueId(),
        nodes: [],
      },
    ],
  },
  {
    value: 'comapny hierarchy',
    text: 'Comapny hierarchy',
    status: false,
    id: uniqueId(),
    nodes: [
      {
        value: 'Chief Executive Officer (CEO)',
        text: 'Chief Executive Officer (CEO)',
        status: false,
        id: uniqueId(),
        nodes: [
          {
            value: 'Chief Operating Officer (COO)',
            text: 'Chief Operating Officer (COO)',
            status: false,
            id: uniqueId(),
            nodes: [
              {
                value: 'President',
                text: 'President',
                status: false,
                id: uniqueId(),
                nodes: [
                  {
                    value: 'Executive Vice President',
                    text: 'Executive Vice President',
                    status: false,
                    id: uniqueId(),
                    nodes: [
                      {
                        value: 'Senior Vice President',
                        text: 'Senior Vice President',
                        status: false,
                        id: uniqueId(),
                        nodes: [
                          {
                            value: 'Vice President',
                            text: 'Vice President',
                            status: false,
                            id: uniqueId(),
                            nodes: [
                              {
                                value: 'Assistant Vice President',
                                text: 'Assistant Vice President',
                                status: false,
                                id: uniqueId(),
                                nodes: [
                                  {
                                    value: 'Associate Vice President',
                                    text: 'Associate Vice President',
                                    status: false,
                                    id: uniqueId(),
                                    nodes: [
                                      {
                                        value: 'Senior Director',
                                        text: 'Senior Director',
                                        status: false,
                                        id: uniqueId(),
                                        nodes: [
                                          {
                                            value: 'Assistant Director',
                                            text: 'Assistant Director',
                                            status: false,
                                            id: uniqueId(),
                                            nodes: [
                                              {
                                                value: 'Manager',
                                                text: 'Manager',
                                                status: false,
                                                id: uniqueId(),
                                                nodes: [
                                                  {
                                                    value: 'Middle Manager',
                                                    text: 'Middle Manager',
                                                    status: false,
                                                    id: uniqueId(),
                                                    nodes: [
                                                      {
                                                        value:
                                                          'Permanent employees',
                                                        text: 'Permanent employees',
                                                        status: false,
                                                        id: uniqueId(),
                                                        nodes: [],
                                                      },
                                                      {
                                                        value:
                                                          'Contract employees',
                                                        text: 'Contract employees',
                                                        status: false,
                                                        id: uniqueId(),
                                                        nodes: [],
                                                      },
                                                      {
                                                        value:
                                                          'Part-time employees',
                                                        text: 'Part-time employees',
                                                        status: false,
                                                        id: uniqueId(),
                                                        nodes: [],
                                                      },
                                                      {
                                                        value: 'Freelancers',
                                                        text: 'Freelancers',
                                                        status: false,
                                                        id: uniqueId(),
                                                        nodes: [],
                                                      },
                                                      {
                                                        value:
                                                          'Contingent  employees',
                                                        text: 'Contingent  employees',
                                                        status: false,
                                                        id: uniqueId(),
                                                        nodes: [],
                                                      },
                                                    ],
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    value: 'functions',
    text: 'functions',
    status: false,
    id: uniqueId(),
    nodes: [],
  },
];

export default nodes;
