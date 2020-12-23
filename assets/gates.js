function setGates(){

    _.gatePrototypes = [
        [
            "CLOCK",
            {
                "id": "c1",
                "type": "CLOCK",
                "name": "CLOCK",
                "W": 100,
                "H": 30,
                "inputs": [],
                "outputs": [
                    {
                        "id": "output1",
                        "name": "OUTPUT",
                        "pos": {
                            "left": 1,
                            "top": 0.5
                        }
                    }
                ]
            }
        ],
        [
            "LED",
            {
                "id": "l1",
                "type": "LED",
                "name": "LED",
                "W": 25,
                "H": 25,
                "inputs": [
                    {
                        "id": "input1",
                        "name": "INPUT1",
                        "pos": {
                            "left": 0.5,
                            "top": 0
                        }
                    }
                ],
                "outputs": []
            }
        ],
        [
            "NAND",
            {
                "id": "g3",
                "type": "NAND",
                "name": "NAND",
                "W": 70,
                "H": 70,
                "inputs": [
                    {
                        "id": "input1",
                        "name": "INPUT1",
                        "pos": {
                            "left": 0,
                            "top": 0.3
                        }
                    },
                    {
                        "id": "input2",
                        "name": "INPUT2",
                        "pos": {
                            "left": 0,
                            "top": 0.7
                        }
                    }
                ],
                "outputs": [
                    {
                        "id": "output1",
                        "name": "OUTPUT",
                        "pos": {
                            "left": 1,
                            "top": 0.5
                        }
                    }
                ]
            }
        ]
    ];

    addOtherGates();
}


function addOtherGates(){
    _.gatePrototypes = _.gatePrototypes.concat(
        [
            [
                "NOT",
                {
                    "name": "NOT",
                    "type": "IC",
                    "inputs": [
                        {
                            "id": "input0",
                            "name": "INPUT0",
                            "pos": {
                                "left": 0,
                                "top": 0.5
                            }
                        }
                    ],
                    "outputs": [
                        {
                            "id": "output0",
                            "name": "OUTPUT0",
                            "pos": {
                                "left": 1,
                                "top": 0.5
                            },
                            "data": "g0.output1"
                        }
                    ],
                    "gates": [
                        {
                            "id": "g0",
                            "type": "NAND",
                            "name": "NAND",
                            "W": 70,
                            "H": 70,
                            "pos": {
                                "left": 0.36,
                                "top": 0.39
                            },
                            "inputsData": [
                                {
                                    "id": "input1",
                                    "data": "input0"
                                },
                                {
                                    "id": "input2",
                                    "data": "input0"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output1"
                                }
                            ]
                        }
                    ],
                    "W": 70,
                    "H": 30
                }
            ],
            [
                "OR",
                {
                    "name": "OR",
                    "type": "IC",
                    "inputs": [
                        {
                            "id": "input0",
                            "name": "INPUT0",
                            "pos": {
                                "left": 0,
                                "top": 0.33
                            }
                        },
                        {
                            "id": "input1",
                            "name": "INPUT1",
                            "pos": {
                                "left": 0,
                                "top": 0.67
                            }
                        }
                    ],
                    "outputs": [
                        {
                            "id": "output0",
                            "name": "OUTPUT0",
                            "pos": {
                                "left": 1,
                                "top": 0.5
                            },
                            "data": "g2.output1"
                        }
                    ],
                    "gates": [
                        {
                            "name": "NOT",
                            "type": "IC",
                            "W": 70,
                            "H": 30,
                            "id": "g0",
                            "pos": {
                                "left": 0.1,
                                "top": 0.32
                            },
                            "inputsData": [
                                {
                                    "id": "input0",
                                    "data": "input0"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output0",
                                    "data": "g0.output1"
                                }
                            ]
                        },
                        {
                            "name": "NOT",
                            "type": "IC",
                            "W": 70,
                            "H": 30,
                            "id": "g1",
                            "pos": {
                                "left": 0.09,
                                "top": 0.62
                            },
                            "inputsData": [
                                {
                                    "id": "input0",
                                    "data": "input1"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output0",
                                    "data": "g0.output1"
                                }
                            ]
                        },
                        {
                            "id": "g2",
                            "type": "NAND",
                            "name": "NAND",
                            "W": 70,
                            "H": 70,
                            "pos": {
                                "left": 0.33,
                                "top": 0.45
                            },
                            "inputsData": [
                                {
                                    "id": "input1",
                                    "data": "g0.output0"
                                },
                                {
                                    "id": "input2",
                                    "data": "g1.output0"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output1"
                                }
                            ]
                        }
                    ],
                    "W": 70,
                    "H": 66
                }
            ],
            [
                "XOR",
                {
                    "name": "XOR",
                    "type": "IC",
                    "inputs": [
                        {
                            "id": "input0",
                            "name": "INPUT0",
                            "pos": {
                                "left": 0,
                                "top": 0.33
                            }
                        },
                        {
                            "id": "input1",
                            "name": "INPUT1",
                            "pos": {
                                "left": 0,
                                "top": 0.67
                            }
                        }
                    ],
                    "outputs": [
                        {
                            "id": "output0",
                            "name": "OUTPUT0",
                            "pos": {
                                "left": 1,
                                "top": 0.5
                            },
                            "data": "g4.output1"
                        }
                    ],
                    "gates": [
                        {
                            "name": "NOT",
                            "type": "IC",
                            "W": 70,
                            "H": 30,
                            "id": "g0",
                            "pos": {
                                "left": 0.15,
                                "top": 0.31
                            },
                            "inputsData": [
                                {
                                    "id": "input0",
                                    "data": "input0"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output0",
                                    "data": "g0.output1"
                                }
                            ]
                        },
                        {
                            "name": "NOT",
                            "type": "IC",
                            "W": 70,
                            "H": 30,
                            "id": "g1",
                            "pos": {
                                "left": 0.15,
                                "top": 0.63
                            },
                            "inputsData": [
                                {
                                    "id": "input0",
                                    "data": "input1"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output0",
                                    "data": "g0.output1"
                                }
                            ]
                        },
                        {
                            "id": "g2",
                            "type": "NAND",
                            "name": "NAND",
                            "W": 70,
                            "H": 70,
                            "pos": {
                                "left": 0.37,
                                "top": 0.49
                            },
                            "inputsData": [
                                {
                                    "id": "input1",
                                    "data": "input0"
                                },
                                {
                                    "id": "input2",
                                    "data": "g1.output0"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output1"
                                }
                            ]
                        },
                        {
                            "id": "g3",
                            "type": "NAND",
                            "name": "NAND",
                            "W": 70,
                            "H": 70,
                            "pos": {
                                "left": 0.37,
                                "top": 0.34
                            },
                            "inputsData": [
                                {
                                    "id": "input1",
                                    "data": "g0.output0"
                                },
                                {
                                    "id": "input2",
                                    "data": "input1"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output1"
                                }
                            ]
                        },
                        {
                            "id": "g4",
                            "type": "NAND",
                            "name": "NAND",
                            "W": 70,
                            "H": 70,
                            "pos": {
                                "left": 0.66,
                                "top": 0.43
                            },
                            "inputsData": [
                                {
                                    "id": "input1",
                                    "data": "g3.output1"
                                },
                                {
                                    "id": "input2",
                                    "data": "g2.output1"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output1"
                                }
                            ]
                        }
                    ],
                    "W": 70,
                    "H": 66
                }
            ],
            [
                "M",
                {
                    "name": "M",
                    "type": "IC",
                    "inputs": [
                        {
                            "id": "input0",
                            "name": "INPUT0",
                            "pos": {
                                "left": 0,
                                "top": 0.24
                            }
                        },
                        {
                            "id": "input1",
                            "name": "INPUT1",
                            "pos": {
                                "left": 0,
                                "top": 0.77
                            }
                        }
                    ],
                    "outputs": [
                        {
                            "id": "output0",
                            "name": "OUTPUT0",
                            "pos": {
                                "left": 1,
                                "top": 0.22
                            },
                            "data": "g2.output1"
                        }
                    ],
                    "gates": [
                        {
                            "id": "g0",
                            "type": "NAND",
                            "name": "NAND",
                            "W": 70,
                            "H": 70,
                            "pos": {
                                "left": 0.64,
                                "top": 0.5
                            },
                            "inputsData": [
                                {
                                    "id": "input1",
                                    "data": "g2.output1"
                                },
                                {
                                    "id": "input2",
                                    "data": "g3.output1"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output1"
                                }
                            ]
                        },
                        {
                            "id": "g1",
                            "type": "NAND",
                            "name": "NAND",
                            "W": 70,
                            "H": 70,
                            "pos": {
                                "left": 0.17,
                                "top": 0.31
                            },
                            "inputsData": [
                                {
                                    "id": "input1",
                                    "data": "input0"
                                },
                                {
                                    "id": "input2",
                                    "data": "input1"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output1"
                                }
                            ]
                        },
                        {
                            "id": "g2",
                            "type": "NAND",
                            "name": "NAND",
                            "W": 70,
                            "H": 70,
                            "pos": {
                                "left": 0.65,
                                "top": 0.33
                            },
                            "inputsData": [
                                {
                                    "id": "input1",
                                    "data": "g1.output1"
                                },
                                {
                                    "id": "input2",
                                    "data": "g0.output1"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output1"
                                }
                            ]
                        },
                        {
                            "id": "g3",
                            "type": "NAND",
                            "name": "NAND",
                            "W": 70,
                            "H": 70,
                            "pos": {
                                "left": 0.28,
                                "top": 0.57
                            },
                            "inputsData": [
                                {
                                    "id": "input1",
                                    "data": "g1.output1"
                                },
                                {
                                    "id": "input2",
                                    "data": "input1"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output1"
                                }
                            ]
                        }
                    ],
                    "W": 70,
                    "H": 44
                }
            ]
        ]

    );
}