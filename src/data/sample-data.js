const products = {
    pot001: { sku: 'pot001', 
        price:10, 
        stock:1, 
        title: 'A Pot', 
        desc: 'This is a pot', 
        cat: 'pot', 
        img: ['pot001-1', 'pot001-2', 'pot001-3'], 
        created: Date.now(), 
        updated: Date.now()
    },
    pot002: { sku: 'pot002', price:10, stock:1, title: 'A Pot', desc: 'This is a pot', cat: 'pot', img: ['pot002-1', 'pot002-2', 'pot002-3'],created: Date.now(),updated: Date.now()},
    pot003: { sku: 'pot003', price:10, stock:1, title: 'A Pot', desc: 'This is a pot', cat: 'pot', img: ['pot003-1', 'pot003-2'],created: Date.now(),updated: Date.now()},
    pot004: { sku: 'pot004', price:10, stock:1, title: 'A Pot', desc: 'This is a pot', cat: 'pot', img: ['pot004-1', 'pot004-2'],created: Date.now(),updated: Date.now()},
    bwl001: { sku: 'bwl001', price:10, stock:1, title:'A Bowl', desc:'This is a bowl', cat: 'bwl', img: ['bwl001-1', 'bwl001-2', 'bwl001-3', 'bwl001-4'],created: Date.now(),updated: Date.now()},
    bwl002: { sku: 'bwl002', price:10, stock:1, title:'A Bowl', desc:'This is a bowl', cat: 'bwl', img: ['bwl002-1'],created: Date.now(),updated: Date.now()},
    bwl003: { sku: 'bwl003', price:10, stock:1, title:'A Bowl', desc:'This is a bowl', cat: 'bwl', img: ['bwl003-1'],created: Date.now(),updated: Date.now()},
    vas001: { sku: 'vas001', price:10, stock:1, title: 'A Vase', desc: 'This is a vase', cat: 'bwl', img: ['vas001-1', 'vas001-2', 'vas001-3'],created: Date.now(),updated: Date.now()},
    vas002: { sku: 'vas002', price:10, stock:1, title: 'A Vase', desc: 'This is a vase', cat: 'bwl', img: ['vas002-1', 'vas002-2', 'vas002-3'],created: Date.now(),updated: Date.now()},
    vas003: { sku: 'vas003', price:10, stock:1, title: 'A Vase', desc: 'This is a vase', cat: 'bwl', img: ['vas003-1', 'vas003-2'],created: Date.now(),updated: Date.now()},
}

const orders = {}

const orderHolds = {}

const users = {}

const db = {
    products,
    orders,
    orderHolds,
    users,
}
export default db