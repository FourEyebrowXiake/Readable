export function filterItems(items, c) {
    return items.map((item) => {
        if (item.id === c.id) {
            return c;
        }
        return item;
    })
}

export function filterComments(items, id) {
   return items.filter(item => item.parentId === id)
}

export function deleteItems(items, c) {
    return items.filter((item) => item.id !== c.id)
}

export function order(items, fun) {
    return items.slice().sort(fun)
}

export function select(kind) {
    switch (kind) {
        case 'vote':
            return byVote;
        case 'time':
            return byTime;
        default:
            return byVote;
    }
}

const byVote = (a, b) => {
    if (a.voteScore > b.voteScore) {
        return -1;
    }
    if (a.voteScore < b.voteScore) {
        return 1;
    }
    return 0;
}

const byTime = (a, b) => {
    if (a.timestamp > b.timestamp) {
        return -1;
    }
    if (a.timestamp < b.timestamp) {
        return 1;
    }
    return 0;
}

export function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

export function isEmpty(obj) {
    for (var name in obj) {
        return false;
    }
    return true;
};