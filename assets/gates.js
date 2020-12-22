function setGates(){

    _.gatePrototypes = [
        [
            "CLOCK",
            {
                "id": "c1",
                "type": "CLOCK",
                "name": "CLOCK",
                W:100,H:30,
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
                W:25,H:25,
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
            "NOT",
            {
                "id": "g1",
                "type": "NOT",
                "name": "NOT",
                W:70,H:30,
                "inputs": [
                    {
                        "id": "input1",
                        "name": "INPUT1",
                        "pos": {
                            "left": 0,
                            "top": 0.5
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
        ],
        [
            "AND",
            {
                "id": "g3",
                "type": "AND",
                "name": "AND",
                W:70,H:70,
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



}