var _ = null;

var app = angular.module('app', []);
app.controller('MainController', function ($scope, $interval) {

    _ = $scope;
    _.CW = 1000;
    _.CH = 700;
    _.PR = 8;
    _.viewStack = [];
    _.selecteds = [];

    _.select = (obj, ev) => {
        if(ev.altKey){
            if(_.selecteds.length && obj && _.selecteds[0]!=obj && _.isPin(_.selecteds[0]) && _.isPin(obj)){
                let g = _.ic.gates.find(g=>g.inputs.indexOf(_.selecteds[0])>-1 || g.outputs.indexOf(_.selecteds[0])>-1);
                obj.data = g ? g.id+'.'+_.selecteds[0].id : _.selecteds[0].id;

                if(_.selecteds.length>1)
                    _.selecteds.splice(_.selecteds[0],1)[0];

                _.refreshView();
            }
            return;
        }
        if(ev.ctrlKey){
            _.selecteds.push(obj);
            return;
        }

        _.selecteds = [obj];
    }

    _.isSelected = obj => _.selecteds.indexOf(obj)>-1;

    _.dragStart = ev => {
        if(ev.target.tagName=='svg' && !ev.altKey && !ev.ctrlKey) {
            _.selecteds = [];
            _.selectTool = {init:{x:ev.offsetX, y:ev.offsetY}};
        }

        if(!_.selecteds.length) return;
        _.dragging = true;
        _.dragDiff = _.selecteds.map(o=>[ev.offsetX - o.pos.left*_.CW, ev.offsetY - o.pos.top*_.CH]);
    }

    _.drag = ev =>{
        if(_.selectTool){
            _.selectTool.start = {x:Math.min(ev.offsetX, _.selectTool.init.x), y:Math.min(ev.offsetY, _.selectTool.init.y)};
            _.selectTool.end = {x:Math.max(ev.offsetX, _.selectTool.init.x), y:Math.max(ev.offsetY, _.selectTool.init.y)};
            return;
        }

        if(!_.selecteds.length || !_.dragging) return;
        
        _.selecteds.forEach((o,i)=>o.pos = {
            left: (ev.offsetX - _.dragDiff[i][0])/_.CW,
            top: (ev.offsetY - _.dragDiff[i][1])/_.CH
        });
    }

    _.dragEnd = ev => {
        if(_.selectTool && _.selectTool.start && _.selectTool.end && _.selectTool.end.x > _.selectTool.start.x+10 && _.selectTool.end.y > _.selectTool.start.y+10){
            _.selecteds = [..._.ic.inputs,..._.ic.outputs,..._.ic.gates].filter(o => 
                o.pos.left*_.CW >= _.selectTool.start.x && 
                o.pos.left*_.CW < _.selectTool.end.x && 
                o.pos.top*_.CH >= _.selectTool.start.y && 
                o.pos.top*_.CH < _.selectTool.end.y);
        }

        _.selectTool = null;
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
                
            if(g.type === 'NAND')
                g.outputs[0].value = (g.inputs[0].value===1 && g.inputs[1].value===1) ? 0 : 1;
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

    _.lastSelecteds = [];

    _.add = type =>{
        if(_.lastSelecteds.some((s,i) =>_.selecteds[i]!=s))
            _.selecteds = [];

        let added = null;

        if(type=='INPUT'){
            added = {
                id:'input'+_.ic.inputs.length,
                name:'INPUT'+_.ic.inputs.length,
                pos:{left:0, top:.3}
            };
            _.ic.inputs.push(added);
        }
        else if(type=='OUTPUT'){
            added = {
                id:'output'+_.ic.outputs.length,
                name:'OUTPUT'+_.ic.outputs.length,
                pos:{left:1, top:.3}
            };
            _.ic.outputs.push(added);
        }
        else {
            let gatePrototype = _.gatePrototypes.find(gp=>gp[0]==type)[1];
            added = JSON.parse(JSON.stringify(gatePrototype));
            added.id = 'g'+_.ic.gates.length;
            addSubGates(added);
            _.ic.gates.push(added);
        }

        _.selecteds.push(added);
        
        _.selecteds.forEach((e,i) => e.pos = {
            left: (i+1)/(_.selecteds.length+1), 
            top: (i+1)/(_.selecteds.length+1)
        });

        _.lastSelecteds = _.selecteds.map(s=>s);
        
    }

    _.align = (dir) => {
        if(dir=='left') _.selecteds.forEach(e=>e.pos.left = Math.min(..._.selecteds.map(s=>s.pos.left)));
        if(dir=='right') _.selecteds.forEach(e=>e.pos.left = Math.max(..._.selecteds.map(s=>s.pos.left)));
        if(dir=='top') _.selecteds.forEach(e=>e.pos.top = Math.min(..._.selecteds.map(s=>s.pos.top)));
        if(dir=='bottom') _.selecteds.forEach(e=>e.pos.top = Math.max(..._.selecteds.map(s=>s.pos.top)));
    }

    _.spread = ()=>{
        const center = _.selecteds.reduce((sum, s) => ({left:sum.left+s.pos.left/_.selecteds.length, top:sum.top+s.pos.top/_.selecteds.length}), {left:0, top:0} );
        _.selecteds.forEach(s => {s.pos.left -= (center.left-s.pos.left)*.1; s.pos.top -= (center.top-s.pos.top)*.1 });
    }

    _.gather = ()=>{
        const center = _.selecteds.reduce((sum, s) => ({left:sum.left+s.pos.left/_.selecteds.length, top:sum.top+s.pos.top/_.selecteds.length}), {left:0, top:0} );
        _.selecteds.forEach(s => {s.pos.left += (center.left-s.pos.left)*.1; s.pos.top += (center.top-s.pos.top)*.1 });
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
        if(!_.selecteds.length) return;

        _.selecteds.filter(s=>_.isGate(s)).forEach(s=>_.ic.gates.splice(_.ic.gates.indexOf(s),1));
        _.selecteds.filter(s=>_.isInput(s)).forEach(s=>_.ic.inputs.splice(_.ic.inputs.indexOf(s),1));
        _.selecteds.filter(s=>_.isOutput(s)).forEach(s=>_.ic.outputs.splice(_.ic.outputs.indexOf(s),1));

        _.selecteds = [];
        _.refreshView();
    }

    _.display = ()=>{
        if(_.selecteds.length != 1) return;

        if(_.selecteds[0].type === "IC"){
            _.viewStack.push(_.ic);
            _.ic = _.selecteds[0];
            _.selecteds = [];
            _.refreshView();
        }
    }

    _.back = ()=>{
        _.ic = _.viewStack.pop();
        _.refreshView();
        _.selecteds = [];
    }

    _.isPin = obj => _.isInput(obj) || _.isOutput(obj);
    _.isInput = obj => obj && obj.id.startsWith('input');
    _.isOutput = obj => obj && obj.id.startsWith('output');
    _.isGate = obj => obj && obj.type;

    setGates();
});
