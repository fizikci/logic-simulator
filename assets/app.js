var _ = null;

var app = angular.module('app', []);
app.controller('MainController', function ($scope, $interval) {

    _ = $scope;
    _.CW = 1000;
    _.CH = 700;
    _.GW = _.CW/10;
    _.GH = _.CH/10;
    _.PR = 8;
    _.viewStack = [];

    _.select = (obj, ev) => {
        let old = _.selected;
        _.selected = obj;

        if(ev.ctrlKey && old && obj && old!=obj && _.isPin(old) && _.isPin(obj)){
            var g = _.ic.gates.find(g=>g.inputs.indexOf(old)>-1 || g.outputs.indexOf(old)>-1);
            obj.data = g ? g.id+'.'+old.id : old.id;
            _.refreshView();
        }
    }

    _.dragStart = ev => {
        let obj = _.selected;
        if(!obj) return;
        _.dragging = true;
        _.dragDiff = [ev.offsetX - obj.pos.left*_.CW, ev.offsetY - obj.pos.top*_.CH];
    }

    _.drag = ev =>{
        let obj = _.selected;
        if(!obj || !_.dragging) return;
        
        obj.pos = {
            left: (ev.offsetX - _.dragDiff[0])/_.CW,
            top: (ev.offsetY - _.dragDiff[1])/_.CH
        };
    }

    _.dragEnd = ev => {
        _.dragging = false;
    }

    _.refreshView = () => {
        
        for(let i of _.ic.inputs){
            i.connections = [];
            for(let g of _.ic.gates)
                for(let gi of g.inputs)
                    if(gi.data == i.id)
                        i.connections.push({g:g, p:gi});
        }

        for(let g of _.ic.gates)
            for(let go of g.outputs){
                go.connections = [];
                for(let g2 of _.ic.gates)
                    for(let g2i of g2.inputs)
                        if(g2i.data == g.id+"."+go.id)
                            go.connections.push({g:g2, p:g2i});
            }
            
        for(let o of _.ic.outputs){
            o.connections = [];
            for(let g of _.ic.gates)
                for(let go of g.outputs)
                    if(o.data == g.id+'.'+go.id)
                        o.connections.push({g:g, p:go});
        }
    }

    _.calculating = false;

    _.calc = ic => {
        _.calculating = true;

        for(let i of ic.inputs)
            if(i.value === undefined) i.value = 0;

        for(let g of ic.gates){
            for(let i of g.inputs){
                var ref = find(ic, i.data);
                if(ref) i.value = ref.value;
            }
                
            if(g.type === 'NOT')
                g.outputs[0].value = g.inputs[0].value ? 0 : 1;
            if(g.type === 'AND')
                g.outputs[0].value = (g.inputs[0].value===0 || g.inputs[1].value===0) ? 0 : 1;
            if(g.type === 'IC')
                _.calc(g);
        }

        for(let o of ic.outputs){
            var ref = find(ic, o.data);
            if(ref) o.value = ref.value;
        }

        _.calculating = false;
    }

    function find(ic, ref){
        if(!ref) return null;

        let inp = ic.inputs.find(i=>i.id==ref);
        if(inp) return inp;

        try{
            let gate = ic.gates.find(g=>g.id == ref.split('.')[0]);
            return gate.outputs.find(o=>o.id==ref.split('.')[1]);
        }catch{
            return null;
        }
    }

    $interval(()=>{if(!_.calculating) _.calc(_.ic);}, 50);

    $interval(()=>{
        _.ic.gates.filter(g=>g.type=='CLOCK').forEach(c=>c.outputs[0].value = c.outputs[0].value?0:1);
    }, 500);

    _.newIC = ()=>{
        _.ic = {
            name:'NONAME',
            type:'IC',
            inputs:[],
            outputs:[],
            gates: []
        }
    }

    _.newIC();

    _.add = type =>{
        if(type=='INPUT'){
            _.ic.inputs.push({
                id:'input'+_.ic.inputs.length,
                name:'INPUT'+_.ic.inputs.length,
                pos:{left:0, top:.3}
            });
            _.ic.inputs.forEach((e,i)=>e.pos.top = (i+1)/(_.ic.inputs.length+1));
            return;
        }
        if(type=='OUTPUT'){
            _.ic.outputs.push({
                id:'output'+_.ic.outputs.length,
                name:'OUTPUT'+_.ic.outputs.length,
                pos:{left:1, top:.3}
            });
            _.ic.outputs.forEach((e,i)=>e.pos.top = (i+1)/(_.ic.outputs.length+1));
            return;
        }

        let gatePrototype = _.gatePrototypes.find(gp=>gp[0]==type)[1];
        let newGate = JSON.parse(JSON.stringify(gatePrototype));
        newGate.id = 'g'+_.ic.gates.length;
        newGate.pos = {left:Math.random()*.8, top:Math.random()*.8};
        addSubGates(newGate);
        _.ic.gates.push(newGate);
    }

    function addSubGates(g){
        if(!g.gates) return;

        for(let sg of g.gates){
            let gatePrototype = _.gatePrototypes.find(gp=>gp[0]==sg.name)[1];
            let newGate = JSON.parse(JSON.stringify(gatePrototype));
            sg.gates = newGate.gates;
            sg.inputs = newGate.inputs;
            sg.outputs = newGate.outputs;
            sg.inputs.forEach(x=>x.data = sg.inputsData.find(i=>i.id==x.id).data);
            sg.outputs.forEach(x=>x.data = sg.outputsData.find(i=>i.id==x.id).data);
            sg.inputsData = undefined;
            sg.outputsData = undefined;
            addSubGates(sg);
        }
    }

    _.save = ()=>{
        let name = prompt('Enter a name for the IC');
        _.ic.name = name.toUpperCase();
        let pins = _.ic.inputs.concat(_.ic.outputs).concat(_.ic.gates.filter(g=>g.type=='LED')).map(p=>p.pos);
        let horizontalPinCount = 0; let verticalPinCount = 0;
        for(let i=0; i<1; i+=.05){
            horizontalPinCount += pins.find(p=>p.left>=i && p.left<i+.1) ? 1 : 0;
            verticalPinCount += pins.find(p=>p.top>=i && p.top<i+.1) ? 1 : 0;
        }
        _.ic.W = Math.max(70, horizontalPinCount*(_.PR+3));
        _.ic.H = Math.max(30, verticalPinCount*(_.PR+3));

        if(_.ic.gates && _.ic.gates.length)
            for(let i=0; i<_.ic.gates.length; i++){
                _.ic.gates[i].gates = undefined;
                _.ic.gates[i].inputsData = _.ic.gates[i].inputs.map(x=>({id:x.id, data:x.data}));
                _.ic.gates[i].outputsData = _.ic.gates[i].outputs.map(x=>({id:x.id, data:x.data}));
                _.ic.gates[i].inputs = undefined;
                _.ic.gates[i].outputs = undefined;
            }

        _.gatePrototypes.push([_.ic.name, JSON.parse(JSON.stringify(_.ic, (k,v)=>(k==="$$hashKey"||k==="connections")?undefined:v))]);

        _.newIC();
    }

    _.delete = ()=>{
        if(!_.selected) return;
        if(_.isGate(_.selected))
            _.ic.gates.splice(_.ic.gates.indexOf(_.selected),1);
        else if(_.isInput(_.selected))
            _.ic.inputs.splice(_.ic.inputs.indexOf(_.selected),1);
        else if(_.isOutput(_.selected))
            _.ic.outputs.splice(_.ic.outputs.indexOf(_.selected),1);

        _.refreshView();
    }

    _.display = ()=>{
        if(!_.selected) return;
        if(_.selected.type === "IC"){
            _.viewStack.push(_.ic);
            _.ic = _.selected;
            _.refreshView();
        }
    }

    _.back = ()=>{
        _.ic = _.viewStack.pop();
        _.refreshView();
        _.selected = null;
    }

    _.isPin = obj => _.isInput(obj) || _.isOutput(obj);
    _.isInput = obj => obj && obj.id.startsWith('input');
    _.isOutput = obj => obj && obj.id.startsWith('output');
    _.isGate = obj => obj && obj.type;

    setGates();
});
