import { Expression } from "./types";

export const initialEquation: Expression = {
  operator: "*",
  args: [
    {
      operator: "+",
      args: [
        {
          operator: "*",
          args: [
            {
              operator: "^",
              args: [
                {
                  operator: "+",
                  args: [
                    "a_{1}",
                    "a_{6}",
                    1n,
                    { operator: "*", args: [-1n, "x_{4}"] },
                  ],
                },
                2n,
              ],
            },
            {
              operator: "+",
              args: [
                {
                  operator: "^",
                  args: [
                    {
                      operator: "+",
                      args: [
                        {
                          operator: "^",
                          args: [
                            { operator: "+", args: ["a_{6}", "a_{7}"] },
                            2n,
                          ],
                        },
                        { operator: "*", args: [3n, "a_{7}"] },
                        "a_{6}",
                        { operator: "*", args: [-2n, "x_{4}"] },
                      ],
                    },
                    2n,
                  ],
                },
                {
                  operator: "^",
                  args: [
                    {
                      operator: "+",
                      args: [
                        {
                          operator: "*",
                          args: [
                            {
                              operator: "+",
                              args: [
                                {
                                  operator: "^",
                                  args: [
                                    {
                                      operator: "+",
                                      args: [
                                        "x_{9}",
                                        {
                                          operator: "*",
                                          args: [-1n, "a_{7}"],
                                        },
                                      ],
                                    },
                                    2n,
                                  ],
                                },
                                {
                                  operator: "^",
                                  args: [
                                    {
                                      operator: "+",
                                      args: [
                                        "x_{10}",
                                        {
                                          operator: "*",
                                          args: [-1n, "a_{9}"],
                                        },
                                      ],
                                    },
                                    2n,
                                  ],
                                },
                              ],
                            },
                            {
                              operator: "+",
                              args: [
                                {
                                  operator: "^",
                                  args: [
                                    {
                                      operator: "+",
                                      args: [
                                        "x_{9}",
                                        {
                                          operator: "*",
                                          args: [-1n, "a_{6}"],
                                        },
                                      ],
                                    },
                                    2n,
                                  ],
                                },
                                {
                                  operator: "*",
                                  args: [
                                    {
                                      operator: "^",
                                      args: [
                                        {
                                          operator: "+",
                                          args: [
                                            "x_{10}",
                                            {
                                              operator: "*",
                                              args: [-1n, "a_{8}"],
                                            },
                                          ],
                                        },
                                        2n,
                                      ],
                                    },
                                    {
                                      operator: "+",
                                      args: [
                                        {
                                          operator: "^",
                                          args: [
                                            {
                                              operator: "+",
                                              args: [
                                                "x_{4}",
                                                {
                                                  operator: "*",
                                                  args: [-1n, "a_{1}"],
                                                },
                                              ],
                                            },
                                            2n,
                                          ],
                                        },
                                        {
                                          operator: "^",
                                          args: [
                                            {
                                              operator: "+",
                                              args: [
                                                "x_{10}",
                                                {
                                                  operator: "*",
                                                  args: [-1n, "a_{9}"],
                                                },
                                                {
                                                  operator: "*",
                                                  args: [-1n, "x_{1}"],
                                                },
                                              ],
                                            },
                                            2n,
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              operator: "+",
                              args: [
                                {
                                  operator: "^",
                                  args: [
                                    {
                                      operator: "+",
                                      args: [
                                        "x_{9}",
                                        {
                                          operator: "*",
                                          args: [-3n, "x_{4}"],
                                        },
                                      ],
                                    },
                                    2n,
                                  ],
                                },
                                {
                                  operator: "^",
                                  args: [
                                    {
                                      operator: "+",
                                      args: [
                                        "x_{10}",
                                        {
                                          operator: "*",
                                          args: [-1n, "a_{8}"],
                                        },
                                        {
                                          operator: "*",
                                          args: [-1n, "a_{9}"],
                                        },
                                      ],
                                    },
                                    2n,
                                  ],
                                },
                              ],
                            },
                            {
                              operator: "+",
                              args: [
                                {
                                  operator: "^",
                                  args: [
                                    {
                                      operator: "+",
                                      args: [
                                        "x_{9}",
                                        {
                                          operator: "*",
                                          args: [-3n, "x_{4}"],
                                        },
                                        -1n,
                                      ],
                                    },
                                    2n,
                                  ],
                                },
                                {
                                  operator: "^",
                                  args: [
                                    {
                                      operator: "+",
                                      args: [
                                        "x_{10}",
                                        {
                                          operator: "*",
                                          args: [-1n, "a_{8}", "a_{9}"],
                                        },
                                      ],
                                    },
                                    2n,
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        { operator: "*", args: [-1n, "a_{12}"] },
                        -1n,
                      ],
                    },
                    2n,
                  ],
                },
                {
                  operator: "^",
                  args: [
                    {
                      operator: "+",
                      args: [
                        "x_{10}",
                        "a_{12}",
                        { operator: "*", args: ["a_{12}", "x_{9}", "a_{4}"] },
                        { operator: "*", args: [-1n, "a_{3}"] },
                      ],
                    },
                    2n,
                  ],
                },
                {
                  operator: "^",
                  args: [
                    {
                      operator: "+",
                      args: [
                        "x_{5}",
                        "a_{13}",
                        { operator: "*", args: [-1n, "x_{9}", "a_{4}"] },
                      ],
                    },
                    2n,
                  ],
                },
              ],
            },
          ],
        },
        { operator: "*", args: [-1n, "x_{13}"] },
        -1n,
      ],
    },
    {
      operator: "+",
      args: ["a_{1}", "x_{5}", 1n, { operator: "*", args: [-1n, "a_{5}"] }],
    },
    {
      operator: "+",
      args: [
        {
          operator: "^",
          args: [
            {
              operator: "+",
              args: [
                {
                  operator: "^",
                  args: [
                    {
                      operator: "+",
                      args: ["x_{5}", { operator: "*", args: [-1n, "x_{6}"] }],
                    },
                    2n,
                  ],
                },
                { operator: "*", args: [3n, "x_{6}"] },
                "x_{5}",
                { operator: "*", args: [-2n, "a_{5}"] },
              ],
            },
            2n,
          ],
        },
        {
          operator: "^",
          args: [
            {
              operator: "+",
              args: [
                {
                  operator: "*",
                  args: [
                    {
                      operator: "+",
                      args: [
                        {
                          operator: "^",
                          args: [
                            {
                              operator: "+",
                              args: [
                                "a_{10}",
                                { operator: "*", args: [-1n, "x_{6}"] },
                              ],
                            },
                            2n,
                          ],
                        },
                        {
                          operator: "^",
                          args: [
                            {
                              operator: "+",
                              args: [
                                "a_{11}",
                                { operator: "*", args: [-1n, "x_{8}"] },
                              ],
                            },
                            2n,
                          ],
                        },
                      ],
                    },
                    {
                      operator: "+",
                      args: [
                        {
                          operator: "^",
                          args: [
                            {
                              operator: "+",
                              args: [
                                "a_{10}",
                                { operator: "*", args: [-1n, "x_{5}"] },
                              ],
                            },
                            2n,
                          ],
                        },
                        {
                          operator: "*",
                          args: [
                            {
                              operator: "^",
                              args: [
                                {
                                  operator: "+",
                                  args: [
                                    "a_{11}",
                                    { operator: "*", args: [-1n, "x_{7}"] },
                                  ],
                                },
                                2n,
                              ],
                            },
                            {
                              operator: "+",
                              args: [
                                {
                                  operator: "^",
                                  args: [
                                    {
                                      operator: "+",
                                      args: [
                                        "a_{5}",
                                        {
                                          operator: "*",
                                          args: [-1n, "a_{1}"],
                                        },
                                      ],
                                    },
                                    2n,
                                  ],
                                },
                                {
                                  operator: "^",
                                  args: [
                                    {
                                      operator: "+",
                                      args: [
                                        "a_{11}",
                                        {
                                          operator: "*",
                                          args: [-1n, "x_{8}"],
                                        },
                                        {
                                          operator: "*",
                                          args: [-1n, "a_{2}"],
                                        },
                                      ],
                                    },
                                    2n,
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      operator: "+",
                      args: [
                        {
                          operator: "^",
                          args: [
                            {
                              operator: "+",
                              args: [
                                "a_{10}",
                                { operator: "*", args: [-3n, "a_{5}"] },
                              ],
                            },
                            2n,
                          ],
                        },
                        {
                          operator: "^",
                          args: [
                            {
                              operator: "+",
                              args: [
                                "a_{11}",
                                { operator: "*", args: [-1n, "x_{7}"] },
                                { operator: "*", args: [-1n, "x_{8}"] },
                              ],
                            },
                            2n,
                          ],
                        },
                      ],
                    },
                    {
                      operator: "+",
                      args: [
                        {
                          operator: "^",
                          args: [
                            {
                              operator: "+",
                              args: [
                                "a_{10}",
                                { operator: "*", args: [-3n, "a_{5}"] },
                                -1n,
                              ],
                            },
                            2n,
                          ],
                        },
                        {
                          operator: "^",
                          args: [
                            {
                              operator: "+",
                              args: [
                                "a_{11}",
                                {
                                  operator: "*",
                                  args: [-1n, "x_{7}", "x_{8}"],
                                },
                              ],
                            },
                            2n,
                          ],
                        },
                      ],
                    },
                  ],
                },
                { operator: "*", args: [-1n, "x_{11}"] },
                -1n,
              ],
            },
            2n,
          ],
        },
        {
          operator: "^",
          args: [
            {
              operator: "+",
              args: [
                "a_{11}",
                "x_{11}",
                { operator: "*", args: ["x_{11}", "a_{10}", "x_{3}"] },
                { operator: "*", args: [-1n, "x_{2}"] },
              ],
            },
            2n,
          ],
        },
        {
          operator: "^",
          args: [
            {
              operator: "+",
              args: [
                "a_{11}",
                "x_{12}",
                { operator: "*", args: [-1n, "a_{10}", "x_{3}"] },
              ],
            },
            2n,
          ],
        },
      ],
    },
  ],
};
