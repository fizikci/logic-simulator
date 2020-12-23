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
                "AND",
                {
                    "name": "AND",
                    "type": "IC",
                    "inputs": [
                        {
                            "id": "input0",
                            "name": "INPUT0",
                            "pos": {
                                "left": 0.01,
                                "top": 0.36
                            }
                        },
                        {
                            "id": "input1",
                            "name": "INPUT1",
                            "pos": {
                                "left": 0.01,
                                "top": 0.69
                            }
                        }
                    ],
                    "outputs": [
                        {
                            "id": "output0",
                            "name": "OUTPUT0",
                            "pos": {
                                "left": 0.98,
                                "top": 0.5
                            },
                            "data": "g1.output0"
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
                                "left": 0.2,
                                "top": 0.47
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
                            "name": "NOT",
                            "type": "IC",
                            "W": 70,
                            "H": 30,
                            "id": "g1",
                            "pos": {
                                "left": 0.53,
                                "top": 0.47
                            },
                            "inputsData": [
                                {
                                    "id": "input0",
                                    "data": "g0.output1"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output0",
                                    "data": "g0.output1"
                                }
                            ]
                        }
                    ],
                    "W": 70,
                    "H": 66
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
            ],
            [
                "REG",
                {
                    "name": "REG",
                    "type": "IC",
                    "inputs": [
                        {
                            "id": "input0",
                            "name": "INPUT0",
                            "pos": {
                                "left": 0.09,
                                "top": 0.09
                            }
                        },
                        {
                            "id": "input1",
                            "name": "INPUT1",
                            "pos": {
                                "left": 0.09,
                                "top": 0.18
                            }
                        },
                        {
                            "id": "input2",
                            "name": "INPUT2",
                            "pos": {
                                "left": 0.09,
                                "top": 0.27
                            }
                        },
                        {
                            "id": "input3",
                            "name": "INPUT3",
                            "pos": {
                                "left": 0.09,
                                "top": 0.36
                            }
                        },
                        {
                            "id": "input4",
                            "name": "INPUT4",
                            "pos": {
                                "left": 0.09,
                                "top": 0.45
                            }
                        },
                        {
                            "id": "input5",
                            "name": "INPUT5",
                            "pos": {
                                "left": 0.09,
                                "top": 0.55
                            }
                        },
                        {
                            "id": "input6",
                            "name": "INPUT6",
                            "pos": {
                                "left": 0.09,
                                "top": 0.64
                            }
                        },
                        {
                            "id": "input7",
                            "name": "INPUT7",
                            "pos": {
                                "left": 0.09,
                                "top": 0.73
                            }
                        },
                        {
                            "id": "input8",
                            "name": "INPUT8",
                            "pos": {
                                "left": 0.09,
                                "top": 0.82
                            }
                        },
                        {
                            "id": "input9",
                            "name": "INPUT9",
                            "pos": {
                                "left": 0.09,
                                "top": 0.91
                            }
                        }
                    ],
                    "outputs": [
                        {
                            "id": "output0",
                            "name": "OUTPUT0",
                            "pos": {
                                "left": 0.97,
                                "top": 0.1
                            },
                            "data": "g8.output0"
                        },
                        {
                            "id": "output1",
                            "name": "OUTPUT1",
                            "pos": {
                                "left": 0.97,
                                "top": 0.2
                            },
                            "data": "g9.output0"
                        },
                        {
                            "id": "output2",
                            "name": "OUTPUT2",
                            "pos": {
                                "left": 0.97,
                                "top": 0.3
                            },
                            "data": "g10.output0"
                        },
                        {
                            "id": "output3",
                            "name": "OUTPUT3",
                            "pos": {
                                "left": 0.97,
                                "top": 0.4
                            },
                            "data": "g11.output0"
                        },
                        {
                            "id": "output4",
                            "name": "OUTPUT4",
                            "pos": {
                                "left": 0.97,
                                "top": 0.5
                            },
                            "data": "g12.output0"
                        },
                        {
                            "id": "output5",
                            "name": "OUTPUT5",
                            "pos": {
                                "left": 0.97,
                                "top": 0.6
                            },
                            "data": "g13.output0"
                        },
                        {
                            "id": "output6",
                            "name": "OUTPUT6",
                            "pos": {
                                "left": 0.97,
                                "top": 0.7
                            },
                            "data": "g14.output0"
                        },
                        {
                            "id": "output7",
                            "name": "OUTPUT7",
                            "pos": {
                                "left": 0.97,
                                "top": 0.8
                            },
                            "data": "g15.output0"
                        }
                    ],
                    "gates": [
                        {
                            "name": "M",
                            "type": "IC",
                            "W": 70,
                            "H": 44,
                            "id": "g0",
                            "pos": {
                                "left": 0.22,
                                "top": 0.07
                            },
                            "inputsData": [
                                {
                                    "id": "input0",
                                    "data": "input0"
                                },
                                {
                                    "id": "input1",
                                    "data": "input8"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output0",
                                    "data": "g2.output1"
                                }
                            ]
                        },
                        {
                            "name": "M",
                            "type": "IC",
                            "W": 70,
                            "H": 44,
                            "id": "g1",
                            "pos": {
                                "left": 0.22,
                                "top": 0.16
                            },
                            "inputsData": [
                                {
                                    "id": "input0",
                                    "data": "input1"
                                },
                                {
                                    "id": "input1",
                                    "data": "input8"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output0",
                                    "data": "g2.output1"
                                }
                            ]
                        },
                        {
                            "name": "M",
                            "type": "IC",
                            "W": 70,
                            "H": 44,
                            "id": "g2",
                            "pos": {
                                "left": 0.22,
                                "top": 0.25
                            },
                            "inputsData": [
                                {
                                    "id": "input0",
                                    "data": "input2"
                                },
                                {
                                    "id": "input1",
                                    "data": "input8"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output0",
                                    "data": "g2.output1"
                                }
                            ]
                        },
                        {
                            "name": "M",
                            "type": "IC",
                            "W": 70,
                            "H": 44,
                            "id": "g3",
                            "pos": {
                                "left": 0.22,
                                "top": 0.34
                            },
                            "inputsData": [
                                {
                                    "id": "input0",
                                    "data": "input3"
                                },
                                {
                                    "id": "input1",
                                    "data": "input8"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output0",
                                    "data": "g2.output1"
                                }
                            ]
                        },
                        {
                            "name": "M",
                            "type": "IC",
                            "W": 70,
                            "H": 44,
                            "id": "g4",
                            "pos": {
                                "left": 0.22,
                                "top": 0.43
                            },
                            "inputsData": [
                                {
                                    "id": "input0",
                                    "data": "input4"
                                },
                                {
                                    "id": "input1",
                                    "data": "input8"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output0",
                                    "data": "g2.output1"
                                }
                            ]
                        },
                        {
                            "name": "M",
                            "type": "IC",
                            "W": 70,
                            "H": 44,
                            "id": "g5",
                            "pos": {
                                "left": 0.22,
                                "top": 0.52
                            },
                            "inputsData": [
                                {
                                    "id": "input0",
                                    "data": "input5"
                                },
                                {
                                    "id": "input1",
                                    "data": "input8"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output0",
                                    "data": "g2.output1"
                                }
                            ]
                        },
                        {
                            "name": "M",
                            "type": "IC",
                            "W": 70,
                            "H": 44,
                            "id": "g6",
                            "pos": {
                                "left": 0.22,
                                "top": 0.6
                            },
                            "inputsData": [
                                {
                                    "id": "input0",
                                    "data": "input6"
                                },
                                {
                                    "id": "input1",
                                    "data": "input8"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output0",
                                    "data": "g2.output1"
                                }
                            ]
                        },
                        {
                            "name": "M",
                            "type": "IC",
                            "W": 70,
                            "H": 44,
                            "id": "g7",
                            "pos": {
                                "left": 0.22,
                                "top": 0.67
                            },
                            "inputsData": [
                                {
                                    "id": "input0",
                                    "data": "input7"
                                },
                                {
                                    "id": "input1",
                                    "data": "input8"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output0",
                                    "data": "g2.output1"
                                }
                            ]
                        },
                        {
                            "name": "AND",
                            "type": "IC",
                            "W": 70,
                            "H": 66,
                            "id": "g8",
                            "pos": {
                                "left": 0.56,
                                "top": 0.05
                            },
                            "inputsData": [
                                {
                                    "id": "input0",
                                    "data": "g0.output0"
                                },
                                {
                                    "id": "input1",
                                    "data": "input9"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output0",
                                    "data": "g1.output0"
                                }
                            ]
                        },
                        {
                            "name": "AND",
                            "type": "IC",
                            "W": 70,
                            "H": 66,
                            "id": "g9",
                            "pos": {
                                "left": 0.56,
                                "top": 0.14
                            },
                            "inputsData": [
                                {
                                    "id": "input0",
                                    "data": "g1.output0"
                                },
                                {
                                    "id": "input1",
                                    "data": "input9"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output0",
                                    "data": "g1.output0"
                                }
                            ]
                        },
                        {
                            "name": "AND",
                            "type": "IC",
                            "W": 70,
                            "H": 66,
                            "id": "g10",
                            "pos": {
                                "left": 0.56,
                                "top": 0.23
                            },
                            "inputsData": [
                                {
                                    "id": "input0",
                                    "data": "g2.output0"
                                },
                                {
                                    "id": "input1",
                                    "data": "input9"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output0",
                                    "data": "g1.output0"
                                }
                            ]
                        },
                        {
                            "name": "AND",
                            "type": "IC",
                            "W": 70,
                            "H": 66,
                            "id": "g11",
                            "pos": {
                                "left": 0.56,
                                "top": 0.32
                            },
                            "inputsData": [
                                {
                                    "id": "input0",
                                    "data": "g3.output0"
                                },
                                {
                                    "id": "input1",
                                    "data": "input9"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output0",
                                    "data": "g1.output0"
                                }
                            ]
                        },
                        {
                            "name": "AND",
                            "type": "IC",
                            "W": 70,
                            "H": 66,
                            "id": "g12",
                            "pos": {
                                "left": 0.56,
                                "top": 0.41
                            },
                            "inputsData": [
                                {
                                    "id": "input0",
                                    "data": "g4.output0"
                                },
                                {
                                    "id": "input1",
                                    "data": "input9"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output0",
                                    "data": "g1.output0"
                                }
                            ]
                        },
                        {
                            "name": "AND",
                            "type": "IC",
                            "W": 70,
                            "H": 66,
                            "id": "g13",
                            "pos": {
                                "left": 0.56,
                                "top": 0.5
                            },
                            "inputsData": [
                                {
                                    "id": "input0",
                                    "data": "g5.output0"
                                },
                                {
                                    "id": "input1",
                                    "data": "input9"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output0",
                                    "data": "g1.output0"
                                }
                            ]
                        },
                        {
                            "name": "AND",
                            "type": "IC",
                            "W": 70,
                            "H": 66,
                            "id": "g14",
                            "pos": {
                                "left": 0.56,
                                "top": 0.59
                            },
                            "inputsData": [
                                {
                                    "id": "input0",
                                    "data": "g6.output0"
                                },
                                {
                                    "id": "input1",
                                    "data": "input9"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output0",
                                    "data": "g1.output0"
                                }
                            ]
                        },
                        {
                            "name": "AND",
                            "type": "IC",
                            "W": 70,
                            "H": 66,
                            "id": "g15",
                            "pos": {
                                "left": 0.56,
                                "top": 0.68
                            },
                            "inputsData": [
                                {
                                    "id": "input0",
                                    "data": "g7.output0"
                                },
                                {
                                    "id": "input1",
                                    "data": "input9"
                                }
                            ],
                            "outputsData": [
                                {
                                    "id": "output0",
                                    "data": "g1.output0"
                                }
                            ]
                        },
                        {
                            "id": "g16",
                            "type": "LED",
                            "name": "LED",
                            "W": 25,
                            "H": 25,
                            "pos": {
                                "left": 0.21,
                                "top": 0.86
                            },
                            "inputsData": [
                                {
                                    "id": "input1",
                                    "data": "g0.output0"
                                }
                            ],
                            "outputsData": []
                        },
                        {
                            "id": "g17",
                            "type": "LED",
                            "name": "LED",
                            "W": 25,
                            "H": 25,
                            "pos": {
                                "left": 0.3,
                                "top": 0.86
                            },
                            "inputsData": [
                                {
                                    "id": "input1",
                                    "data": "g1.output0"
                                }
                            ],
                            "outputsData": []
                        },
                        {
                            "id": "g18",
                            "type": "LED",
                            "name": "LED",
                            "W": 25,
                            "H": 25,
                            "pos": {
                                "left": 0.39,
                                "top": 0.86
                            },
                            "inputsData": [
                                {
                                    "id": "input1",
                                    "data": "g2.output0"
                                }
                            ],
                            "outputsData": []
                        },
                        {
                            "id": "g19",
                            "type": "LED",
                            "name": "LED",
                            "W": 25,
                            "H": 25,
                            "pos": {
                                "left": 0.48,
                                "top": 0.86
                            },
                            "inputsData": [
                                {
                                    "id": "input1",
                                    "data": "g3.output0"
                                }
                            ],
                            "outputsData": []
                        },
                        {
                            "id": "g20",
                            "type": "LED",
                            "name": "LED",
                            "W": 25,
                            "H": 25,
                            "pos": {
                                "left": 0.57,
                                "top": 0.86
                            },
                            "inputsData": [
                                {
                                    "id": "input1",
                                    "data": "g4.output0"
                                }
                            ],
                            "outputsData": []
                        },
                        {
                            "id": "g21",
                            "type": "LED",
                            "name": "LED",
                            "W": 25,
                            "H": 25,
                            "pos": {
                                "left": 0.66,
                                "top": 0.86
                            },
                            "inputsData": [
                                {
                                    "id": "input1",
                                    "data": "g5.output0"
                                }
                            ],
                            "outputsData": []
                        },
                        {
                            "id": "g22",
                            "type": "LED",
                            "name": "LED",
                            "W": 25,
                            "H": 25,
                            "pos": {
                                "left": 0.75,
                                "top": 0.86
                            },
                            "inputsData": [
                                {
                                    "id": "input1",
                                    "data": "g6.output0"
                                }
                            ],
                            "outputsData": []
                        },
                        {
                            "id": "g23",
                            "type": "LED",
                            "name": "LED",
                            "W": 25,
                            "H": 25,
                            "pos": {
                                "left": 0.84,
                                "top": 0.86
                            },
                            "inputsData": [
                                {
                                    "id": "input1",
                                    "data": "g7.output0"
                                }
                            ],
                            "outputsData": []
                        }
                    ],
                    "W": 198,
                    "H": 209
                }
            ]
        ]

    );
}