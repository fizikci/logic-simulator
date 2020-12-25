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
                "pins": [
                    {
                        "id": "pin1",
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
                        "id": "pin1",
                        "name": "PIN1",
                        "pos": {
                            "left": 0.5,
                            "top": 0
                        }
                    }
                ]
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
                "pins": [
                    {
                        "id": "pin1",
                        "name": "PIN1",
                        "pos": {
                            "left": 0,
                            "top": 0.3
                        }
                    },
                    {
                        "id": "pin2",
                        "name": "PIN2",
                        "pos": {
                            "left": 0,
                            "top": 0.7
                        }
                    },
                    {
                        "id": "pin3",
                        "name": "PIN3",
                        "pos": {
                            "left": 1,
                            "top": 0.5
                        }
                    }
                ]
            }
        ]
    ];

    //addOtherGates();
}


function addOtherGates(){
    _.gatePrototypes = _.gatePrototypes.concat(
        [
            
        ]

    );
}