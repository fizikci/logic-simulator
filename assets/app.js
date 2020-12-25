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
        // connect pins
        if(ev.altKey){
            if(_.selecteds.length && obj && _.selecteds[0]!=obj && _.isPin(_.selecteds[0]) && _.isPin(obj)){
                let g = _.ic.gates.find(g=>g.pins.indexOf(_.selecteds[0])>-1);
                obj.data = g ? g.id+'.'+_.selecteds[0].id : _.selecteds[0].id;

                if(_.selecteds.length>1)
                    _.selecteds.splice(_.selecteds[0],1)[0];

                _.refreshView();
            }
            return;
        }

        // select multiple
        if(ev.ctrlKey){
            _.selecteds.push(obj);
            return;
        }

        // select one
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
            left: Math.round((ev.offsetX - _.dragDiff[i][0])/_.CW * 100) / 100,
            top: Math.round((ev.offsetY - _.dragDiff[i][1])/_.CH * 100) / 100
        });
    }

    _.dragEnd = ev => {
        if(_.selectTool && _.selectTool.start && _.selectTool.end && _.selectTool.end.x > _.selectTool.start.x+10 && _.selectTool.end.y > _.selectTool.start.y+10){
            _.selecteds = [..._.ic.pins, ..._.ic.gates].filter(o => 
                o.pos.left*_.CW >= _.selectTool.start.x && 
                o.pos.left*_.CW < _.selectTool.end.x && 
                o.pos.top*_.CH >= _.selectTool.start.y && 
                o.pos.top*_.CH < _.selectTool.end.y);

            if(_.selecteds.length==0){
                const allInpOut = _.ic.gates.reduce((s,g)=>[...s, ...g.pins.map(x=>[x, g.pos.left*_.CW + x.pos.left*g.W, g.pos.top*_.CH + x.pos.top*g.H])], []);
                _.selecteds = allInpOut.filter(o => 
                    o[1] >= _.selectTool.start.x && 
                    o[1] < _.selectTool.end.x && 
                    o[2] >= _.selectTool.start.y && 
                    o[2] < _.selectTool.end.y).map(o=>o[0]);
            }
        }

        _.selectTool = null;
        _.dragging = false;
    }

    _.connections = [];

    _.refreshView = () => {

        _.connections = [];

        // from ic.pins
        for(let pin of _.ic.pins){
            var ref = find(_.ic, pin.data);
            if(ref.p) _.connections.push({
                                            g1:ref.g, p1:ref.p,
                                            g2:null, p2:pin});
        }
        
        // gates.pins
        for(let gate of _.ic.gates)
            for(let pin of gate.pins){
                var ref = find(_.ic, pin.data);
                if(ref.p) _.connections.push({
                                            g1:ref.g, p1:ref.p,
                                            g2:gate, p2:pin});
            }

    }

    _.calculating = false;

    _.calc = ic => {
        _.calculating = true;

        for(let i of ic.pins)
            if(i.value === undefined) i.value = 0;

        for(let g of ic.gates){
            for(let p of g.pins)
                if(p.data){
                    var ref = find(ic, p.data);
                    if(ref.p) p.value = ref.p.value;
                }
                
            if(g.type === 'NAND')
                g.pins[2].value = (g.pins[0].value===1 && g.pins[1].value===1) ? 0 : 1;
            if(g.type === 'IC')
                _.calc(g);
        }

        for(let p of ic.pins)
            if(p.data){
                var ref = find(ic, p.data);
                if(ref.p) p.value = ref.p.value;
            }

        _.calculating = false;
    }

    function find(ic, ref){
        if(!ref) return {gate:null, pin:null};

        let pin = ic.pins.find(i=>i.id==ref);
        if(pin) return {g:null, p:pin};

        try{
            let gate = ic.gates.find(g=>g.id == ref.split('.')[0]);
            return {g:gate, p:gate.pins.find(o=>o.id==ref.split('.')[1])};
        }catch{
            return {g:null, p:null};
        }
    }

    $interval(()=>{if(!_.calculating) _.calc(_.ic);}, 50);

    $interval(()=>{
        _.ic.gates.filter(g=>g.type=='CLOCK').forEach(c=>c.pins[0].value = c.pins[0].value?0:1);
    }, 500);

    _.newIC = ()=>{
        _.ic = {
            name:'NONAME',
            type:'IC',
            pins:[],
            gates: []
        }
        _.refreshView();
    }

    _.newIC();

    _.lastSelecteds = [];

    _.add = type =>{
        if(_.lastSelecteds.some((s,i) =>_.selecteds[i]!=s))
            _.selecteds = [];

        let added = null;

        if(type=='PIN'){
            added = {
                id:'pin'+nextId(_.ic),
                name:'PIN'+_.ic.pins.length
            };
            _.ic.pins.push(added);
        }
        else {
            let gatePrototype = _.gatePrototypes.find(gp=>gp[0]==type)[1];
            added = JSON.parse(JSON.stringify(gatePrototype));
            added.id = 'g'+nextId(_.ic);
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

    function nextId(g){
        if(!g.gates) return g.pins.length;
        return g.pins.length + g.gates.reduce((sum,sg)=>sum+nextId(sg),0);
    }

    _.align = (dir) => {
        const alignTo = (dir2, f) => {
            const min = f(..._.selecteds.map(s=>s.pos[dir2]));
            if(_.selecteds.filter(s=>s.pos[dir2]!=_.selecteds[0].pos[dir2]).length==0)
                _.selecteds.forEach(e=>e.pos[dir2] = f == Math.min ? 0.02 : 0.98);
            else
                _.selecteds.forEach(e=>e.pos[dir2] = min);
        }

        if(dir=='left') alignTo('left', Math.min);
        if(dir=='right') alignTo('left', Math.max);
        if(dir=='top') alignTo('top', Math.min);
        if(dir=='bottom') alignTo('top', Math.max);
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
            sg.pins = newGate.pins;
            sg.pins.forEach(x=>x.data = sg.pinsData.find(i=>i.id==x.id).data);
            sg.pinsData = undefined;
            addSubGates(sg);
        }
    }

    _.save = ()=>{
        let name = prompt('Enter a name for the IC');
        _.ic.name = name.toUpperCase();
        let pins = _.ic.pins.concat(_.ic.gates.filter(g=>g.type=='LED')).map(p=>p.pos);
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
                _.ic.gates[i].pinsData = _.ic.gates[i].pins.map(x=>({id:x.id, data:x.data}));
                _.ic.gates[i].pins = undefined;
            }

        _.gatePrototypes.push([_.ic.name, JSON.parse(JSON.stringify(_.ic, (k,v)=>(k==="$$hashKey"||k==="connections")?undefined:v))]);

        _.newIC();
    }

    _.delete = ()=>{
        if(!_.selecteds.length) return;

        _.selecteds.filter(s=>_.isGate(s)).forEach(s=>_.ic.gates.splice(_.ic.gates.indexOf(s),1));
        _.selecteds.filter(s=>_.isPin(s)).forEach(s=>_.ic.pins.splice(_.ic.pins.indexOf(s),1));

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

    _.isPin = obj => obj && obj.id.startsWith('pin');
    _.isGate = obj => obj && obj.type;

    setGates();
});
