import { createStore } from 'vuex'

export default createStore({
    state: {
        ReadLink: "",
        IsRaw: false,
        AutomaticSpacing: false,
        // QuerySelector Stuff
        QuerySelector: "",
        SelectMultiple: false,
        QuerySelectorSeparator: false
    },
    mutations: {
        UpdateAutomaticSpacing: state => state.AutomaticSpacing = !state.AutomaticSpacing,
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
