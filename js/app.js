
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
            exp_item[3] = 
                m('td',m('input[type=button]',{value:"Remove"}));
        }
        return m('tr',exp_item);
    }
};

var ExpenseInput = {
    controller: function(args){
        var ctrl = this;
        ctrl.e = m.prop('expense');
        ctrl.c = m.prop('category');
        ctrl.a = m.prop(0);
    },
    view: function(ctrl,args){
        return m('tr',[
            m('td',m('input[type=text]',{onchange: m.withAttr("value",ctrl.e), value: ctrl.e()})),
            m('td',m('input[type=text]',{onchange: m.withAttr("value",ctrl.c), value: ctrl.c()})),
            m('td',m('input[type=text]',{onchange: m.withAttr("value",ctrl.a), value: ctrl.a()})),
            m('td',m('input[type=button]',{value:"Add", onclick: ctrl.addItem}))
            ]);
    }
};

var ExpenseTable = {
    controller: function(args){

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