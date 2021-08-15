import { createStore } from 'vuex'

export default createStore({
    state: {
        ReadLink: "",
        IsRaw: false,
        AutomaticSpacing: false,
        // QuerySelector Stuff
        QuerySelector: "",
        SelectMultiple: false,
        QuerySelectorSeparator: false,
        History: JSON.parse(localStorage.getItem("history")) || [],
        HistoryID: ""
    },
    mutations: {
        UpdateAutomaticSpacing: state => state.AutomaticSpacing = !state.AutomaticSpacing,
        UpdateReadLink: (state, link) => state.ReadLink = link,
        ChangeRaw: state => state.IsRaw = !state.IsRaw,
        UpdateQuerySelector: (state, selector) => state.QuerySelector = selector,
        UpdateSelectMultiple: state => state.SelectMultiple = !state.SelectMultiple,
        UpdateQuerySelectorSeparator: state => state.QuerySelectorSeparator = !state.QuerySelectorSeparator,
        // History
        NewHistoryEntry: function (state, id) {
            let entry = {
                ReadLink: state.ReadLink,
                IsRaw: state.IsRaw,
                AutomaticSpacing: state.AutomaticSpacing,
                QuerySelector: state.QuerySelector,
                SelectMultiple: state.SelectMultiple,
                QuerySelectorSeparator: state.QuerySelectorSeparator
            };
            // Workaround for mutators not returning a new object
            entry.id = id; 
            //entry.id = '_' + Math.random().toString(36).substr(2, 9);
            entry.date = Date.now();
            entry.progress = 0;
            state.History.push(entry);
            localStorage.setItem("history", JSON.stringify(state.History));
            console.log(entry);
        },
        DeleteHistoryEntry: function (state, id) {
            state.History = state.History.filter(entry => entry.id !== id);
            localStorage.setItem("history", JSON.stringify(state.History));
        },
        UpdateHistoryEntry: function (state, payload) {
            let historyObj = state.History.find(e => e.id === payload.id);
            //console.log(historyObj);
            console.log(`Got PropUpdate for ID "${payload.id}" | Setting "${payload.prop}" ("${historyObj[payload.prop]}" -> "${payload.value}")`)
            if (payload?.updatetime) {
                historyObj.date = Date.now();
            }
            historyObj[payload.prop] = payload.value;
            localStorage.setItem("history", JSON.stringify(state.History));
        },
        SetPropsFromHistory: (state, id) => {
            console.log(`Got ActivateEntry for ID "${id}"`);
            let props = JSON.parse(localStorage.getItem("history")).find(e => e.id === id);
            state.HistoryID = props.id;
            for (let prop in props) {
                if (props.hasOwnProperty(prop) && state?.hasOwnProperty(prop)) {
                    state[prop] = props[prop];
                }
            }
        },
        SetHistoryID: (state, id) => state.HistoryID = id,
        UnsetHistoryID: state => {
            console.log("Unset History ID");
            state.HistoryID = null;
        },
    },
    actions: {
    },
    getters: {
        GetHistoryEntryByID: state => id => state.History.find(e => e.id === id),
        GetHistoryEntryByURL: state => url => state.History.find(e => e.url === url)
    },
    modules: {
    }
})
