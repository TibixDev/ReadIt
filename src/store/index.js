import { createStore } from 'vuex'

export default createStore({
    state: {
        ReadLink: "",
        IsRaw: false,
        QuerySelector: "",
        SelectMultiple: false,
        QuerySelectorSeparator: false
    },
    mutations: {
        UpdateReadLink: (state, link) => state.ReadLink = link,
        ChangeRaw: state => state.IsRaw = !state.IsRaw,
        UpdateQuerySelector: (state, selector) => state.QuerySelector = selector,
        UpdateSelectMultiple: state => state.SelectMultiple = !state.SelectMultiple,
        UpdateQuerySelectorSeparator: state => state.QuerySelectorSeparator = !state.QuerySelectorSeparator
    },
    actions: {
    },
    modules: {
    }
})
