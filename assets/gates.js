function setGates() {

    _.gatePrototypes = [
        [
            "CLOCK",
            {
                "id": "c1",
                "type": "CLOCK",
                "name": "CLOCK",
                "W": 100,
                "H": 30,
                "pins": [
                    {
                        "id": "pin_1",
                        "name": "PIN",
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
                "pins": [
                    {
                        "id": "pin_2",
                        "name": "PIN1",
                        "pos": {
                            "left": 0.5,
                            "top": 0
                        }
                    }
                ]
            }
        ],
        get2InputGate("AND"),
        get2InputGate("OR"),
        get2InputGate("XOR"),
        get2InputGate("NAND"),
        get2InputGate("NOR"),
        get2InputGate("XNOR"),
        get1InputGate("NOT"),
        get1InputGate("BUF")
    ];

    addOtherGates();
}

function get2InputGate(type){
    return [
            type,
            {
                "id": "g4",
                "type": type,
                "name": type,
                "W": 70,
                "H": 70,
                "pins": [
                    {
                        "id": "pin_3",
                        "type": "PIN_IN",
                        "name": "PIN1",
                        "pos": {
                            "left": 0,
                            "top": 0.3
                        }
                    },
                    {
                        "id": "pin_4",
                        "type": "PIN_IN",
                        "name": "PIN2",
                        "pos": {
                            "left": 0,
                            "top": 0.7
                        }
                    },
                    {
                        "id": "pin_5",
                        "type": "PIN_OUT",
                        "name": "PIN3",
                        "pos": {
                            "left": 1,
                            "top": 0.5
                        }
                    }
                ]
            }
        ]
}


function get1InputGate(type){
    return [
            type,
            {
                "id": "g5",
                "type": type,
                "name": type,
                "W": 70,
                "H": 70,
                "pins": [
                    {
                        "id": "pin_3",
                        "type": "PIN_IN",
                        "name": "PIN1",
                        "pos": {
                            "left": 0,
                            "top": 0.5
                        }
                    },
                    {
                        "id": "pin_5",
                        "type": "PIN_OUT",
                        "name": "PIN3",
                        "pos": {
                            "left": 1,
                            "top": 0.5
                        }
                    }
                ]
            }
        ]
}


function addOtherGates() {
    _.gatePrototypes = _.gatePrototypes.concat(
[
]        
    );
}