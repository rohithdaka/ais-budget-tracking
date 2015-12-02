
var HeadLine = {
    view: function(ctrl,args){
            return m('h1',args.text);
        }
};

var EventTitle = {
    view: function(ctrl,args){
            var title = args.name + " " + args.year ; 
            return m('h3',title);
        }
};

var ExpenseItem = {
    //here args contain Object representation of particular item.. and extras is Object representation of Event
    removeFromTable: function(args,extras){
        var eventIndex = expenseReports.indexOf(extras);
        var itemIndex = (expenseReports[eventIndex].items).indexOf(args);
        expenseReports[eventIndex].items.splice(itemIndex,1);
    },
    controller: function(args,extras){
        this.removeItem = function(){
            ExpenseItem.removeFromTable(args,extras);
        }.bind(this)
    },
    view: function(ctrl,args,extras){
        var exp_item = [
            m('td',args.expense),
            m('td',args.category),
            m('td',args.amount)
            ];
        if(!args.isHead && 1){
            exp_item.push(m('td',m('button[type=button]',{onclick: ctrl.removeItem},"Remove")));
        }
        return m('tr',exp_item);
    }
};

var ExpenseInput = {
    getData: function(){
        return {e: m.prop('expense'), c: m.prop('category'), a: m.prop(0) };
    },
    addToTable: function(data,args){
        var eventIndex= expenseReports.indexOf(args);
        expenseReports[eventIndex].items.push({'expense': data.e(), 'category': data.c(), 'amount': data.a()});
    },
    controller: function(args){
        this.data = ExpenseInput.getData();
        this.addItem = function(){
            ExpenseInput.addToTable(this.data,args);
        }.bind(this)
    },
    view: function(ctrl,args){
        return m('tr',[
            m('td',m('input[type=text]',{onchange: m.withAttr("value",ctrl.data.e), value: ctrl.data.e()})),
            m('td',m('input[type=text]',{onchange: m.withAttr("value",ctrl.data.c), value: ctrl.data.c()})),
            m('td',m('input[type=text]',{onchange: m.withAttr("value",ctrl.data.a), value: ctrl.data.a()})),
            m('td',m('button[type=button]',{onclick: ctrl.addItem},"Add"))
            ]);
    }
};

var ExpenseTable = {
    controller: function(args){

    },
    view: function(ctrl,args){
            var table = m('table',[
                m('caption', m.component(EventTitle,{name: args.name, 'year': args.year}) ),
                m('thead',m.component(ExpenseItem,{'expense':'expense','category':'category','amount':'amount','isHead': true})),
                m('tbody',[
                    args.items.map(function(item){
                        //need to send event Table Object (args) to make it easy for removal of item
                        return m.component(ExpenseItem,item,args);
                    }),
                    //Only authenticated users would have the next line.
                    m.component(ExpenseInput,args)
                ])
            ]);
            return table;
        }
};

var EventInput = {
    getData: function(){
        return {name: m.prop('Event Name'),year:m.prop('year'),items:m.prop([])};
    },
    addToExpenseReports: function(data,args){
        expenseReports.push({name:data.name(),year:data.year(),items:data.items()});
    },
    controller: function(args){
        this.data = EventInput.getData();
        this.addEvent = function(){
            EventInput.addToExpenseReports(this.data);
        }.bind(this)
    },
    view: function(ctrl,args){
        return m('table',
            m('tr',[
                m('td',m('input[type=text]',{onchange: m.withAttr("value",ctrl.data.name), value: ctrl.data.name()})),
                m('td',m('input[type=text]',{onchange: m.withAttr("value",ctrl.data.year), value: ctrl.data.year()})),
                m('td',m('button[type=button]',{onclick: ctrl.addEvent},"Add Event"))
                ])
            );
    }
};

//temporary json till it is replaced with a get request
var expenseReports = [
    { 
    name: 'Diwali',
    'year': 2015,
    'items': [
        {'expense': 'venue', 'amount': 2000, 'category': 'logistics'},
        {'expense': 'snacks for volunteers', 'amount': 100, 'category':'food'} 
        ]
    },              
    { 
    name: 'Garba',
    'year': 2015,
    'items': [
        {'expense': 'DJ', 'amount': 100, 'category': 'logistics'},
        {'expense': 'dinner from notomatoes', 'amount': 2000, 'category':'food'},
        {'expense': 'Posters','amount':300,'category':'publicity'}
        ]
    }
];

var HomePage = {
    view: function(ctrl,args){
        return [
            m.component(HeadLine,{text: "AIS Expense Reports"}),
            expenseReports.map(function(eventReport){
                return m.component(ExpenseTable,eventReport); 
            }),
            //Only for authenticated users 
            m.component(EventInput)
        ];
    }
};

m.mount(document.body, HomePage);