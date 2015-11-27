
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
            return m('tr',[
                 m('td',args.expense),
                 m('td',args.category),
                 m('td',args.amount)
                 ]);
             }
};

var ExpenseTable = {
    view: function(ctrl,args){
            table = m('table',[
                m('caption', m.component(EventTitle,{name: args.name, 'year': args.year}) ),
                m.component(ExpenseItem,{'expense':'expense','category':'category','amount':'amount'}),
                args.items.map(function(item){
                    return m.component(ExpenseItem,{'expense': item.expense, 'category': item.category, 'amount': item.amount});
                })
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
        return m('div',[
            m.component(HeadLine,{text: "AIS Expense Reports"}),
            expenseReports.map(function(eventReport){
                return m.component(ExpenseTable,eventReport); 
            })
        ]);
    }
};

m.mount(document.body, HomePage);