
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
    view: function(ctrl,args){
        var exp_item = [
            m('td',args.expense),
            m('td',args.category),
            m('td',args.amount)
            ];
        if(!args.isHead && 1){
            exp_item.push(m('td',m('button[type=button]',"Remove")));
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
        //console.log("Table call")

    },
    view: function(ctrl,args){
            table = m('table',[
                m('caption', m.component(EventTitle,{name: args.name, 'year': args.year}) ),
                m('thead',m.component(ExpenseItem,{'expense':'expense','category':'category','amount':'amount','isHead': true})),
                m('tbody',[
                    args.items.map(function(item){
                        return m.component(ExpenseItem,{'expense': item.expense, 'category': item.category, 'amount': item.amount});
                    }),
                    m.component(ExpenseInput,args)
                ])
            ]);
            return table;
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
            })
        ];
    }
};

m.mount(document.body, HomePage);