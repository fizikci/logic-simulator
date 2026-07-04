function setGates() {

    _.gatePrototypes = [
        // [
        //     "CLOCK",
        //     {
        //         "id": "c1",
        //         "type": "CLOCK",
        //         "name": "CLOCK",
        //         "W": 100,
        //         "H": 30,
        //         "pins": [
        //             {
        //                 "id": "pin_1",
        //                 "name": "PIN",
        //                 "pos": {
        //                     "left": 1,
        //                     "top": 0.5
        //                 }
        //             }
        //         ]
        //     }
        // ],
        createGate("CLOCK", 0, 1, function () {
            return [this.pins[0].value || 0];
        }),
        // [
        //     "LED",
        //     {
        //         "id": "l1",
        //         "type": "LED",
        //         "name": "LED",
        //         "W": 25,
        //         "H": 25,
        //         "pins": [
        //             {
        //                 "id": "pin_2",
        //                 "name": "PIN1",
        //                 "pos": {
        //                     "left": 0.5,
        //                     "top": 0
        //                 }
        //             }
        //         ]
        //     }
        // ],
        createGate("LED", 1, 0, () => {}),
        createGate("BUF", 1, 1, a => [a ? 1 : 0]),
        createGate("NOT", 1, 1, a => [a ? 0 : 1]),
        createGate("AND", 2, 1, (a, b) => [a && b ? 1 : 0]),
        createGate("OR", 2, 1, (a, b) => [a || b ? 1 : 0]),
        createGate("XOR", 2, 1, (a, b) => [(a + b) % 2]),
        createGate("NAND", 2, 1, (a, b) => [!(a && b) ? 1 : 0]),
        createGate("NOR", 2, 1, (a, b) => [!(a || b) ? 1 : 0]),
        createGate("XNOR", 2, 1, (a, b) => [(a + b) % 2 === 0 ? 1 : 0]),
        createGate("FULL ADDER", 3, 2, (a, b, c) => {
            const sum = (a + b + c) % 2;
            const carry = (a + b + c) >= 2 ? 1 : 0;
            return [sum, carry];
        }),
        createGate("8 BIT ADDER", 16, 8, (...inputs) => {
            const a = inputs.slice(0, 8).reduce((acc, val, idx) => acc + (val << idx), 0);
            const b = inputs.slice(8, 16).reduce((acc, val, idx) => acc + (val << idx), 0);
            const sum = a + b;
            const result = [];
            for (let i = 0; i < 8; i++) {
                result.push((sum >> i) & 1);
            }
            return result;
        }),
        createGate("4 BIT MULTIPLIER", 8, 4, (...inputs) => {
            const a = inputs.slice(0, 4).reduce((acc, val, idx) => acc + (val << idx), 0);
            const b = inputs.slice(4, 8).reduce((acc, val, idx) => acc + (val << idx), 0);
            const product = a * b;
            const result = [];
            for (let i = 0; i < 4; i++) {
                result.push((product >> i) & 1);
            }
            return result;
        }),
        createGate("4 BIT MULTIPLEXER", 8, 1, (...inputs) => {
            const select = inputs.slice(0, 4).reduce((acc, val, idx) => acc + (val << idx), 0);
            return [inputs[select + 4] ? 1 : 0];
        }),
        createGate("4 BIT DEMULTIPLEXER", 5, 16, (...inputs) => {
            const select = inputs.slice(0, 4).reduce((acc, val, idx) => acc + (val << idx), 0);
            const output = Array(16).fill(0);
            output[select] = inputs[4] ? 1 : 0;
            return output;
        }),
        createGate("4 BIT DECODER", 4, 16, (...inputs) => {
            const select = inputs.reduce((acc, val, idx) => acc + (val << idx), 0);
            const output = Array(16).fill(0);
            output[select] = 1;
            return output;
        }),
        createGate("4 BIT ENCODER", 16, 4, (...inputs) => {
            const index = inputs.indexOf(1);
            if (index === -1) return [0, 0, 0, 0]; // No input is high
            const result = [];
            for (let i = 0; i < 4; i++) {
                result.push((index >> i) & 1);
            }
            return result;
        }),
        createGate("4 BIT COMPARATOR", 8, 1, (...inputs) => {
            const a = inputs.slice(0, 4).reduce((acc, val, idx) => acc + (val << idx), 0);
            const b = inputs.slice(4, 8).reduce((acc, val, idx) => acc + (val << idx), 0);
            return [a === b ? 1 : 0];
        }),
        createGate("4 BIT SHIFT REGISTER", 4, 4, (...inputs) => {
            const shift = 1; // Shift direction
            const data = inputs;
            const result = Array(4).fill(0);
            for (let i = 0; i < 4; i++) {
                const newIndex = (i + shift + 4) % 4; // Wrap around
                result[newIndex] = data[i];
            }
            return result;
        }),
        createGate("4 BIT COUNTER", 1, 4, function (clk) {
            if (clk && !this.lastClk) {
                this.count = ((this.count || 0) + 1) & 15;
            }

            this.lastClk = clk ? 1 : 0;

            const count = this.count || 0;
            return [
                (count >> 0) & 1,
                (count >> 1) & 1,
                (count >> 2) & 1,
                (count >> 3) & 1
            ];
        })
    ];
};

const createGate = (name, numberOfInputs, numberOfOutputs, calcFunc) => {
    const gate = {
        "type": name,
        "name": name,
        "W": 10 * name.length + 50,
        "H": 10 * (Math.max(numberOfInputs,numberOfOutputs)) + 50,
        "pins": [],
        "pos": {
            "left": 0.5,
            "top": 0.5
        },
    };

    for (let i = 0; i < numberOfInputs; i++) {
        gate.pins.push({
            "id": "pin_" + (i + 1),
            "type": "PIN_IN",
            "name": "PIN" + (i + 1),
            "value": 0,
            "pos": {
                "left": 0,
                "top": (i + 1) / (numberOfInputs + 1)
            }
        });
    }

    for (let j = 0; j < numberOfOutputs; j++) {
        gate.pins.push({
            "id": "pin_" + (numberOfInputs + j + 1),
            "type": "PIN_OUT",
            "name": "PIN" + (numberOfInputs + j + 1),
            "value": 0,
            "pos": {
                "left": 1,
                "top": (j + 1) / (numberOfOutputs + 1)
            }
        });
    }

    gate.calc = function () {
        const inputs = this.pins.filter(p=>p.type=='PIN_IN').map(pin => pin.value || 0);
        const output = calcFunc.apply(this, inputs);
        if (!output) return;

        for (let k = 0; k < numberOfOutputs; k++) {
            this.pins[numberOfInputs + k].value = output[k];
        }
    };

    return [name, gate];
};
